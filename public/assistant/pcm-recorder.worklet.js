/**
 * Microphone → 16 kHz mono PCM16 for the Gemini Live API.
 * Runs at the AudioContext's native rate (usually 44.1 or 48 kHz), downsamples by averaging,
 * and posts ~64 ms Int16 chunks (transferred, not copied) to the main thread.
 */
const TARGET_RATE = 16000;
const CHUNK = 1024;

class PcmRecorder extends AudioWorkletProcessor {
  constructor() {
    super();
    this.ratio = sampleRate / TARGET_RATE;
    this.acc = 0;
    this.accCount = 0;
    this.pos = 0;
    this.out = new Int16Array(CHUNK);
    this.fill = 0;
  }

  process(inputs) {
    const channel = inputs[0] && inputs[0][0];
    if (!channel) return true;
    for (let i = 0; i < channel.length; i++) {
      this.acc += channel[i];
      this.accCount++;
      this.pos++;
      if (this.pos >= this.ratio) {
        this.pos -= this.ratio;
        const s = Math.max(-1, Math.min(1, this.acc / this.accCount));
        this.out[this.fill++] = s < 0 ? s * 0x8000 : s * 0x7fff;
        this.acc = 0;
        this.accCount = 0;
        if (this.fill === CHUNK) {
          this.port.postMessage(this.out.buffer, [this.out.buffer]);
          this.out = new Int16Array(CHUNK);
          this.fill = 0;
        }
      }
    }
    return true;
  }
}

registerProcessor("pcm-recorder", PcmRecorder);
