import { useEffect, useRef, useState } from "react";
import plaquinhaHero from "@/assets/plaquinha-hero.png";

/**
 * PlaquinhaJourney — uma única plaquinha translúcida atravessa a LP como
 * fio condutor narrativo. Coreografia não-linear: a placa desloca-se
 * lateralmente para direita/esquerda/centro, gira, pausa, muda de escala
 * e profundidade. Sobreposta a isso, uma micro-flutuação contínua
 * (sin/cos do tempo) garante que o objeto pareça vivo, suspenso, premium
 * — nunca "grudado no scroll".
 */

type Keyframe = {
  at: number;       // 0..1 do progresso da jornada
  x: number;        // vw, deslocamento horizontal em torno do centro
  y: number;        // vh, deslocamento vertical em torno do topo sticky
  rotate: number;   // graus
  scale: number;
  opacity: number;
  glow?: boolean;
  ease?: (t: number) => number;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

/**
 * Coreografia por capítulo. A placa começa oculta no hero (não cobre a Dra.),
 * entra pelo canto superior direito, desliza pelos sintomas alternando lados,
 * pausa centralizada nas consequências, migra para a esquerda na avaliação
 * (postura técnica + glow), e recua discreta nos tratamentos antes de sair.
 */
const KEYFRAMES: Keyframe[] = [
  // HERO — entrada sutil pelo canto superior direito, sem cobrir o rosto
  { at: 0.00, x:  38, y: -6, rotate: -12, scale: 0.78, opacity: 0.00, ease: easeOutExpo },
  { at: 0.05, x:  34, y: -4, rotate:  -8, scale: 0.90, opacity: 0.55, ease: easeOutExpo },
  { at: 0.10, x:  32, y: -2, rotate:  -5, scale: 0.98, opacity: 0.85, ease: easeOutCubic },

  // SINTOMAS — oscilação lateral, apontando pistas, pausas curtas
  { at: 0.18, x:  26, y:  2, rotate:   4, scale: 1.02, opacity: 1.00, ease: easeInOutCubic },
  { at: 0.26, x:  10, y:  4, rotate:  -3, scale: 1.00, opacity: 1.00, ease: easeInOutSine },
  { at: 0.34, x: -14, y:  6, rotate:   6, scale: 1.06, opacity: 1.00, ease: easeInOutCubic },
  { at: 0.40, x:  -4, y:  6, rotate:   2, scale: 1.04, opacity: 1.00, ease: easeInOutSine },

  // CONSEQUÊNCIAS — âncora central, rotação lenta, presença marcante
  { at: 0.50, x:   0, y:  4, rotate:  -2, scale: 1.14, opacity: 1.00, ease: easeInOutCubic },
  { at: 0.58, x:   2, y:  2, rotate:   1, scale: 1.16, opacity: 1.00, ease: easeInOutSine },

  // AVALIAÇÃO (bloco escuro) — migra para a esquerda, postura técnica, glow
  { at: 0.66, x: -22, y:  0, rotate:   8, scale: 1.08, opacity: 1.00, glow: true, ease: easeInOutCubic },
  { at: 0.76, x: -26, y:  2, rotate:   5, scale: 1.10, opacity: 1.00, glow: true, ease: easeInOutSine },

  // TRATAMENTOS — recua, escala menor, perde centralidade
  { at: 0.86, x:  18, y:  6, rotate:  -4, scale: 0.86, opacity: 0.60, ease: easeInOutCubic },
  { at: 0.94, x:  28, y:  8, rotate:  -8, scale: 0.72, opacity: 0.25, ease: easeOutCubic },

  // SAÍDA — desaparece antes da Autoridade
  { at: 1.00, x:  36, y: 10, rotate: -12, scale: 0.62, opacity: 0.00, ease: easeOutCubic },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

function sample(p: number) {
  const c = clamp01(p);
  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    const a = KEYFRAMES[i];
    const b = KEYFRAMES[i + 1];
    if (c >= a.at && c <= b.at) {
      const span = b.at - a.at || 1;
      const raw = (c - a.at) / span;
      const eased = (b.ease ?? easeInOutCubic)(raw);
      return {
        x: lerp(a.x, b.x, eased),
        y: lerp(a.y, b.y, eased),
        rotate: lerp(a.rotate, b.rotate, eased),
        scale: lerp(a.scale, b.scale, eased),
        opacity: lerp(a.opacity, b.opacity, eased),
        glow: eased > 0.5 ? !!b.glow : !!a.glow,
      };
    }
  }
  const l = KEYFRAMES[KEYFRAMES.length - 1];
  return { x: l.x, y: l.y, rotate: l.rotate, scale: l.scale, opacity: l.opacity, glow: false };
}

export function PlaquinhaScrollGuide({
  wrapperRef,
}: {
  wrapperRef: React.RefObject<HTMLElement | null>;
}) {
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
    const img = imgRef.current;
    const wrapper = wrapperRef.current;
    if (!img || !wrapper) return;

    if (reduced) {
      // Fallback estático: placa discreta no canto, sem rAF.
      img.style.opacity = "0.85";
      img.style.transform = isMobile
        ? "translate3d(0,0,0)"
        : "translate3d(calc(-50% + 30vw), 0, 0) rotate(-4deg) scale(0.95)";
      return;
    }

    let rafId = 0;
    let running = true;
    const start = performance.now();

    const tick = (now: number) => {
      if (!running) return;
      const rect = wrapper.getBoundingClientRect();
      const viewH = window.innerHeight;
      const total = rect.height;
      const traveled = viewH * 0.45 - rect.top;
      const progress = traveled / Math.max(total - viewH * 0.5, 1);

      const inView = rect.bottom > -100 && rect.top < viewH + 100;
      if (!inView) {
        img.style.opacity = "0";
        rafId = requestAnimationFrame(tick);
        return;
      }

      const s = sample(progress);

      // Micro-flutuação contínua: dá vida ao objeto mesmo em pausas.
      const t = (now - start) / 1000;
      const floatY = Math.sin(t * 0.9) * 0.6;            // vh
      const floatX = Math.cos(t * 0.7) * 0.35;           // vw
      const floatRot = Math.sin(t * 0.5) * 0.8;          // deg

      if (isMobile) {
        // Mobile: badge discreto no topo direito, motion mínima.
        const fade = Math.max(0, Math.min(1, s.opacity)) * 0.65;
        img.style.transform = `translate3d(0, ${(s.y * 0.25) + floatY * 0.4}vh, 0) rotate(${(s.rotate * 0.25) + floatRot * 0.5}deg)`;
        img.style.opacity = String(fade);
        img.style.filter = "drop-shadow(0 8px 14px oklch(0.265 0.005 75 / 0.20))";
      } else {
        const x = s.x + floatX;
        const y = s.y + floatY;
        const rot = s.rotate + floatRot;
        img.style.transform = `translate3d(calc(-50% + ${x}vw), ${y}vh, 0) rotate(${rot}deg) scale(${s.scale})`;
        img.style.opacity = String(s.opacity);
        img.style.filter = s.glow
          ? "drop-shadow(0 28px 40px oklch(0.265 0.005 75 / 0.38)) drop-shadow(0 0 32px oklch(0.74 0.075 75 / 0.55)) drop-shadow(0 0 64px oklch(0.74 0.075 75 / 0.25))"
          : "drop-shadow(0 26px 36px oklch(0.265 0.005 75 / 0.22)) drop-shadow(0 4px 8px oklch(0.74 0.075 75 / 0.18))";
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(rafId);
    };
  }, [wrapperRef, reduced, isMobile]);

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
          ? "plaquinha fixed top-24 right-3 w-16 z-20 pointer-events-none will-change-transform"
          : "plaquinha fixed top-[26vh] left-1/2 w-60 lg:w-72 xl:w-[22rem] z-20 pointer-events-none will-change-transform"
      }
      style={{ opacity: 0, transform: "translate3d(-50%, 0, 0)" }}
    />
  );
}
