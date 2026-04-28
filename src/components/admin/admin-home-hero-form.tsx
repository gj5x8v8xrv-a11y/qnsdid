type AdminHomeHeroFormProps = {
  action: (formData: FormData) => Promise<void>;
  initialValues: {
    eyebrow: string;
    title: string;
    description: string;
    featuredLabel: string;
  };
};

export function AdminHomeHeroForm({
  action,
  initialValues
}: AdminHomeHeroFormProps) {
  return (
    <div className="admin-panel overflow-hidden">
      <div className="border-b border-black/5 px-6 py-6 sm:px-8">
        <h2 className="text-4xl">메인 화면 문구 설정</h2>
        <p className="mt-3 max-w-2xl text-sm leading-8 text-muted">
          첫 화면의 큰 제목, 설명, 추천 현장 라벨을 직접 수정할 수 있습니다. 저장하면 메인 화면에 바로 반영됩니다.
        </p>
      </div>

      <form action={action} className="space-y-8 px-6 py-8 sm:px-8">
        <section className="grid gap-4 rounded-[1.75rem] bg-slate-50 p-5 sm:p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-muted">Home Hero Copy</p>
            <h3 className="mt-2 text-2xl">고객이 처음 보는 문구</h3>
          </div>

          <div className="grid gap-5">
            <label className="grid gap-2 text-sm font-semibold">
              상단 라벨
              <input
                className="field-shell"
                defaultValue={initialValues.eyebrow}
                name="eyebrow"
                placeholder="Premium Sales Marketing"
                required
              />
            </label>

            <label className="grid gap-2 text-sm font-semibold">
              큰 제목
              <textarea
                className="field-shell min-h-[140px] resize-y"
                defaultValue={initialValues.title}
                name="title"
                required
              />
            </label>

            <label className="grid gap-2 text-sm font-semibold">
              설명 문구
              <textarea
                className="field-shell min-h-[130px] resize-y"
                defaultValue={initialValues.description}
                name="description"
                required
              />
            </label>

            <label className="grid gap-2 text-sm font-semibold">
              추천 현장 라벨
              <input
                className="field-shell"
                defaultValue={initialValues.featuredLabel}
                name="featuredLabel"
                placeholder="오늘 추천 현장"
                required
              />
            </label>
          </div>
        </section>

        <div className="rounded-[1.75rem] bg-deep px-5 py-5">
          <p className="text-sm leading-7 text-white/70">
            저장하면 메인 히어로 영역의 문구가 즉시 다시 불러와집니다.
          </p>
          <button className="button-accent mt-4" type="submit">
            메인 문구 저장하기
          </button>
        </div>
      </form>
    </div>
  );
}
