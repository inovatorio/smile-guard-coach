import { useEffect, useRef } from "react";
import plaquinhaHero from "@/assets/plaquinha-hero.png";

/**
 * PlaquinhaJourney — uma única plaquinha translúcida percorre a LP como
 * fio condutor narrativo. Trajetória coreografada por waypoints (não linear),
 * com entrada segura no Hero: a placa permanece invisível enquanto o usuário
 * estiver no topo, entra pela lateral direita extrema e atravessa a página
 * alternando direita → esquerda → centro → esquerda, antes de sair antes
 * da seção de Autoridade.
 */

type Waypoint = {
  progress: number;
  x: number;       // vw — coordenada da quina superior esquerda da placa
  y: number;       // vh — coordenada da quina superior da placa
  rotate: number;  // graus
  scale: number;
  opacity: number;
};

// Waypoints com entrada segura: começa fora da tela (x=96vw) e só ganha
// presença depois que o usuário rolou o suficiente para deixar o rosto da
// Dra. Jaqueline acima da viewport.
const WAYPOINTS: Waypoint[] = [
  { progress: 0.00, x: 96, y: 22, rotate: -10, scale: 0.42, opacity: 0    },
  { progress: 0.08, x: 90, y: 34, rotate:  -6, scale: 0.48, opacity: 0.45 },
  { progress: 0.16, x: 84, y: 48, rotate:   4, scale: 0.54, opacity: 0.80 },
  { progress: 0.24, x: 68, y: 46, rotate:   8, scale: 0.62, opacity: 1    },
  { progress: 0.38, x: 24, y: 54, rotate: -12, scale: 0.58, opacity: 0.95 },
  { progress: 0.55, x: 52, y: 48, rotate:   4, scale: 0.72, opacity: 1    },
  { progress: 0.72, x: 30, y: 52, rotate:  -4, scale: 0.78, opacity: 1    },
  { progress: 0.86, x: 70, y: 56, rotate:  10, scale: 0.50, opacity: 0.45 },
  { progress: 1.00, x: 92, y: 64, rotate:  18, scale: 0.32, opacity: 0    },
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

    // Mobile e usuários com reduced-motion: placa animada não aparece.
    // A plaquinha em repouso no CTA final preserva o simbolismo.
    if (isMobile || reduced) {
      img.style.display = "none";
      return;
    }

    let ticking = false;

    const apply = () => {
      ticking = false;
      const rect = wrapper.getBoundingClientRect();
      const viewH = window.innerHeight;
      const total = Math.max(rect.height - viewH, 1);
      const traveled = -rect.top;
      const progress = clamp01(traveled / total);

      // Trava de segurança do Hero: enquanto o topo ainda estiver visível,
      // a plaquinha permanece invisível, sem chance de cobrir o rosto da Dra.
      const heroSafeScroll = window.scrollY > viewH * 0.22;
      const hasScrolled = window.scrollY > 16 && heroSafeScroll;

      // Fora da jornada (acima do Hero ou já na Autoridade): força invisível.
      const inJourney = rect.bottom > 0 && rect.top < viewH;

      if (!hasScrolled || !inJourney) {
        img.style.opacity = "0";
        img.style.transform =
          "translate3d(96vw, 22vh, 0) rotate(-10deg) scale(0.42)";
        return;
      }

      const s = sample(progress);
      img.style.transform = `translate3d(${s.x}vw, ${s.y}vh, 0) rotate(${s.rotate}deg) scale(${s.scale})`;
      img.style.opacity = String(s.opacity);

      // Glow extra na avaliação (bloco escuro), progress 0.62–0.80.
      const inEvaluation = progress >= 0.62 && progress <= 0.80;
      img.style.filter = inEvaluation
        ? "drop-shadow(0 28px 40px oklch(0.265 0.005 75 / 0.38)) drop-shadow(0 0 32px oklch(0.74 0.075 75 / 0.55)) drop-shadow(0 0 64px oklch(0.74 0.075 75 / 0.22))"
        : "drop-shadow(0 24px 32px oklch(0.265 0.005 75 / 0.20)) drop-shadow(0 4px 8px oklch(0.74 0.075 75 / 0.15))";
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
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
        width: "clamp(120px, 16vw, 260px)",
        transformOrigin: "top left",
        opacity: 0,
        transform: "translate3d(96vw, 22vh, 0) rotate(-10deg) scale(0.42)",
      }}
    />
  );
}
