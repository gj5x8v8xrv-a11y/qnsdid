"use client";

import { useEffect, useState } from "react";

type LightboxImageProps = {
  alt: string;
  src: string;
  imageClassName?: string;
  wrapperClassName?: string;
  overlayClassName?: string;
};

export function LightboxImage({
  alt,
  src,
  imageClassName = "",
  wrapperClassName = "",
  overlayClassName = ""
}: LightboxImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <>
      <button
        aria-label={`${alt} 크게 보기`}
        className={`group relative block w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black ${wrapperClassName}`}
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <img
          alt={alt}
          className={`h-full w-full cursor-zoom-in object-cover transition duration-300 group-hover:scale-[1.02] ${imageClassName}`}
          src={src}
        />
        {overlayClassName ? <div className={overlayClassName} /> : null}
        <span className="pointer-events-none absolute bottom-3 right-3 border border-white/35 bg-black/55 px-3 py-1.5 text-[10px] font-medium tracking-[0.08em] text-white backdrop-blur-xl transition group-hover:bg-black/75 sm:bottom-4 sm:right-4 sm:text-xs">
          + 크게 보기
        </span>
      </button>

      {isOpen ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 p-3 backdrop-blur-xl sm:p-8"
          onClick={() => setIsOpen(false)}
          role="dialog"
        >
          <button
            aria-label="사진 닫기"
            className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center border border-white/35 bg-black/60 text-2xl font-light text-white backdrop-blur-xl transition hover:bg-white hover:text-black sm:right-6 sm:top-6"
            onClick={() => setIsOpen(false)}
            type="button"
          >
            ×
          </button>
          <img
            alt={alt}
            className="max-h-[90vh] w-auto max-w-[96vw] border border-white/15 object-contain shadow-[0_30px_100px_rgba(0,0,0,0.65)]"
            onClick={(event) => event.stopPropagation()}
            src={src}
          />
        </div>
      ) : null}
    </>
  );
}
