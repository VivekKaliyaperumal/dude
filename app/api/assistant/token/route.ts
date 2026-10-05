import { GoogleGenAI, Modality } from "@google/genai";
import { site } from "@/content/site";
import { API_VERSION, liveModel, NEW_SESSION_WINDOW_MS, SESSION_MAX_MS, SESSIONS_PER_HOUR, voiceName } from "@/lib/assistant/config";
import { buildSystemPrompt, greeting } from "@/lib/assistant/knowledge";
import { createRateLimiter } from "@/lib/enquiry/rate-limit";
import type { AssistantTokenResponse } from "@/lib/assistant/types";

const isLimited = createRateLimiter(SESSIONS_PER_HOUR, 60 * 60 * 1000);
const fallback = `dude is not available right now. Please WhatsApp or call us on ${site.phone.display}.`;

/** Only pages on this site may ask for a session: the Origin must match the host serving the request. */
function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/**
 * Mints a single-use Gemini Live ephemeral token for one "dude" session. The model, voice and system
 * prompt are locked into the token, so the browser never sees GEMINI_API_KEY and cannot repurpose
 * the session.
 */
export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("[assistant] GEMINI_API_KEY is not set");
    return Response.json({ error: fallback }, { status: 503 });
  }
  if (!sameOrigin(request)) return Response.json({ error: "Forbidden" }, { status: 403 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (isLimited(ip)) {
    return Response.json(
      { error: `You have reached the session limit for now. Please WhatsApp or call us on ${site.phone.display}.` },
      { status: 429 },
    );
  }

  try {
    const ai = new GoogleGenAI({ apiKey, httpOptions: { apiVersion: API_VERSION } });
    const now = Date.now();
    const token = await ai.authTokens.create({
      config: {
        uses: 1,
        newSessionExpireTime: new Date(now + NEW_SESSION_WINDOW_MS).toISOString(),
        expireTime: new Date(now + SESSION_MAX_MS).toISOString(),
        liveConnectConstraints: {
          model: liveModel,
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName } } },
            systemInstruction: buildSystemPrompt(),
            inputAudioTranscription: {},
            outputAudioTranscription: {},
          },
        },
        // Lock exactly the fields set above.
        lockAdditionalFields: [],
      },
    });
    if (!token.name) throw new Error("Token response had no name");

    const body: AssistantTokenResponse = {
      token: token.name,
      model: liveModel,
      apiVersion: API_VERSION,
      greeting,
      expiresAt: now + SESSION_MAX_MS,
    };
    return Response.json(body, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("[assistant] token creation failed", err);
    return Response.json({ error: fallback }, { status: 502 });
  }
}
