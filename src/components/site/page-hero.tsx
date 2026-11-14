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
  stats,
  actionsClassName,
  descriptionClassName
}: {
  eyebrow: string;
  title: string;
  description: ReactNode;
  actions?: ReactNode;
  visual?: ReactNode;
  stats?: HeroStat[];
  actionsClassName?: string;
  descriptionClassName?: string;
}) {
  return (
    <section className="page-shell pb-8 pt-5 sm:pb-16 sm:pt-12">
      <div className="overflow-hidden rounded-[1.75rem] border border-black/8 bg-white px-5 py-7 text-black shadow-[0_24px_70px_rgba(15,23,42,0.045)] sm:rounded-[2.5rem] sm:px-12 sm:py-14 lg:px-16 lg:py-16">
        <div className="grid gap-9 sm:gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-black/8 bg-black/[0.03] px-3 py-1.5 text-[length:var(--home-hero-eyebrow-size,9px)] font-semibold uppercase tracking-[0.24em] text-muted sm:px-4 sm:py-2 sm:text-[11px] sm:tracking-[0.35em]">
              {eyebrow}
            </p>
            <h1 className="mt-5 max-w-3xl text-[length:var(--home-hero-title-size,1.42rem)] leading-[1.16] tracking-[-0.045em] text-black sm:mt-7 sm:text-[2.8rem] lg:text-[3.75rem]">
              {title}
            </h1>
            <div
              className={`mt-5 max-w-2xl text-[length:var(--home-body-text-size,13px)] leading-7 text-muted sm:mt-6 sm:text-[17px] sm:leading-8 ${descriptionClassName || ""}`}
            >
              {description}
            </div>

            {actions ? (
              <div className={`mt-7 flex flex-wrap gap-2.5 sm:mt-9 sm:gap-3 ${actionsClassName || ""}`}>
                {actions}
              </div>
            ) : null}

            {stats?.length ? (
              <div className="mt-9 grid gap-2.5 sm:mt-11 sm:grid-cols-3 sm:gap-3">
                {stats.map((stat) => (
                  <div
                    className="rounded-[1.25rem] border border-black/8 bg-[#f8f8f6] px-4 py-4 sm:px-5 sm:py-5"
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
            <div className="rounded-[1.75rem] border border-black/8 bg-[#f8f8f6] p-3 sm:p-5">{visual}</div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
