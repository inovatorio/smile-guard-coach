import { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  duration = 2000,
  className = "",
  formatter,
}: AnimatedNumberProps & { formatter?: (n: number) => string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const startAnimation = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;
      const start = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(eased * value));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) startAnimation();
      },
      { threshold: 0.01, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);


  const formatted = formatter
    ? formatter(display)
    : display.toLocaleString("pt-BR");

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
