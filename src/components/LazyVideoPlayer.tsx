import { useRef, useState } from "react";
import { Play } from "lucide-react";

type Props = {
  src: string;
  poster: string;
  aspectRatio?: string;
  className?: string;
  label?: string;
};

export function LazyVideoPlayer({
  src,
  poster,
  aspectRatio = "9 / 16",
  className = "",
  label = "Assistir vídeo",
}: Props) {
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setStarted(true);
    requestAnimationFrame(() => {
      videoRef.current?.play().catch(() => {});
    });
  };

  return (
    <div
      className={`relative overflow-hidden bg-graphite/60 border border-ivory/15 ${className}`}
      style={{ aspectRatio }}
    >
      {!started ? (
        <button
          type="button"
          onClick={handlePlay}
          aria-label={label}
          className="group absolute inset-0 w-full h-full cursor-pointer"
        >
          <img
            src={poster}
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-graphite/60 via-graphite/10 to-transparent" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-champagne/90 text-graphite shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-110">
              <Play className="w-6 h-6 md:w-7 md:h-7 ml-1" fill="currentColor" strokeWidth={0} />
            </span>
          </span>
        </button>
      ) : (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          controls
          playsInline
          preload="none"
          className="w-full h-full object-cover bg-black"
        />
      )}
    </div>
  );
}
