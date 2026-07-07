import { useEffect, useRef } from "react";
import { paletteForNow, seededRandom, type SkyPalette } from "@/lib/fx/timeOfDay";

export type StreetViewQuality = "full" | "reduced" | "static";

type StreetViewBackgroundProps = {
  className?: string;
  quality?: StreetViewQuality;
};

type Building = {
  x: number;
  width: number;
  height: number;
  layer: 0 | 1 | 2;
  windows: boolean[][];
  accent?: boolean;
};

type Car = {
  x: number;
  lane: number;
  speed: number;
  direction: 1 | -1;
  width: number;
  height: number;
  body: string;
  isTaxi?: boolean;
};

function buildSkyline(seed: number, layer: 0 | 1 | 2): Building[] {
  const rand = seededRandom(seed + layer * 1000);
  const buildings: Building[] = [];
  let x = -0.05;

  while (x < 1.15) {
    const width = 0.04 + rand() * (layer === 2 ? 0.09 : 0.07);
    const height =
      layer === 0
        ? 0.18 + rand() * 0.22
        : layer === 1
          ? 0.28 + rand() * 0.35
          : 0.38 + rand() * 0.48;

    const rows = Math.max(3, Math.floor(height * (layer === 2 ? 28 : 20)));
    const cols = Math.max(2, Math.floor(width * (layer === 2 ? 18 : 14)));
    const windows: boolean[][] = [];

    for (let r = 0; r < rows; r++) {
      const row: boolean[] = [];
      for (let c = 0; c < cols; c++) {
        row.push(rand() > (layer === 0 ? 0.72 : 0.38));
      }
      windows.push(row);
    }

    buildings.push({
      x,
      width,
      height,
      layer,
      windows,
      accent: layer === 2 && rand() > 0.82,
    });

    x += width + rand() * 0.012;
  }

  return buildings;
}

function createCars(count: number, seed: number): Car[] {
  const rand = seededRandom(seed + 999);
  const colors = ["#1e293b", "#334155", "#475569", "#0f172a", "#164e63", "#1e3a5f"];

  return Array.from({ length: count }, (_, i) => {
    const direction: 1 | -1 = i % 2 === 0 ? 1 : -1;
    const isTaxi = rand() > 0.78;
    return {
      x: rand(),
      lane: Math.floor(rand() * 3),
      speed: 0.00035 + rand() * 0.00055,
      direction,
      width: 0.045 + rand() * 0.025,
      height: 0.018 + rand() * 0.008,
      body: isTaxi ? "#eab308" : colors[Math.floor(rand() * colors.length)],
      isTaxi,
    };
  });
}

function drawSky(ctx: CanvasRenderingContext2D, w: number, h: number, palette: SkyPalette) {
  const grad = ctx.createLinearGradient(0, 0, 0, h * 0.72);
  grad.addColorStop(0, palette.skyTop);
  grad.addColorStop(0.55, palette.skyBottom);
  grad.addColorStop(1, palette.horizon);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  if (palette.sunOpacity > 0.05) {
    const sunX = w * 0.72;
    const sunY = h * 0.18;
    const sunR = Math.min(w, h) * 0.06;
    const glow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunR * 3);
    glow.addColorStop(0, `rgba(254, 240, 138, ${palette.sunOpacity})`);
    glow.addColorStop(0.4, `rgba(251, 191, 36, ${palette.sunOpacity * 0.35})`);
    glow.addColorStop(1, "rgba(251, 191, 36, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);
  }

  if (palette.moonOpacity > 0.05) {
    const moonX = w * 0.78;
    const moonY = h * 0.14;
    ctx.fillStyle = `rgba(226, 232, 240, ${palette.moonOpacity})`;
    ctx.beginPath();
    ctx.arc(moonX, moonY, Math.min(w, h) * 0.025, 0, Math.PI * 2);
    ctx.fill();
  }

  if (palette.starOpacity > 0.05) {
    const rand = seededRandom(42);
    for (let i = 0; i < 80; i++) {
      const sx = rand() * w;
      const sy = rand() * h * 0.45;
      const size = rand() > 0.92 ? 1.8 : 1;
      ctx.fillStyle = `rgba(255, 255, 255, ${palette.starOpacity * (0.4 + rand() * 0.6)})`;
      ctx.fillRect(sx, sy, size, size);
    }
  }
}

