export type SkyPalette = {
  skyTop: string;
  skyBottom: string;
  horizon: string;
  buildingFar: string;
  buildingMid: string;
  buildingNear: string;
  windowLit: string;
  windowDim: string;
  street: string;
  streetMark: string;
  ambient: number;
  starOpacity: number;
  sunOpacity: number;
  moonOpacity: number;
  headlight: string;
  taillight: string;
  streetlight: string;
  fog: string;
};

type RGB = { r: number; g: number; b: number };

const KEYFRAMES: { hour: number; palette: SkyPalette }[] = [
  {
    hour: 0,
    palette: {
      skyTop: "#020617",
      skyBottom: "#0c1a3a",
      horizon: "#1e293b",
      buildingFar: "#0a1020",
      buildingMid: "#0f172a",
      buildingNear: "#111827",
      windowLit: "#fde68a",
      windowDim: "#1e293b",
      street: "#0a0f18",
      streetMark: "#334155",
      ambient: 0.12,
      starOpacity: 0.85,
      sunOpacity: 0,
      moonOpacity: 0.7,
      headlight: "#fef9c3",
      taillight: "#ef4444",
      streetlight: "#fbbf24",
      fog: "rgba(15, 23, 42, 0.35)",
    },
  },
  {
    hour: 5,
    palette: {
      skyTop: "#1e1b4b",
      skyBottom: "#7c2d12",
      horizon: "#c2410c",
      buildingFar: "#1a1030",
      buildingMid: "#1e1638",
      buildingNear: "#221a42",
      windowLit: "#fde68a",
      windowDim: "#312e81",
      street: "#0f0a18",
      streetMark: "#475569",
      ambient: 0.25,
      starOpacity: 0.3,
      sunOpacity: 0.15,
      moonOpacity: 0.2,
      headlight: "#fef3c7",
      taillight: "#f87171",
      streetlight: "#fbbf24",
      fog: "rgba(124, 45, 18, 0.25)",
    },
  },
  {
    hour: 7,
    palette: {
      skyTop: "#38bdf8",
      skyBottom: "#fde68a",
      horizon: "#fb923c",
      buildingFar: "#334155",
      buildingMid: "#475569",
      buildingNear: "#64748b",
      windowLit: "#fef9c3",
      windowDim: "#94a3b8",
      street: "#1e293b",
      streetMark: "#64748b",
      ambient: 0.55,
      starOpacity: 0,
      sunOpacity: 0.45,
      moonOpacity: 0,
      headlight: "#fef9c3",
      taillight: "#ef4444",
      streetlight: "#fbbf24",
      fog: "rgba(251, 146, 60, 0.12)",
    },
  },
  {
    hour: 12,
    palette: {
      skyTop: "#0284c7",
      skyBottom: "#7dd3fc",
      horizon: "#bae6fd",
      buildingFar: "#475569",
      buildingMid: "#64748b",
      buildingNear: "#94a3b8",
      windowLit: "#e0f2fe",
      windowDim: "#cbd5e1",
      street: "#334155",
      streetMark: "#94a3b8",
      ambient: 0.85,
      starOpacity: 0,
      sunOpacity: 0.9,
      moonOpacity: 0,
      headlight: "#fef9c3",
      taillight: "#ef4444",
      streetlight: "#fbbf24",
      fog: "rgba(125, 211, 252, 0.08)",
    },
  },
  {
    hour: 17,
    palette: {
      skyTop: "#0369a1",
      skyBottom: "#fdba74",
      horizon: "#fb923c",
      buildingFar: "#334155",
      buildingMid: "#475569",
      buildingNear: "#64748b",
      windowLit: "#fde68a",
      windowDim: "#94a3b8",
      street: "#1e293b",
      streetMark: "#64748b",
      ambient: 0.6,
      starOpacity: 0,
      sunOpacity: 0.55,
      moonOpacity: 0,
      headlight: "#fef3c7",
      taillight: "#ef4444",
      streetlight: "#fbbf24",
      fog: "rgba(251, 146, 60, 0.15)",
    },
  },
  {
    hour: 20,
    palette: {
      skyTop: "#0f172a",
      skyBottom: "#312e81",
      horizon: "#4c1d95",
      buildingFar: "#0f172a",
      buildingMid: "#1e1b4b",
      buildingNear: "#1e293b",
      windowLit: "#fde68a",
      windowDim: "#312e81",
      street: "#0a0f18",
      streetMark: "#475569",
      ambient: 0.22,
      starOpacity: 0.5,
      sunOpacity: 0,
      moonOpacity: 0.35,
      headlight: "#fef9c3",
      taillight: "#ef4444",
      streetlight: "#fbbf24",
      fog: "rgba(49, 46, 129, 0.2)",
    },
  },
  {
    hour: 24,
    palette: {
      skyTop: "#020617",
      skyBottom: "#0c1a3a",
      horizon: "#1e293b",
      buildingFar: "#0a1020",
      buildingMid: "#0f172a",
      buildingNear: "#111827",
      windowLit: "#fde68a",
      windowDim: "#1e293b",
      street: "#0a0f18",
      streetMark: "#334155",
      ambient: 0.12,
      starOpacity: 0.85,
      sunOpacity: 0,
      moonOpacity: 0.7,
      headlight: "#fef9c3",
      taillight: "#ef4444",
      streetlight: "#fbbf24",
      fog: "rgba(15, 23, 42, 0.35)",
    },
  },
];

function parseHex(hex: string): RGB {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function lerpColor(a: string, b: string, t: number): string {
  const ca = parseHex(a);
  const cb = parseHex(b);
  const r = Math.round(ca.r + (cb.r - ca.r) * t);
  const g = Math.round(ca.g + (cb.g - ca.g) * t);
  const bl = Math.round(ca.b + (cb.b - ca.b) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

function lerpNum(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpPalette(a: SkyPalette, b: SkyPalette, t: number): SkyPalette {
  const keys = Object.keys(a) as (keyof SkyPalette)[];
  const out = { ...a };
  for (const key of keys) {
    const va = a[key];
    const vb = b[key];
    if (typeof va === "number" && typeof vb === "number") {
      (out as Record<string, number>)[key] = lerpNum(va, vb, t);
    } else if (typeof va === "string" && typeof vb === "string" && va.startsWith("#")) {
      (out as Record<string, string>)[key] = lerpColor(va, vb, t);
    } else if (typeof va === "string" && typeof vb === "string" && va.startsWith("rgba")) {
      (out as Record<string, string>)[key] = t < 0.5 ? va : vb;
    }
  }
  return out;
}

/** Local hour as 0–24 float (e.g. 14.5 = 2:30 PM). */
export function getLocalHour(date = new Date()): number {
  return date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;
}

export function paletteForHour(hour: number): SkyPalette {
  const h = ((hour % 24) + 24) % 24;

  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    const a = KEYFRAMES[i];
    const b = KEYFRAMES[i + 1];
    if (h >= a.hour && h <= b.hour) {
      const span = b.hour - a.hour || 1;
      const t = (h - a.hour) / span;
      return lerpPalette(a.palette, b.palette, t);
    }
  }

  return KEYFRAMES[0].palette;
}

export function paletteForNow(date = new Date()): SkyPalette {
  return paletteForHour(getLocalHour(date));
}

/** Seeded pseudo-random for stable building layouts. */
export function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
