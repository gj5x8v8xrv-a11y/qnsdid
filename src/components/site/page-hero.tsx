import type { ReactNode } from "react";

type HeroStat = {
  label: string;
  value: string;
};

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
  stats?: HeroStat[];
}) {
  return (
    <section className="page-shell pb-6 pt-4 sm:pb-14 sm:pt-10">
      <div className="overflow-hidden rounded-[2.5rem] border border-black/8 bg-white px-4 py-5 text-black shadow-[0_24px_70px_rgba(15,23,42,0.06)] sm:px-10 sm:py-12 lg:px-12 lg:py-14">
        <div className="grid gap-5 sm:gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-start">
          <div>
            <p className="inline-flex rounded-full border border-black/8 bg-black/[0.03] px-3 py-1.5 text-[length:var(--home-hero-eyebrow-size,9px)] font-semibold uppercase tracking-[0.24em] text-muted sm:px-4 sm:py-2 sm:text-[11px] sm:tracking-[0.35em]">
              {eyebrow}
            </p>
            <h1 className="mt-4 text-[length:var(--home-hero-title-size,1.42rem)] leading-[1.24] tracking-[-0.02em] text-black sm:mt-6 sm:text-[2.8rem] lg:text-[3.55rem]">
              {title}
            </h1>
            <p className="mt-3 max-w-3xl text-[length:var(--home-body-text-size,13px)] leading-6 text-muted sm:mt-5 sm:text-[17px] sm:leading-8">
              {description}
            </p>

            {actions ? <div className="mt-5 flex flex-wrap gap-2.5 sm:mt-7 sm:gap-3">{actions}</div> : null}

            {stats?.length ? (
              <div className="mt-6 grid gap-2.5 sm:mt-8 sm:grid-cols-3 sm:gap-3">
                {stats.map((stat) => (
                  <div
                    className="rounded-[1.5rem] border border-black/8 bg-slate-50 px-4 py-3.5 sm:px-5 sm:py-5"
                    key={`${stat.label}-${stat.value}`}
                  >
                    <p className="text-[length:var(--home-hero-stat-label-size,11px)] uppercase tracking-[0.24em] text-muted sm:text-xs sm:tracking-[0.28em]">{stat.label}</p>
                    <p className="mt-2.5 text-[length:var(--home-hero-stat-value-size,1.45rem)] font-semibold text-black sm:mt-3 sm:text-2xl">{stat.value}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {visual ? (
            <div className="rounded-[2rem] border border-black/8 bg-slate-50 p-3 sm:p-5">{visual}</div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
