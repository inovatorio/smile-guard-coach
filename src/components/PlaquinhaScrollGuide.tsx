import { useEffect, useRef, useState } from "react";
import plaquinhaHero from "@/assets/plaquinha-hero.png";

type Keyframe = {
  at: number;
  x: number; // vw offset from viewport center
  y: number; // vh offset from baseline (top: 30vh)
  rotate: number;
  scale: number;
  opacity: number;
  glow?: boolean;
};

// Side-biased trajectory. Plaquinha permanece oculta no hero (não cobre a Dra.)
// e entra na cena ao chegar nos sintomas; sai antes da seção de autoridade.
const KEYFRAMES: Keyframe[] = [
  { at: 0.00, x:  32, y: -4, rotate: -8, scale: 0.95, opacity: 0.45 },
  { at: 0.08, x:  30, y: -2, rotate: -5, scale: 1.00, opacity: 0.70 },
  { at: 0.20, x:  28, y:  0, rotate:  2, scale: 1.05, opacity: 0.95 },
  { at: 0.42, x:  30, y:  2, rotate: -3, scale: 1.10, opacity: 1.00 },
  { at: 0.65, x: -28, y:  4, rotate:  6, scale: 1.20, opacity: 1.00, glow: true },
  { at: 0.85, x:  30, y:  6, rotate: -4, scale: 0.85, opacity: 0.45 },
  { at: 1.00, x:  36, y:  8, rotate: -6, scale: 0.70, opacity: 0.00 },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

function sample(p: number) {
  const c = Math.min(1, Math.max(0, p));
  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    const a = KEYFRAMES[i];
    const b = KEYFRAMES[i + 1];
    if (c >= a.at && c <= b.at) {
      const t = ease((c - a.at) / (b.at - a.at || 1));
      return {
        x: lerp(a.x, b.x, t),
        y: lerp(a.y, b.y, t),
        rotate: lerp(a.rotate, b.rotate, t),
        scale: lerp(a.scale, b.scale, t),
        opacity: lerp(a.opacity, b.opacity, t),
        glow: t > 0.5 ? b.glow : a.glow,
      };
    }
  }
  const l = KEYFRAMES[KEYFRAMES.length - 1];
  return { x: l.x, y: l.y, rotate: l.rotate, scale: l.scale, opacity: l.opacity, glow: false };
}

export function PlaquinhaScrollGuide({ wrapperRef }: { wrapperRef: React.RefObject<HTMLElement | null> }) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [reduced, setReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqMobile = window.matchMedia("(max-width: 767px)");
    const sync = () => {
      setReduced(mq.matches);
      setIsMobile(mqMobile.matches);
    };
    sync();
    mq.addEventListener("change", sync);
    mqMobile.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      mqMobile.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (reduced) return;
    const img = imgRef.current;
    const wrapper = wrapperRef.current;
    if (!img || !wrapper) return;

    let frame = 0;
    let queued = false;

    const update = () => {
      queued = false;
      const rect = wrapper.getBoundingClientRect();
      const viewH = window.innerHeight;
      const total = rect.height;
      const traveled = viewH * 0.5 - rect.top;
      const progress = traveled / total;

      // Hide entirely when wrapper is out of view
      const inView = rect.bottom > 0 && rect.top < viewH;
      if (!inView) {
        img.style.opacity = "0";
        return;
      }

      const s = sample(progress);

      if (isMobile) {
        img.style.transform = `translate3d(0, ${s.y * 0.3}vh, 0) rotate(${s.rotate * 0.3}deg)`;
        img.style.opacity = String(Math.max(0, s.opacity * 0.7));
      } else {
        // -50% keeps the element horizontally centered on its `left: 50%` anchor.
        img.style.transform = `translate3d(calc(-50% + ${s.x}vw), ${s.y}vh, 0) rotate(${s.rotate}deg) scale(${s.scale})`;
        img.style.opacity = String(s.opacity);
        img.style.filter = s.glow
          ? "drop-shadow(0 24px 32px oklch(0.265 0.005 75 / 0.35)) drop-shadow(0 0 28px oklch(0.74 0.075 75 / 0.4))"
          : "drop-shadow(0 24px 32px oklch(0.265 0.005 75 / 0.18)) drop-shadow(0 2px 4px oklch(0.74 0.075 75 / 0.15))";
      }
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [wrapperRef, reduced, isMobile]);

  // Fixed positioning — appears only while the journey wrapper is in view.
  // Desktop: centered horizontally, transformX moves it to the side.
  // Mobile: pinned to top-right as small badge.
  return (
    <img
      ref={imgRef}
      src={plaquinhaHero}
      alt=""
      aria-hidden="true"
      width={1024}
      height={1024}
      className={
        isMobile
          ? "plaquinha fixed top-20 right-3 w-20 z-20 pointer-events-none will-change-transform"
          : "plaquinha fixed top-[28vh] left-1/2 w-56 lg:w-72 xl:w-80 z-20 pointer-events-none will-change-transform"
      }
      style={{ opacity: 0, transform: "translate3d(-50%, 0, 0)" }}
    />
  );
}
