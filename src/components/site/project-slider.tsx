"use client";

import { useMemo, useState } from "react";

import type { ProjectWithImages } from "@/lib/types";

export function ProjectSlider({ project }: { project: ProjectWithImages }) {
  const images = useMemo(() => {
    const galleryUrls = project.gallery.map((item) => item.imageUrl);
    if (project.coverImageUrl) {
      return [project.coverImageUrl, ...galleryUrls];
    }
    return galleryUrls;
  }, [project.coverImageUrl, project.gallery]);

  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="surface-dark flex aspect-[16/9] items-end rounded-[2rem] bg-hero-navy p-8">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">Visual Story</p>
          <h2 className="mt-4 text-4xl text-white">{project.name}</h2>
        </div>
      </div>
    );
  }

  const currentImage = images[currentIndex] || images[0];

  return (
    <div className="space-y-4">
      <div className="surface-panel overflow-hidden rounded-[2rem] p-4">
        <div className="relative overflow-hidden rounded-[1.6rem]">
          <img
            alt={project.name}
            className="aspect-[16/9] w-full object-cover"
            src={currentImage}
          />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
            <div className="rounded-full bg-deep/70 px-4 py-2 text-xs font-semibold tracking-[0.28em] text-white">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
          {images.length > 1 ? (
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
              <button
                className="button-secondary !rounded-full !bg-white/90 !px-4 !py-2"
                onClick={() =>
                  setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
                }
                type="button"
              >
                이전
              </button>
              <button
                className="button-secondary !rounded-full !bg-white/90 !px-4 !py-2"
                onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
                type="button"
              >
                다음
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {images.length > 1 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {images.map((image, index) => (
            <button
              className={`overflow-hidden rounded-[1.25rem] border p-1 ${
                index === currentIndex
                  ? "border-accent bg-white shadow-soft"
                  : "border-transparent bg-white/70"
              }`}
              key={`${image}-${index}`}
              onClick={() => setCurrentIndex(index)}
              type="button"
            >
              <img
                alt={`${project.name} ${index + 1}`}
                className="aspect-[4/3] w-full rounded-2xl object-cover"
                src={image}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