function drawBuildingLayer(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  buildings: Building[],
  palette: SkyPalette,
  time: number,
  animateWindows: boolean,
) {
  const streetTop = h * 0.62;
  const layerConfig = {
    0: { baseY: streetTop - h * 0.08, color: palette.buildingFar, alpha: 0.55, scale: 0.72 },
    1: { baseY: streetTop - h * 0.04, color: palette.buildingMid, alpha: 0.75, scale: 0.88 },
    2: { baseY: streetTop, color: palette.buildingNear, alpha: 0.95, scale: 1 },
  } as const;

  for (const b of buildings) {
    const cfg = layerConfig[b.layer];
    const bw = b.width * w * cfg.scale;
    const bh = b.height * h * cfg.scale;
    const bx = b.x * w;
    const by = cfg.baseY - bh;

    ctx.fillStyle = cfg.color;
    ctx.globalAlpha = cfg.alpha;
    ctx.fillRect(bx, by, bw, bh);

    if (b.accent && b.layer === 2) {
      ctx.fillStyle = "rgba(14, 165, 233, 0.15)";
      ctx.fillRect(bx, by, bw, bh * 0.08);
    }

    const rows = b.windows.length;
    const cols = b.windows[0]?.length ?? 0;
    const padX = bw * 0.12;
    const padY = bh * 0.08;
    const cellW = (bw - padX * 2) / Math.max(cols, 1);
    const cellH = (bh - padY * 2) / Math.max(rows, 1);
    const winW = cellW * 0.55;
    const winH = cellH * 0.45;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (!b.windows[r][c]) continue;
        const flicker =
          animateWindows && palette.ambient < 0.5
            ? 0.65 + Math.sin(time * 2 + r * 1.7 + c * 2.3 + b.x * 20) * 0.35
            : 1;
        const lit = palette.ambient > 0.45 ? palette.windowDim : palette.windowLit;
        ctx.fillStyle = lit;
        ctx.globalAlpha = cfg.alpha * flicker * (palette.ambient > 0.45 ? 0.35 : 0.85);
        ctx.fillRect(
          bx + padX + c * cellW + (cellW - winW) / 2,
          by + padY + r * cellH + (cellH - winH) / 2,
          winW,
          winH,
        );
      }
    }

    ctx.globalAlpha = 1;
  }
}

function drawStreet(ctx: CanvasRenderingContext2D, w: number, h: number, palette: SkyPalette) {
  const streetTop = h * 0.62;

  const streetGrad = ctx.createLinearGradient(0, streetTop, 0, h);
  streetGrad.addColorStop(0, palette.street);
  streetGrad.addColorStop(1, "#020617");
  ctx.fillStyle = streetGrad;
  ctx.fillRect(0, streetTop, w, h - streetTop);

  ctx.strokeStyle = palette.streetMark;
  ctx.lineWidth = 1.5;
  ctx.setLineDash([18, 14]);
  ctx.globalAlpha = 0.45;
  ctx.beginPath();
  ctx.moveTo(w * 0.08, h * 0.78);
  ctx.lineTo(w * 0.92, h * 0.78);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;

  if (palette.ambient < 0.45) {
    for (let i = 0; i < 6; i++) {
      const lx = ((i + 0.5) / 6) * w;
      const ly = streetTop + (h - streetTop) * 0.35;
      const glow = ctx.createRadialGradient(lx, ly, 0, lx, ly, 40);
      glow.addColorStop(0, palette.streetlight);
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.globalAlpha = 0.25;
      ctx.fillRect(lx - 40, ly - 40, 80, 80);
    }
    ctx.globalAlpha = 1;
  }
}

function laneY(h: number, lane: number): number {
  const streetTop = h * 0.62;
  const streetH = h - streetTop;
  return streetTop + streetH * (0.22 + lane * 0.18);
}

