import Link from "next/link";

import { SITE_NAV_ITEMS } from "@/lib/constants";
import { getSiteConfig } from "@/lib/utils";

export function SiteFooter() {
  const site = getSiteConfig();

  return (
    <footer className="mt-16 border-t border-white/10 bg-deep text-white lg:mt-24">
      <div className="page-shell grid gap-10 py-14 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="space-y-5">
          <p className="text-[11px] uppercase tracking-[0.34em] text-white/50">
            Representative Homepage
          </p>
          <h2 className="text-4xl">{site.companyName}</h2>
          <p className="max-w-2xl text-sm leading-8 text-white/70">
            분양 현장 정보, 입지 강점, 프리미엄 포인트, 상담 연결까지 한눈에 확인할 수 있는
            신뢰 중심 홈페이지입니다.
          </p>
          <div className="grid gap-2 text-sm text-white/75">
            <p>대표번호 {site.companyPhone}</p>
            <p>이메일 {site.companyEmail}</p>
            <p>주소 {site.companyAddress}</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">사이트맵</p>
          <div className="mt-4 grid gap-3">
            {SITE_NAV_ITEMS.map((item) => (
              <Link className="text-sm text-white/70 transition hover:text-white" href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">문의 안내</p>
          <div className="mt-4 grid gap-3">
            <Link className="text-sm text-white/70 transition hover:text-white" href="/contact">
              상담문의
            </Link>
            <a
              className="text-sm text-white/70 transition hover:text-white"
              href={`tel:${site.companyPhone.replace(/[^+\d]/g, "")}`}
            >
              전화문의
            </a>
            <Link className="text-sm text-white/70 transition hover:text-white" href="/projects">
              분양중 현장
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="page-shell flex flex-col gap-2 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>{site.companyName}. All rights reserved.</p>
          <p>프리미엄 분양 현장을 신뢰감 있게 소개하는 대표 홈페이지</p>
        </div>
      </div>
    </footer>
  );
}
