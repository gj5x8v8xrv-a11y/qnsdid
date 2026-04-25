import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  visual,
  stats
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  visual?: ReactNode;
  stats?: Array<{
    label: string;
    value: string;
  }>;
}) {
  return (
    <section className="page-shell section-space">
      <div className="surface-dark overflow-hidden bg-hero-navy px-6 py-8 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="max-w-4xl">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/70">
              {eyebrow}
            </span>
            <h1 className="mt-6 max-w-4xl text-[2.5rem] leading-[1.08] text-white sm:text-[3.5rem] lg:text-[4.35rem]">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              {description}
            </p>
            {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
            {stats?.length ? (
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    className="rounded-[1.5rem] border border-white/10 bg-white/10 px-5 py-5"
                    key={`${stat.label}-${stat.value}`}
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">{stat.label}</p>
                    <p className="mt-3 text-3xl text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="min-w-0">
            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-4 backdrop-blur">
              {visual || (
                <div className="rounded-[1.6rem] border border-white/10 bg-white/10 p-6">
                  <p className="text-xs uppercase tracking-[0.34em] text-white/50">Consulting Focus</p>
                  <div className="mt-6 grid gap-4">
                    {[
                      "신뢰도 있는 회사 소개",
                      "현장별 핵심 정보 정리",
                      "전화문의와 방문예약 중심 CTA"
                    ].map((item) => (
                      <div className="rounded-[1.35rem] bg-white/10 px-4 py-4 text-sm leading-7 text-white/75" key={item}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
