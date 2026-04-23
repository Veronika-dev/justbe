'use client';

import { useEffect, useRef } from 'react';
import styles from './style.module.css';

export type ThoughtPace = 1 | 2 | 3 | 4 | 5;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
};

const PACE_CONFIG: Record<
  ThoughtPace,
  {
    count: [number, number];
    radius: [number, number];
    speed: number;
    chaos: number;
    maxSpeed: number;
  }
> = {
  1: {
    count: [3, 5],
    radius: [0.042, 0.1],
    speed: 0.038,
    chaos: 0,
    maxSpeed: 0.048,
  },
  2: {
    count: [9, 14],
    radius: [0.022, 0.052],
    speed: 0.065,
    chaos: 0,
    maxSpeed: 0.078,
  },
  3: {
    count: [18, 26],
    radius: [0.014, 0.036],
    speed: 0.19,
    chaos: 0.09,
    maxSpeed: 0.26,
  },
  4: {
    count: [34, 48],
    radius: [0.009, 0.028],
    speed: 0.32,
    chaos: 0.18,
    maxSpeed: 0.42,
  },
  5: {
    count: [58, 78],
    radius: [0.01, 0.028],
    speed: 0.48,
    chaos: 0.42,
    maxSpeed: 0.62,
  },
};

function randRange(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function pickInt([lo, hi]: [number, number]) {
  return Math.floor(randRange(lo, hi + 1));
}

function randomPointInUnitDisk(margin: number) {
  const cap = Math.max(0.05, 1 - margin);
  for (let i = 0; i < 100; i++) {
    const t = Math.random() * Math.PI * 2;
    const u = Math.random() + Math.random();
    const rad = u > 1 ? 2 - u : u;
    const x = rad * cap * Math.cos(t);
    const y = rad * cap * Math.sin(t);
    if (x * x + y * y <= cap * cap) return { x, y };
  }
  return { x: 0, y: 0 };
}

function clampSpeed(vx: number, vy: number, max: number) {
  const m = Math.hypot(vx, vy);
  if (m <= max || m < 1e-8) return { vx, vy };
  const s = max / m;
  return { vx: vx * s, vy: vy * s };
}

function createParticles(pace: ThoughtPace): Particle[] {
  const cfg = PACE_CONFIG[pace];
  const n = pickInt(cfg.count);
  const particles: Particle[] = [];
  for (let i = 0; i < n; i++) {
    const r = randRange(cfg.radius[0], cfg.radius[1]);
    const p = randomPointInUnitDisk(r + 0.02);
    const ang = Math.random() * Math.PI * 2;
    const sp = cfg.speed * (0.78 + Math.random() * 0.44);
    particles.push({
      x: p.x,
      y: p.y,
      vx: Math.cos(ang) * sp,
      vy: Math.sin(ang) * sp,
      r,
      opacity: randRange(0.28, 0.82),
    });
  }
  return particles;
}

export default function Index({ pace }: { pace: ThoughtPace }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef(0);
  const paceRef = useRef(pace);

  paceRef.current = pace;

  useEffect(() => {
    particlesRef.current = createParticles(pace);
  }, [pace]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const fill = '#8c8eb2';
    const ringStroke = 'rgba(140, 142, 178, 0.22)';

    const dpr = Math.min(window.devicePixelRatio ?? 1, 2);

    const syncCanvasSize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    syncCanvasSize();
    const ro = new ResizeObserver(syncCanvasSize);
    ro.observe(wrap);

    let last = performance.now();

    const tick = (now: number) => {
      const cfg = PACE_CONFIG[paceRef.current];
      const dt = Math.min((now - last) / 1000, 0.055);
      last = now;

      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      const cx = w / 2;
      const cy = h / 2;
      const screenR = Math.min(w, h) * 0.42;

      const parts = particlesRef.current;
      for (const p of parts) {
        if (cfg.chaos > 0) {
          p.vx += (Math.random() - 0.5) * cfg.chaos * dt * 55;
          p.vy += (Math.random() - 0.5) * cfg.chaos * dt * 55;
        }
        const cl = clampSpeed(p.vx, p.vy, cfg.maxSpeed);
        p.vx = cl.vx;
        p.vy = cl.vy;

        p.x += p.vx * dt;
        p.y += p.vy * dt;

        const d = Math.hypot(p.x, p.y);
        if (d + p.r > 1 && d > 1e-8) {
          const nx = p.x / d;
          const ny = p.y / d;
          const dot = p.vx * nx + p.vy * ny;
          if (dot > 0) {
            p.vx -= 2 * dot * nx;
            p.vy -= 2 * dot * ny;
          }
          const over = d + p.r - 1;
          p.x -= nx * over;
          p.y -= ny * over;
        }
      }

      ctx.clearRect(0, 0, w, h);

      ctx.beginPath();
      ctx.arc(cx, cy, screenR, 0, Math.PI * 2);
      ctx.strokeStyle = ringStroke;
      ctx.lineWidth = 1;
      ctx.stroke();

      for (const p of parts) {
        const px = cx + p.x * screenR;
        const py = cy + p.y * screenR;
        const pr = p.r * screenR;
        ctx.beginPath();
        ctx.arc(px, py, Math.max(pr, 0.5), 0, Math.PI * 2);
        ctx.fillStyle = fill;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={wrapRef} className={styles.wrap}>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden />
    </div>
  );
}
