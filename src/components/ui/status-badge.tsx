import { formatStatusLabel } from "@/lib/utils";
import type { InquiryStatus, ProjectStatus } from "@/lib/types";

export function StatusBadge({
  status
}: {
  status: ProjectStatus | InquiryStatus;
}) {
  const className =
    status === "active" || status === "new"
      ? "bg-[#eaf1ff] text-[#18407d]"
      : status === "completed" || status === "done"
        ? "bg-slate-200 text-slate-700"
        : "bg-[#fff4df] text-[#8f6831]";

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.02em] ${className}`}>
      {formatStatusLabel(status)}
    </span>
  );
}
