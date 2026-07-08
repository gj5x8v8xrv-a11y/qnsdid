import { updateHomePageSettingsAction } from "@/app/admin/actions";
import { SubmitButton } from "@/components/ui/submit-button";
import type { HomePageSettings } from "@/lib/types";

export function AdminHomePageSettingsForm({ settings }: { settings: HomePageSettings }) {
  return (
    <div className="admin-panel overflow-hidden">
      <div className="border-b border-black/5 px-6 py-6">
        <p className="text-xs uppercase tracking-[0.32em] text-muted">Homepage Settings</p>
        <h2 className="mt-3 text-3xl">홈페이지 소개 글과 모바일 글씨 크기</h2>
        <p className="mt-2 text-sm leading-8 text-muted">
          메인 소개 문구와 모바일에서 보이는 제목/본문 글씨 크기를 관리자에서 직접 조정할 수 있습니다.
        </p>
      </div>

      <form action={updateHomePageSettingsAction} className="grid gap-8 px-6 py-8 lg:grid-cols-2 lg:px-7">
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-foreground" htmlFor="heroTitle">
              메인 제목
            </label>
            <textarea className="field-shell min-h-[108px]" defaultValue={settings.heroTitle} id="heroTitle" name="heroTitle" />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-foreground" htmlFor="heroDescription">
              메인 설명
            </label>
            <textarea
              className="field-shell min-h-[140px]"
              defaultValue={settings.heroDescription}
              id="heroDescription"
              name="heroDescription"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-foreground" htmlFor="activeSectionTitle">
              분양중 섹션 제목
            </label>
            <input className="field-shell" defaultValue={settings.activeSectionTitle} id="activeSectionTitle" name="activeSectionTitle" />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-foreground" htmlFor="activeSectionDescription">
              분양중 섹션 설명
            </label>
            <textarea
              className="field-shell min-h-[120px]"
              defaultValue={settings.activeSectionDescription}
              id="activeSectionDescription"
              name="activeSectionDescription"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-foreground" htmlFor="completedSectionTitle">
              분양완료 섹션 제목
            </label>
            <textarea
              className="field-shell min-h-[108px]"
              defaultValue={settings.completedSectionTitle}
              id="completedSectionTitle"
              name="completedSectionTitle"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-foreground" htmlFor="completedSectionDescription">
              분양완료 섹션 설명
            </label>
            <textarea
              className="field-shell min-h-[120px]"
              defaultValue={settings.completedSectionDescription}
              id="completedSectionDescription"
              name="completedSectionDescription"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-foreground" htmlFor="contactSectionTitle">
              문의 섹션 제목
            </label>
            <textarea
              className="field-shell min-h-[108px]"
              defaultValue={settings.contactSectionTitle}
              id="contactSectionTitle"
              name="contactSectionTitle"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-foreground" htmlFor="contactSectionDescription">
              문의 섹션 설명
            </label>
            <textarea
              className="field-shell min-h-[120px]"
              defaultValue={settings.contactSectionDescription}
              id="contactSectionDescription"
              name="contactSectionDescription"
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-[1.75rem] bg-slate-50 p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.32em] text-muted">Mobile Typography</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <label className="space-y-2 text-sm font-semibold text-foreground" htmlFor="mobileHeroTitleRem">
                <span>메인 제목 크기 `rem`</span>
                <input
                  className="field-shell"
                  defaultValue={settings.mobileHeroTitleRem}
                  id="mobileHeroTitleRem"
                  max="2.2"
                  min="1.1"
                  name="mobileHeroTitleRem"
                  step="0.01"
                  type="number"
                />
              </label>

              <label className="space-y-2 text-sm font-semibold text-foreground" htmlFor="mobileSectionTitleRem">
                <span>섹션 제목 크기 `rem`</span>
                <input
                  className="field-shell"
                  defaultValue={settings.mobileSectionTitleRem}
                  id="mobileSectionTitleRem"
                  max="2"
                  min="1"
                  name="mobileSectionTitleRem"
                  step="0.01"
                  type="number"
                />
              </label>

              <label className="space-y-2 text-sm font-semibold text-foreground" htmlFor="mobileBodyTextPx">
                <span>본문 크기 `px`</span>
                <input
                  className="field-shell"
                  defaultValue={settings.mobileBodyTextPx}
                  id="mobileBodyTextPx"
                  max="18"
                  min="12"
                  name="mobileBodyTextPx"
                  step="1"
                  type="number"
                />
              </label>

              <label className="space-y-2 text-sm font-semibold text-foreground" htmlFor="mobileProjectCardTitleRem">
                <span>카드 제목 크기 `rem`</span>
                <input
                  className="field-shell"
                  defaultValue={settings.mobileProjectCardTitleRem}
                  id="mobileProjectCardTitleRem"
                  max="1.6"
                  min="0.95"
                  name="mobileProjectCardTitleRem"
                  step="0.01"
                  type="number"
                />
              </label>
            </div>
            <p className="mt-4 text-sm leading-7 text-muted">
              숫자를 너무 크게 올리면 모바일에서 다시 두 줄로 많이 내려갈 수 있습니다. 보통 본문은 `13~15px`, 제목은 `1.2~1.5rem` 안에서 맞추면 안정적입니다.
            </p>
          </div>

          <div className="mt-6 flex justify-end">
            <SubmitButton className="button-primary">홈페이지 설정 저장</SubmitButton>
          </div>
        </div>
      </form>
    </div>
  );
}
