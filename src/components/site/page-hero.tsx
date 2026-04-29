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
      <div className="surface-dark overflow-hidden bg-hero-navy px-5 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-14 xl:px-12">
        <div className={`grid gap-8 ${visual ? "xl:grid-cols-[1.15fr_0.85fr] xl:items-end" : ""}`}>
          <div className="min-w-0 max-w-4xl">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/70">
              {eyebrow}
            </span>
            <h1 className="mt-5 max-w-4xl break-keep text-[1.82rem] leading-[1.12] text-white sm:text-[2.55rem] lg:text-[3.65rem] xl:text-[4.2rem]">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-[14px] leading-7 text-white/72 sm:text-base sm:leading-8 lg:text-lg">
              {description}
            </p>
            {actions ? (
              <div className="mt-7 grid gap-3 [&>*]:w-full sm:flex sm:flex-wrap sm:[&>*]:w-auto">
                {actions}
              </div>
            ) : null}
            {stats?.length ? (
              <div className="mt-9 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    className="rounded-[1.5rem] border border-white/10 bg-white/10 px-5 py-5"
                    key={`${stat.label}-${stat.value}`}
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">{stat.label}</p>
                    <p className="mt-3 text-[1.55rem] leading-tight text-white sm:text-3xl">{stat.value}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {visual ? (
            <div className="min-w-0">
              <div className="rounded-[2rem] border border-white/10 bg-white/10 p-3 sm:p-4 backdrop-blur">
                {visual}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
