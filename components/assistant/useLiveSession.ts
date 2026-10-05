"use client";

import { GoogleGenAI, Modality, type LiveServerMessage, type Session } from "@google/genai";
import { useCallback, useEffect, useRef, useState } from "react";
import type { AssistantTokenResponse, TranscriptEntry } from "@/lib/assistant/types";

export type SessionStatus = "idle" | "connecting" | "ready" | "ended" | "error";

const OUTPUT_RATE = 24000;
const GREETING_CUE = "(The visitor has just opened the assistant. Greet them with your greeting line.)";

function toBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(binary);
}

function pcm16ToFloat(base64: string): Float32Array {
  const binary = atob(base64);
  const samples = new Float32Array(binary.length >> 1);
  for (let i = 0; i < samples.length; i++) {
    const lo = binary.charCodeAt(i * 2);
    const hi = binary.charCodeAt(i * 2 + 1);
    const v = (hi << 8) | lo;
    samples[i] = (v >= 0x8000 ? v - 0x10000 : v) / 0x8000;
  }
  return samples;
}

/**
 * One Gemini Live session for "dude": fetches an ephemeral token, opens the socket, streams the
 * microphone as 16 kHz PCM16 and plays the 24 kHz PCM16 replies gap-free, and keeps a transcript
 * of both sides. Everything is torn down on end() and on unmount.
 */
