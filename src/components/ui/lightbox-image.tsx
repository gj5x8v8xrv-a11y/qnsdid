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
        className={`group block w-full text-left ${wrapperClassName}`}
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <img
          alt={alt}
          className={`h-full w-full cursor-zoom-in object-cover transition duration-300 group-hover:scale-[1.02] ${imageClassName}`}
          src={src}
        />
        {overlayClassName ? <div className={overlayClassName} /> : null}
      </button>

      {isOpen ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/88 p-4 sm:p-6"
          onClick={() => setIsOpen(false)}
          role="dialog"
        >
          <button
            aria-label="사진 닫기"
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/14 text-2xl text-white transition hover:bg-white/22"
            onClick={() => setIsOpen(false)}
            type="button"
          >
            ×
          </button>
          <img
            alt={alt}
            className="max-h-[88vh] w-auto max-w-[94vw] rounded-[1.5rem] object-contain shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
            onClick={(event) => event.stopPropagation()}
            src={src}
          />
        </div>
      ) : null}
    </>
  );
}
