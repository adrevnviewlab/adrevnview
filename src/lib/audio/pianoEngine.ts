/** C major pentatonic across two octaves — pleasant for cursor/scroll interaction */
const PENTATONIC_HZ = [
  261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 783.99, 880.0,
  1046.5, 1174.66, 1318.51, 1567.98, 1760.0,
];

let sharedContext: AudioContext | null = null;

export function getPianoContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioCtx = window.AudioContext ?? (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!sharedContext) sharedContext = new AudioCtx();
  return sharedContext;
}

export async function resumePianoContext(): Promise<AudioContext | null> {
  const ctx = getPianoContext();
  if (!ctx) return null;
  if (ctx.state === "suspended") await ctx.resume();
  return ctx;
}

export function noteFromMouseX(clientX: number, width = window.innerWidth): number {
  const ratio = Math.min(1, Math.max(0, clientX / Math.max(width, 1)));
  const index = Math.round(ratio * (PENTATONIC_HZ.length - 1));
  return PENTATONIC_HZ[index] ?? PENTATONIC_HZ[0];
}

export function noteFromScrollIndex(index: number): number {
  const wrapped = ((index % PENTATONIC_HZ.length) + PENTATONIC_HZ.length) % PENTATONIC_HZ.length;
  return PENTATONIC_HZ[wrapped] ?? PENTATONIC_HZ[0];
}

export function playPianoNote(frequency: number, volume = 0.11): void {
  const ctx = getPianoContext();
  if (!ctx || ctx.state !== "running") return;

  const now = ctx.currentTime;
  const master = ctx.createGain();
  master.gain.setValueAtTime(volume, now);
  master.connect(ctx.destination);

  const partials = [
    { ratio: 1, gain: 1 },
    { ratio: 2, gain: 0.35 },
    { ratio: 3, gain: 0.15 },
  ];

  for (const { ratio, gain } of partials) {
    const osc = ctx.createOscillator();
    const envelope = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(frequency * ratio, now);
    envelope.gain.setValueAtTime(0, now);
    envelope.gain.linearRampToValueAtTime(gain, now + 0.012);
    envelope.gain.exponentialRampToValueAtTime(0.001, now + 0.75);
    osc.connect(envelope);
    envelope.connect(master);
    osc.start(now);
    osc.stop(now + 0.8);
  }
}

export function suspendPianoContext(): void {
  void sharedContext?.suspend();
}
