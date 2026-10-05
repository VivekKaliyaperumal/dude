"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import type { useLiveSession } from "./useLiveSession";

type Props = { live: ReturnType<typeof useLiveSession>; onClose: () => void };

/** dude's chat panel: a card above the launcher on desktop, a bottom sheet above the StickyBar on phones. */
export function AssistantPanel({ live, onClose }: Props) {
  const { status, error, micOn, speaking, transcript, start, toggleMic, sendText } = live;
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLOListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const ready = status === "ready";

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [transcript]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    sendText(draft);
    setDraft("");
  };

  const statusLine =
    status === "connecting"
      ? "Connecting…"
      : status === "ready"
        ? speaking
          ? "dude is speaking"
          : micOn
            ? "Listening — go ahead and speak"
            : "Tap the mic to talk, or type below"
        : status === "ended"
          ? "Session ended"
          : status === "error"
            ? "Not connected"
            : "";

  return (
    <div
      id="assistant-panel"
      role="dialog"
      aria-modal="false"
      aria-label="Ask dude"
      data-theme="dark"
      className="animate-up-in fixed inset-x-0 bottom-[57px] z-[85] flex max-h-[min(78dvh,560px)] flex-col border-t border-dark-line bg-ink text-white shadow-fab [animation-duration:.45s] nav:inset-x-auto nav:right-7 nav:bottom-[172px] nav:h-[min(520px,calc(100dvh-280px))] nav:max-h-none nav:w-[360px] nav:border"
    >
      <header className="flex items-center justify-between gap-3 border-b border-dark-line px-4 py-3">
        <div className="flex items-center gap-3">
          <Image unoptimized src="/assistant/dude-avatar.jpg" alt="" width={40} height={40} className="h-10 w-10 shrink-0 rounded-full object-cover" />
          <div>
            <p className="text-[17px] leading-tight font-semibold">dude</p>
            <p className="font-mono text-[10.5px] tracking-[.12em] text-on-dark-2 uppercase">Ask in any language</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dude"
          className="grid h-10 w-10 place-items-center border border-dark-line-4 text-white transition-colors hover:bg-dark-hover"
        >
          <Icon name="close" size={16} />
        </button>
      </header>

      <ol ref={listRef} aria-live="polite" className="flex min-h-[160px] flex-1 flex-col gap-2.5 overflow-y-auto overscroll-contain px-4 py-4">
        {transcript.length === 0 && status === "connecting" ? (
          <li className="text-[14px] text-on-dark-2">Connecting to dude…</li>
        ) : null}
        {transcript.map((t) => (
          <li
            key={t.id}
            className={cn(
              "max-w-[85%] px-3 py-2 text-[14.5px] leading-[1.45]",
              t.role === "user" ? "self-end bg-green-deep text-white" : "self-start bg-ink-2 text-on-dark",
            )}
          >
            <span className="sr-only">{t.role === "user" ? "You: " : "dude: "}</span>
            {t.text}
          </li>
        ))}
      </ol>

      {error ? (
        <p role="alert" className="border-t border-dark-line px-4 py-2 text-[13px] text-gold">
          {error}
        </p>
      ) : null}

      {status === "ended" || status === "error" ? (
        <div className="border-t border-dark-line px-4 py-3">
          <button type="button" onClick={() => void start()} className="w-full bg-green-deep p-3 text-[15px] font-semibold text-white">
            Start a new conversation
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="flex items-stretch gap-2 border-t border-dark-line px-4 py-3">
          <button
            type="button"
            onClick={toggleMic}
            disabled={!ready}
            aria-pressed={micOn}
            aria-label={micOn ? "Turn microphone off" : "Turn microphone on"}
            className={cn(
              "relative grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors disabled:opacity-40",
              micOn ? "bg-green text-white" : "border border-dark-line-4 text-white hover:bg-dark-hover",
            )}
          >
            {micOn ? (
              <span aria-hidden className="animate-wa-pulse pointer-events-none absolute inset-0 rounded-full border-2 border-green [animation-delay:0s] motion-reduce:animate-none" />
            ) : null}
            <Icon name={micOn ? "mic" : "mic-off"} size={18} className="relative" />
          </button>
          <label htmlFor="assistant-input" className="sr-only">
            Type your question
          </label>
          <input
            ref={inputRef}
            id="assistant-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            disabled={!ready}
            autoComplete="off"
            placeholder="Type your question…"
            className="min-w-0 flex-1 border border-dark-line-4 bg-transparent px-3 text-base text-white placeholder:text-on-dark-3 disabled:opacity-40 tight:text-sm"
          />
          <button
            type="submit"
            disabled={!ready || !draft.trim()}
            aria-label="Send"
            className="grid h-11 w-11 shrink-0 place-items-center bg-green-deep text-white disabled:opacity-40"
          >
            <Icon name="send" size={16} />
          </button>
        </form>
      )}

      <footer className="flex items-center justify-between gap-3 border-t border-dark-line px-4 py-2">
        <p aria-live="polite" className="font-mono text-[10.5px] tracking-[.08em] text-on-dark-2">
          {statusLine}
        </p>
        <a
          href={site.phone.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-[12.5px] font-semibold text-green-tint underline-offset-2 hover:underline"
        >
          Talk to a person →
        </a>
      </footer>
      <p className="px-4 pb-2.5 text-[11px] leading-[1.4] text-on-dark-3">
        Answers are AI-generated by Google Gemini and may contain mistakes; prices are quoted only by our team. Please don’t share personal details here.
      </p>
    </div>
  );
}
