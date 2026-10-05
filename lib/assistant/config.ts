/**
 * Settings for "dude", the Gemini Live voice assistant. Server-only: the token route reads these
 * and locks them into each ephemeral token, so the browser cannot change model, voice or prompt.
 */

/** Gemini Live model (ai.google.dev/gemini-api/docs/models, checked 05-Oct-2026). */
export const liveModel = process.env.GEMINI_LIVE_MODEL?.trim() || "gemini-3.8-live";

/**
 * Prebuilt female-sounding voice. "Aoede" (breezy) by default; "Kore", "Leda", "Zephyr" and
 * "Despina" are alternatives. Set GEMINI_VOICE to try another without a code change.
 */
export const voiceName = process.env.GEMINI_VOICE?.trim() || "Aoede";

/** The SDK supports ephemeral tokens on v1alpha only; server and browser must both use it. */
export const API_VERSION = "v1alpha";

/** A token must be used to open a session within 1 minute, and the session ends after 10. */
export const NEW_SESSION_WINDOW_MS = 60 * 1000;
export const SESSION_MAX_MS = 10 * 60 * 1000;

/** New sessions per IP: 10 an hour. */
export const SESSIONS_PER_HOUR = 10;
