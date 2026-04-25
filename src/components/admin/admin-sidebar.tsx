"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const adminNavItems = [
  { href: "/admin", label: "대시보드" },
  { href: "/admin/projects/new", label: "현장 등록" },
  { href: "/admin/inquiries", label: "문의 목록" }
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-panel sticky top-28 h-fit rounded-[2rem] p-4">
      <div className="rounded-[1.5rem] bg-hero-navy px-5 py-6 text-white">
        <p className="text-xs uppercase tracking-[0.34em] text-white/50">Admin</p>
        <h2 className="mt-3 text-3xl">현장 관리</h2>
        <p className="mt-2 text-sm leading-7 text-white/70">
          클릭만으로 분양 현장과 문의를 직접 관리할 수 있게 구성했습니다.
        </p>
      </div>

      <nav className="mt-4 grid gap-2">
        {adminNavItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              className={`rounded-[1.2rem] px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-deep text-white shadow-soft"
                  : "bg-slate-50 text-foreground hover:bg-slate-100"
              }`}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
