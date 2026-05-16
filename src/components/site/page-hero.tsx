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
    <section className="page-shell pb-10 pt-8 sm:pb-14 sm:pt-10">
      <div className="overflow-hidden rounded-[2.5rem] border border-black/8 bg-white px-6 py-8 text-black shadow-[0_24px_70px_rgba(15,23,42,0.06)] sm:px-10 sm:py-12 lg:px-12 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-start">
          <div>
            <p className="inline-flex rounded-full border border-black/8 bg-black/[0.03] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-muted">
              {eyebrow}
            </p>
            <h1 className="mt-6 text-[2.05rem] leading-[1.04] text-black sm:text-[2.8rem] lg:text-[3.55rem]">
              {title}
            </h1>
            <p className="mt-5 max-w-3xl text-[15px] leading-8 text-muted sm:text-[17px]">
              {description}
            </p>

            {actions ? <div className="mt-7 flex flex-wrap gap-3">{actions}</div> : null}

            {stats?.length ? (
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    className="rounded-[1.5rem] border border-black/8 bg-slate-50 px-5 py-5"
                    key={`${stat.label}-${stat.value}`}
                  >
                    <p className="text-xs uppercase tracking-[0.28em] text-muted">{stat.label}</p>
                    <p className="mt-3 text-2xl font-semibold text-black">{stat.value}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {visual ? (
            <div className="rounded-[2rem] border border-black/8 bg-slate-50 p-4 sm:p-5">{visual}</div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
