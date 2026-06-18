import { useEffect, useRef } from "react";
import plaquinhaHero from "@/assets/plaquinha-hero.png";

/**
 * PlaquinhaJourney — uma única plaquinha translúcida percorre a LP como
 * fio condutor narrativo. Trajetória coreografada por waypoints, com
 * entrada segura no Hero (placa invisível enquanto o topo da página está
 * visível), micro-flutuação contínua entre waypoints e saída antes da
 * seção de Autoridade.
 */

type Waypoint = {
  progress: number;
  x: number;       // vw — quina superior esquerda
  y: number;       // vh — quina superior
  rotate: number;  // graus
  scale: number;
  opacity: number;
};

const WAYPOINTS: Waypoint[] = [
  { progress: 0.00, x: 96, y: 22, rotate: -10, scale: 0.55, opacity: 0    },
  { progress: 0.06, x: 90, y: 30, rotate:  -8, scale: 0.65, opacity: 0.70 },
  { progress: 0.14, x: 82, y: 44, rotate:   0, scale: 0.78, opacity: 1.00 },
  { progress: 0.24, x: 64, y: 46, rotate:   8, scale: 0.85, opacity: 1.00 },
  { progress: 0.38, x: 20, y: 52, rotate: -12, scale: 0.88, opacity: 1.00 },
  { progress: 0.55, x: 48, y: 46, rotate:   4, scale: 1.00, opacity: 1.00 },
  { progress: 0.72, x: 24, y: 50, rotate:  -4, scale: 1.05, opacity: 1.00 },
  { progress: 0.86, x: 68, y: 56, rotate:  10, scale: 0.72, opacity: 0.55 },
  { progress: 1.00, x: 92, y: 64, rotate:  18, scale: 0.42, opacity: 0    },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function sample(p: number): Omit<Waypoint, "progress"> {
  const c = clamp01(p);
  for (let i = 0; i < WAYPOINTS.length - 1; i++) {
    const a = WAYPOINTS[i];
    const b = WAYPOINTS[i + 1];
    if (c >= a.progress && c <= b.progress) {
      const span = b.progress - a.progress || 1;
      const local = (c - a.progress) / span;
      const e = easeInOutCubic(local);
      return {
        x: lerp(a.x, b.x, e),
        y: lerp(a.y, b.y, e),
        rotate: lerp(a.rotate, b.rotate, e),
        scale: lerp(a.scale, b.scale, e),
        opacity: lerp(a.opacity, b.opacity, e),
      };
    }
  }
  const last = WAYPOINTS[WAYPOINTS.length - 1];
  return { x: last.x, y: last.y, rotate: last.rotate, scale: last.scale, opacity: last.opacity };
}

export function PlaquinhaJourney({
  wrapperRef,
}: {
  wrapperRef: React.RefObject<HTMLElement | null>;
}) {
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = imgRef.current;
    const wrapper = wrapperRef.current;
    if (!img || !wrapper) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isMobile || reduced) {
      img.style.display = "none";
      return;
    }

    let rafId = 0;
    let running = true;

    const frame = () => {
      if (!running) return;
      const rect = wrapper.getBoundingClientRect();
      const viewH = window.innerHeight;
      const total = Math.max(rect.height - viewH, 1);
      const traveled = -rect.top;
      const progress = clamp01(traveled / total);

      // Trava de segurança do Hero: invisível enquanto o topo ainda está visível.
      const heroSafeScroll = window.scrollY > viewH * 0.22;
      const hasScrolled = window.scrollY > 16 && heroSafeScroll;
      const inJourney = rect.bottom > 0 && rect.top < viewH;

      if (!hasScrolled || !inJourney) {
        img.style.opacity = "0";
        img.style.transform =
          "translate3d(96vw, 22vh, 0) rotate(-10deg) scale(0.55)";
        rafId = requestAnimationFrame(frame);
        return;
      }

      const s = sample(progress);

      // Micro-flutuação contínua: dá vida ao objeto entre waypoints.
      const t = performance.now() / 1000;
      const floatY = Math.sin(t * 0.8) * 0.4;
      const floatX = Math.cos(t * 0.6) * 0.25;
      const floatRot = Math.sin(t * 0.45) * 0.6;

      const x = s.x + floatX;
      const y = s.y + floatY;
      const rot = s.rotate + floatRot;

      img.style.transform = `translate3d(${x}vw, ${y}vh, 0) rotate(${rot}deg) scale(${s.scale})`;
      img.style.opacity = String(s.opacity);

      const inEvaluation = progress >= 0.62 && progress <= 0.80;
      img.style.filter = inEvaluation
        ? "drop-shadow(0 28px 40px oklch(0.265 0.005 75 / 0.40)) drop-shadow(0 0 36px oklch(0.74 0.075 75 / 0.60)) drop-shadow(0 0 64px oklch(0.74 0.075 75 / 0.25))"
        : "drop-shadow(0 30px 44px oklch(0.265 0.005 75 / 0.32)) drop-shadow(0 6px 12px oklch(0.74 0.075 75 / 0.22))";

      rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);
    return () => {
      running = false;
      cancelAnimationFrame(rafId);
    };
  }, [wrapperRef]);

  return (
    <img
      ref={imgRef}
      src={plaquinhaHero}
      alt=""
      aria-hidden="true"
      width={1024}
      height={1024}
      className="plaquinha fixed top-0 left-0 z-20 pointer-events-none will-change-transform"
      style={{
        width: "clamp(200px, 22vw, 380px)",
        transformOrigin: "top left",
        opacity: 0,
        transform: "translate3d(96vw, 22vh, 0) rotate(-10deg) scale(0.55)",
      }}
    />
  );
}
