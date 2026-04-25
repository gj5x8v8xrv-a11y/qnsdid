type FlashBannerProps = {
  message?: string | null;
  tone?: "success" | "error" | "info";
};

export function FlashBanner({
  message,
  tone = "success"
}: FlashBannerProps) {
  if (!message) return null;

  const toneClass =
    tone === "error"
      ? "border-red-200 bg-red-50 text-red-700"
      : tone === "info"
        ? "border-slate-200 bg-slate-50 text-slate-700"
        : "border-emerald-200 bg-emerald-50 text-emerald-700";

  return (
    <div className={`rounded-[1.5rem] border px-5 py-4 text-sm leading-7 ${toneClass}`}>
      {message}
    </div>
  );
}
