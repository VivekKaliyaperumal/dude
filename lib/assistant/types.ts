/** What POST /api/assistant/token returns on success. */
export type AssistantTokenResponse = {
  /** Ephemeral token ("auth_tokens/…"), used as the browser's apiKey. */
  token: string;
  model: string;
  apiVersion: string;
  greeting: string;
  /** Epoch ms after which Gemini closes the session. */
  expiresAt: number;
};

export type TranscriptEntry = { id: number; role: "user" | "dude"; text: string; final: boolean };
