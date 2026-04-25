export function AdminStatGrid({
  activeCount,
  completedCount,
  inquiryCount
}: {
  activeCount: number;
  completedCount: number;
  inquiryCount: number;
}) {
  const items = [
    { label: "분양중 현장", value: activeCount, accent: "bg-[#eef5ff] text-[#18407d]" },
    { label: "분양완료 현장", value: completedCount, accent: "bg-slate-100 text-slate-700" },
    { label: "신규 문의", value: inquiryCount, accent: "bg-[#fff4df] text-[#8f6831]" }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <div className="admin-panel rounded-[1.75rem] p-6" key={item.label}>
          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.accent}`}>
            {item.label}
          </span>
          <p className="mt-5 text-5xl">{item.value}</p>
          <p className="mt-3 text-sm leading-7 text-muted">현재 운영 중인 데이터를 빠르게 확인할 수 있습니다.</p>
        </div>
      ))}
    </div>
  );
}
