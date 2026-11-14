import { LightboxImage } from "@/components/ui/lightbox-image";

export function ProjectVisual({
  title,
  imageUrl,
  className = "aspect-[16/10]"
}: {
  title: string;
  imageUrl?: string | null;
  className?: string;
}) {
  if (imageUrl) {
    return (
      <div className={`relative overflow-hidden rounded-none ${className}`}>
        <LightboxImage
          alt={title}
          imageClassName="h-full w-full"
          overlayClassName="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f172a]/40 via-transparent to-transparent"
          src={imageUrl}
          wrapperClassName="h-full rounded-none"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-none bg-gradient-to-br from-[#111111] via-[#2a2a2a] to-[#656565] ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_28%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(15,23,42,0.2),rgba(15,23,42,0.66))]" />
      <div className="relative flex h-full items-end p-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.38em] text-white/60">Project</p>
          <p className="mt-3 max-w-[14rem] text-2xl leading-tight text-white">{title}</p>
        </div>
      </div>
    </div>
  );
}
