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
      <div className={`relative overflow-hidden rounded-[1.75rem] ${className}`}>
        <img
          alt={title}
          className="h-full w-full object-cover transition duration-700 hover:scale-[1.04]"
          src={imageUrl}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/40 via-transparent to-transparent" />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#0f172a] via-[#1b2c4e] to-[#b59259] ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_28%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(15,23,42,0.2),rgba(15,23,42,0.66))]" />
      <div className="relative flex h-full items-end p-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.38em] text-white/60">Project</p>
          <p className="mt-3 max-w-[12rem] break-keep text-[1.65rem] leading-tight text-white sm:max-w-[14rem] sm:text-2xl">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}