function drawCar(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  car: Car,
  palette: SkyPalette,
  showLights: boolean,
) {
  const y = laneY(h, car.lane);
  const cw = car.width * w;
  const ch = car.height * h;
  const cx = car.x * w - cw / 2;

  ctx.fillStyle = car.body;
  ctx.fillRect(cx, y - ch / 2, cw, ch);

  ctx.fillStyle = "rgba(148, 163, 184, 0.55)";
  ctx.fillRect(cx + cw * 0.18, y - ch * 0.35, cw * 0.28, ch * 0.35);

  if (car.isTaxi) {
    ctx.fillStyle = "#fef08a";
    ctx.fillRect(cx + cw * 0.38, y - ch * 0.55, cw * 0.24, ch * 0.18);
  }

  if (showLights) {
    const lightSize = Math.max(2, cw * 0.08);
    if (car.direction === 1) {
      ctx.fillStyle = palette.headlight;
      ctx.shadowColor = palette.headlight;
      ctx.shadowBlur = 8;
      ctx.fillRect(cx + cw - lightSize - 1, y - lightSize / 2, lightSize, lightSize);
      ctx.fillStyle = palette.taillight;
      ctx.shadowColor = palette.taillight;
      ctx.shadowBlur = 6;
      ctx.fillRect(cx + 1, y - lightSize / 2, lightSize * 0.8, lightSize * 0.8);
    } else {
      ctx.fillStyle = palette.headlight;
      ctx.shadowColor = palette.headlight;
      ctx.shadowBlur = 8;
      ctx.fillRect(cx + 1, y - lightSize / 2, lightSize, lightSize);
      ctx.fillStyle = palette.taillight;
      ctx.shadowColor = palette.taillight;
      ctx.shadowBlur = 6;
      ctx.fillRect(cx + cw - lightSize - 1, y - lightSize / 2, lightSize * 0.8, lightSize * 0.8);
    }
    ctx.shadowBlur = 0;
  }
}

function drawFog(ctx: CanvasRenderingContext2D, w: number, h: number, palette: SkyPalette) {
  const fogGrad = ctx.createLinearGradient(0, h * 0.45, 0, h * 0.75);
  fogGrad.addColorStop(0, "transparent");
  fogGrad.addColorStop(1, palette.fog);
  ctx.fillStyle = fogGrad;
  ctx.fillRect(0, 0, w, h);
}

function drawScene(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  palette: SkyPalette,
  buildings: Building[][],
  cars: Car[],
  time: number,
  animateWindows: boolean,
  showCarLights: boolean,
) {
  ctx.clearRect(0, 0, w, h);
  drawSky(ctx, w, h, palette);
  drawBuildingLayer(ctx, w, h, buildings[0], palette, time, animateWindows);
  drawBuildingLayer(ctx, w, h, buildings[1], palette, time, animateWindows);
  drawStreet(ctx, w, h, palette);
  for (const car of cars) {
    drawCar(ctx, w, h, car, palette, showCarLights);
  }
  drawBuildingLayer(ctx, w, h, buildings[2], palette, time, animateWindows);
  drawFog(ctx, w, h, palette);
}

export function StreetViewBackground({ className = "", quality = "full" }: StreetViewBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    buildings: [buildSkyline(101, 0), buildSkyline(202, 1), buildSkyline(303, 2)] as Building[][],
    cars: createCars(quality === "full" ? 14 : quality === "reduced" ? 6 : 0, 404),
    lastPaletteUpdate: 0,
    palette: paletteForNow(),
  });

  useEffect(() => {
    stateRef.current.cars = createCars(quality === "full" ? 14 : quality === "reduced" ? 6 : 0, 404);
  }, [quality]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let lastFrame = 0;
    const minFrameMs = quality === "full" ? 16 : quality === "reduced" ? 33 : Infinity;
    const animate = quality !== "static";

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, quality === "full" ? 2 : 1.5);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.max(1, w * dpr);
      canvas.height = Math.max(1, h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const tick = (now: number) => {
      if (animate) raf = requestAnimationFrame(tick);
      if (now - lastFrame < minFrameMs) return;
      lastFrame = now;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w <= 0 || h <= 0) return;

      const state = stateRef.current;
      if (now - state.lastPaletteUpdate > 30_000) {
        state.palette = paletteForNow();
        state.lastPaletteUpdate = now;
      }

      const time = now / 1000;
      const showCarLights = state.palette.ambient < 0.55;

      if (animate) {
        for (const car of state.cars) {
          car.x += car.speed * car.direction * (quality === "full" ? 1 : 0.7);
          if (car.direction === 1 && car.x > 1.12) car.x = -0.08;
          if (car.direction === -1 && car.x < -0.08) car.x = 1.12;
        }
      }

      drawScene(
        ctx,
        w,
        h,
        state.palette,
        state.buildings,
        state.cars,
        time,
        animate,
        showCarLights,
      );
    };

    resize();
    tick(performance.now());
    window.addEventListener("resize", resize);

    const paletteInterval =
      quality === "static"
        ? window.setInterval(() => {
            stateRef.current.palette = paletteForNow();
            tick(performance.now());
          }, 60_000)
        : undefined;

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      if (paletteInterval) window.clearInterval(paletteInterval);
    };
  }, [quality]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    />
  );
}
