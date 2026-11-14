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
    <section className="page-shell pb-5 pt-3 sm:pb-16 sm:pt-12">
      <div className="relative overflow-hidden rounded-[1.25rem] border border-blue-100 bg-white/90 px-4 py-5 text-black shadow-[0_20px_55px_rgba(30,64,175,0.08)] backdrop-blur-xl sm:rounded-[2rem] sm:px-12 sm:py-14 lg:px-16 lg:py-16">
        <div className="pointer-events-none absolute -right-28 -top-32 h-80 w-80 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="grid gap-6 sm:gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-center">
          <div className="relative">
            <p className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-blue-700 sm:px-4 sm:py-2 sm:text-[11px] sm:tracking-[0.3em]">
              {eyebrow}
            </p>
            <h1 className="mt-3 max-w-3xl text-[1.45rem] leading-[1.2] tracking-[-0.045em] text-black sm:mt-7 sm:text-[2.8rem] lg:text-[3.75rem]">
              {title}
            </h1>
            <div
              className={`mt-3 max-w-2xl text-[13px] leading-6 text-muted sm:mt-6 sm:text-[17px] sm:leading-8 ${descriptionClassName || ""}`}
            >
              {description}
            </div>

            {actions ? (
              <div className={`mt-5 flex flex-wrap gap-2 sm:mt-9 sm:gap-3 [&>*]:!min-h-[40px] [&>*]:!px-4 [&>*]:!py-2.5 sm:[&>*]:!min-h-[44px] sm:[&>*]:!px-6 sm:[&>*]:!py-4 ${actionsClassName || ""}`}>
                {actions}
              </div>
            ) : null}

            {stats?.length ? (
              <div className="mt-6 grid grid-cols-3 gap-2 sm:mt-11 sm:gap-3">
                {stats.map((stat) => (
                  <div
                    className="min-w-0 rounded-xl border border-slate-200/80 bg-slate-50/80 px-2.5 py-3 sm:rounded-[1.15rem] sm:px-5 sm:py-5"
                    key={`${stat.label}-${stat.value}`}
                  >
                    <p className="truncate text-[9px] uppercase tracking-[0.08em] text-muted sm:text-xs sm:tracking-[0.28em]">{stat.label}</p>
                    <p className="mt-1.5 truncate text-[14px] font-bold tracking-[-0.03em] text-black sm:mt-3 sm:text-2xl">{stat.value}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {visual ? (
            <div className="relative hidden rounded-[1.5rem] border border-blue-100 bg-gradient-to-br from-slate-50 to-blue-50/70 p-3 sm:p-5 lg:block">{visual}</div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