export function useLiveSession() {
  const [status, setStatus] = useState<SessionStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [micOn, setMicOn] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);

  const sessionRef = useRef<Session | null>(null);
  const playCtxRef = useRef<AudioContext | null>(null);
  const playheadRef = useRef(0);
  const sourcesRef = useRef(new Set<AudioBufferSourceNode>());
  const micRef = useRef<{ ctx: AudioContext; stream: MediaStream; node: AudioWorkletNode } | null>(null);
  const expiryRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextIdRef = useRef(1);
  const statusRef = useRef<SessionStatus>("idle");

  const setStatusBoth = useCallback((s: SessionStatus) => {
    statusRef.current = s;
    setStatus(s);
  }, []);

  /** Appends a streamed transcript fragment to the open entry for `role`, or starts a new one. */
  const appendText = useCallback((role: TranscriptEntry["role"], text: string) => {
    if (!text) return;
    setTranscript((prev) => {
      const last = prev[prev.length - 1];
      if (last && last.role === role && !last.final) {
        return [...prev.slice(0, -1), { ...last, text: last.text + text }];
      }
      return [...prev, { id: nextIdRef.current++, role, text: text.trimStart(), final: false }];
    });
  }, []);

  const finaliseAll = useCallback(() => {
    setTranscript((prev) => (prev.some((e) => !e.final) ? prev.map((e) => (e.final ? e : { ...e, final: true })) : prev));
  }, []);

  const stopPlayback = useCallback(() => {
    for (const s of sourcesRef.current) {
      try {
        s.stop();
      } catch {
        /* already stopped */
      }
    }
    sourcesRef.current.clear();
    playheadRef.current = 0;
    setSpeaking(false);
  }, []);

  const playChunk = useCallback((base64: string) => {
    const ctx = playCtxRef.current;
    if (!ctx) return;
    const samples = pcm16ToFloat(base64);
    const buffer = ctx.createBuffer(1, samples.length, OUTPUT_RATE);
    buffer.copyToChannel(samples as Float32Array<ArrayBuffer>, 0);
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.connect(ctx.destination);
    const startAt = Math.max(ctx.currentTime, playheadRef.current);
    src.start(startAt);
    playheadRef.current = startAt + buffer.duration;
    sourcesRef.current.add(src);
    setSpeaking(true);
    src.onended = () => {
      sourcesRef.current.delete(src);
      if (sourcesRef.current.size === 0) setSpeaking(false);
    };
  }, []);

  const stopMic = useCallback(() => {
    const mic = micRef.current;
    micRef.current = null;
    if (mic) {
      mic.node.port.onmessage = null;
      mic.node.disconnect();
      mic.stream.getTracks().forEach((t) => t.stop());
      void mic.ctx.close();
      try {
        sessionRef.current?.sendRealtimeInput({ audioStreamEnd: true });
      } catch {
        /* socket already closed */
      }
    }
    setMicOn(false);
  }, []);

  const teardown = useCallback(() => {
    if (expiryRef.current) clearTimeout(expiryRef.current);
    expiryRef.current = null;
    stopMic();
    stopPlayback();
    const session = sessionRef.current;
    sessionRef.current = null;
    try {
      session?.close();
    } catch {
      /* already closed */
    }
    void playCtxRef.current?.close();
    playCtxRef.current = null;
    finaliseAll();
  }, [finaliseAll, stopMic, stopPlayback]);

  const onMessage = useCallback(
    (msg: LiveServerMessage) => {
      const content = msg.serverContent;
      if (!content) return;
      if (content.interrupted) stopPlayback();
      for (const part of content.modelTurn?.parts ?? []) {
        if (part.inlineData?.data) playChunk(part.inlineData.data);
      }
      if (content.inputTranscription?.text) appendText("user", content.inputTranscription.text);
      if (content.outputTranscription?.text) appendText("dude", content.outputTranscription.text);
      if (content.turnComplete) finaliseAll();
    },
    [appendText, finaliseAll, playChunk, stopPlayback],
  );

  const start = useCallback(async () => {
    if (statusRef.current === "connecting" || statusRef.current === "ready") return;
    setError(null);
    setTranscript([]);
    setStatusBoth("connecting");
    // Created inside the click handler so browsers allow it to play sound.
    playCtxRef.current = new AudioContext({ sampleRate: OUTPUT_RATE });
    try {
      const res = await fetch("/api/assistant/token", { method: "POST" });
      const data = (await res.json()) as Partial<AssistantTokenResponse> & { error?: string };
      if (!res.ok || !data.token || !data.model) throw new Error(data.error || "Could not start dude.");

      const ai = new GoogleGenAI({ apiKey: data.token, httpOptions: { apiVersion: data.apiVersion } });
      const session = await ai.live.connect({
        model: data.model,
        config: { responseModalities: [Modality.AUDIO] },
        callbacks: {
          onmessage: onMessage,
          onerror: () => {
            setError("The connection dropped. Please try again.");
            setStatusBoth("error");
            teardown();
          },
          onclose: () => {
            if (statusRef.current === "ready") setStatusBoth("ended");
            teardown();
          },
        },
      });
      sessionRef.current = session;
      setStatusBoth("ready");
      expiryRef.current = setTimeout(() => {
        setStatusBoth("ended");
        teardown();
      }, Math.max(0, (data.expiresAt ?? Date.now()) - Date.now()));
      session.sendClientContent({ turns: [{ role: "user", parts: [{ text: GREETING_CUE }] }], turnComplete: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start dude.");
      setStatusBoth("error");
      teardown();
    }
  }, [onMessage, setStatusBoth, teardown]);

  const startMic = useCallback(async () => {
    if (micRef.current || !sessionRef.current) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
      const ctx = new AudioContext();
      await ctx.audioWorklet.addModule("/assistant/pcm-recorder.worklet.js");
      const node = new AudioWorkletNode(ctx, "pcm-recorder");
      node.port.onmessage = (e: MessageEvent<ArrayBuffer>) => {
        sessionRef.current?.sendRealtimeInput({ audio: { data: toBase64(e.data), mimeType: "audio/pcm;rate=16000" } });
      };
      ctx.createMediaStreamSource(stream).connect(node);
      micRef.current = { ctx, stream, node };
      setMicOn(true);
      setError(null);
    } catch {
      setError("Microphone is blocked. Allow it in your browser, or type your question below.");
    }
  }, []);

  const toggleMic = useCallback(() => {
    if (micRef.current) stopMic();
    else void startMic();
  }, [startMic, stopMic]);

  const sendText = useCallback(
    (text: string) => {
      const session = sessionRef.current;
      const clean = text.trim();
      if (!session || !clean) return;
      stopPlayback();
      finaliseAll();
      setTranscript((prev) => [...prev, { id: nextIdRef.current++, role: "user", text: clean, final: true }]);
      session.sendClientContent({ turns: [{ role: "user", parts: [{ text: clean }] }], turnComplete: true });
    },
    [finaliseAll, stopPlayback],
  );

  const end = useCallback(() => {
    setStatusBoth("idle");
    teardown();
  }, [setStatusBoth, teardown]);

  useEffect(() => teardown, [teardown]);

  return { status, error, micOn, speaking, transcript, start, toggleMic, sendText, end };
}
