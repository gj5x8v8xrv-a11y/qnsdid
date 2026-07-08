import type { ReactNode } from "react";

import { updateHomePageSettingsAction } from "@/app/admin/actions";
import { SubmitButton } from "@/components/ui/submit-button";
import type { HomePageSettings } from "@/lib/types";

function TextField({
  label,
  name,
  value
}: {
  label: string;
  name: keyof HomePageSettings;
  value: string;
}) {
  return (
    <label className="space-y-2">
      <span className="block text-sm font-semibold text-foreground">{label}</span>
      <input className="field-shell" defaultValue={value} name={name} />
    </label>
  );
}

function TextAreaField({
  label,
  name,
  value,
  rows = 4
}: {
  label: string;
  name: keyof HomePageSettings;
  value: string;
  rows?: number;
}) {
  return (
    <label className="space-y-2">
      <span className="block text-sm font-semibold text-foreground">{label}</span>
      <textarea className="field-shell min-h-[108px]" defaultValue={value} name={name} rows={rows} />
    </label>
  );
}

function NumberField({
  label,
  name,
  value,
  min,
  max,
  step
}: {
  label: string;
  name: keyof HomePageSettings;
  value: number;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <label className="space-y-2 text-sm font-semibold text-foreground">
      <span>{label}</span>
      <input
        className="field-shell"
        defaultValue={value}
        max={max}
        min={min}
        name={name}
        step={step}
        type="number"
      />
    </label>
  );
}

function SettingsSection({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[1.75rem] bg-slate-50 p-5 sm:p-6">
      <p className="text-xs uppercase tracking-[0.32em] text-muted">{title}</p>
      <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}

export function AdminHomePageSettingsForm({ settings }: { settings: HomePageSettings }) {
  return (
    <div className="admin-panel overflow-hidden">
      <div className="border-b border-black/5 px-6 py-6">
        <p className="text-xs uppercase tracking-[0.32em] text-muted">Homepage Settings</p>
        <h2 className="mt-3 text-3xl">홈페이지 전체 문구와 모바일 글씨 크기</h2>
        <p className="mt-2 text-sm leading-8 text-muted">
          홈 화면에 보이는 상단 메뉴, 소개 문구, 버튼, 카드, 하단 문의 박스, 푸터 문구까지 관리자에서 직접 수정할 수 있습니다.
        </p>
      </div>

      <form action={updateHomePageSettingsAction} className="space-y-6 px-6 py-8 lg:px-7">
        <SettingsSection
          description="헤더 상단 안내문, 로고 아래 보조 문구, 메뉴 이름, 우측 버튼 이름을 수정합니다."
          title="Header"
        >
          <TextAreaField label="상단 안내 문구" name="headerAnnouncement" rows={3} value={settings.headerAnnouncement} />
          <TextField label="상단 전화 라벨" name="headerPhoneLabel" value={settings.headerPhoneLabel} />
          <TextField label="영문 브랜드명" name="brandEnglishName" value={settings.brandEnglishName} />
          <TextField label="브랜드 보조 문구" name="brandCaption" value={settings.brandCaption} />
          <TextField label="메뉴: 홈" name="navHomeLabel" value={settings.navHomeLabel} />
          <TextField label="메뉴: 회사소개" name="navCompanyLabel" value={settings.navCompanyLabel} />
          <TextField label="메뉴: 분양중" name="navProjectsLabel" value={settings.navProjectsLabel} />
          <TextField label="메뉴: 분양완료" name="navCompletedLabel" value={settings.navCompletedLabel} />
          <TextField label="메뉴: 상담문의" name="navContactLabel" value={settings.navContactLabel} />
          <TextField label="상단 전화 버튼명" name="headerPhoneButtonLabel" value={settings.headerPhoneButtonLabel} />
          <TextField label="상단 상담 버튼명" name="headerContactButtonLabel" value={settings.headerContactButtonLabel} />
        </SettingsSection>

        <SettingsSection
          description="메인 히어로 영역의 배지, 제목, 설명, 버튼, 통계 라벨, 추천 현장 라벨을 수정합니다."
          title="Hero"
        >
          <TextField label="메인 눈썹 문구" name="heroEyebrow" value={settings.heroEyebrow} />
          <TextAreaField label="메인 제목" name="heroTitle" rows={4} value={settings.heroTitle} />
          <TextAreaField label="메인 설명" name="heroDescription" rows={5} value={settings.heroDescription} />
          <TextField label="메인 전화 버튼명" name="heroPhoneButtonLabel" value={settings.heroPhoneButtonLabel} />
          <TextField label="메인 상담 버튼명" name="heroContactButtonLabel" value={settings.heroContactButtonLabel} />
          <TextField label="통계: 분양중 라벨" name="heroActiveStatLabel" value={settings.heroActiveStatLabel} />
          <TextField label="통계: 분양완료 라벨" name="heroCompletedStatLabel" value={settings.heroCompletedStatLabel} />
          <TextField label="통계: 대표번호 라벨" name="heroPhoneStatLabel" value={settings.heroPhoneStatLabel} />
          <TextField label="추천 현장 라벨" name="featuredProjectLabel" value={settings.featuredProjectLabel} />
        </SettingsSection>

        <SettingsSection
          description="분양중/분양완료/상담문의 섹션의 라벨, 제목, 설명, 버튼, 빈 상태 문구를 수정합니다."
          title="Sections"
        >
          <TextField label="분양중 상단 라벨" name="activeSectionEyebrow" value={settings.activeSectionEyebrow} />
          <TextAreaField label="분양중 섹션 제목" name="activeSectionTitle" rows={4} value={settings.activeSectionTitle} />
          <TextAreaField
            label="분양중 섹션 설명"
            name="activeSectionDescription"
            rows={4}
            value={settings.activeSectionDescription}
          />
          <TextField label="분양중 섹션 버튼명" name="activeSectionButtonLabel" value={settings.activeSectionButtonLabel} />
          <TextAreaField
            label="분양중 빈 상태 문구"
            name="activeSectionEmptyMessage"
            rows={4}
            value={settings.activeSectionEmptyMessage}
          />
          <TextField
            label="분양완료 상단 라벨"
            name="completedSectionEyebrow"
            value={settings.completedSectionEyebrow}
          />
          <TextAreaField
            label="분양완료 섹션 제목"
            name="completedSectionTitle"
            rows={4}
            value={settings.completedSectionTitle}
          />
          <TextAreaField
            label="분양완료 섹션 설명"
            name="completedSectionDescription"
            rows={4}
            value={settings.completedSectionDescription}
          />
          <TextAreaField
            label="분양완료 빈 상태 문구"
            name="completedSectionEmptyMessage"
            rows={4}
            value={settings.completedSectionEmptyMessage}
          />
          <TextField
            label="분양완료 섹션 버튼명"
            name="completedSectionButtonLabel"
            value={settings.completedSectionButtonLabel}
          />
          <TextField label="문의 상단 라벨" name="contactSectionEyebrow" value={settings.contactSectionEyebrow} />
          <TextAreaField label="문의 섹션 제목" name="contactSectionTitle" rows={4} value={settings.contactSectionTitle} />
          <TextAreaField
            label="문의 섹션 설명"
            name="contactSectionDescription"
            rows={4}
            value={settings.contactSectionDescription}
          />
          <TextField label="문의 전화 버튼명" name="contactPhoneButtonLabel" value={settings.contactPhoneButtonLabel} />
          <TextField label="문의 상담 버튼명" name="contactFormButtonLabel" value={settings.contactFormButtonLabel} />
        </SettingsSection>

        <SettingsSection
          description="현장 카드 안에 들어가는 라벨과 버튼 문구를 수정합니다."
          title="Project Cards"
        >
          <TextField label="카드 세대수 라벨" name="projectCardHouseholdLabel" value={settings.projectCardHouseholdLabel} />
          <TextField label="카드 평형 라벨" name="projectCardUnitPlanLabel" value={settings.projectCardUnitPlanLabel} />
          <TextField label="카드 입주예정 라벨" name="projectCardMoveInLabel" value={settings.projectCardMoveInLabel} />
          <TextField label="카드 상담번호 라벨" name="projectCardPhoneLabel" value={settings.projectCardPhoneLabel} />
          <TextField
            label="카드 전화 버튼명"
            name="projectCardPhoneButtonLabel"
            value={settings.projectCardPhoneButtonLabel}
          />
          <TextField
            label="카드 상세 버튼명"
            name="projectCardDetailButtonLabel"
            value={settings.projectCardDetailButtonLabel}
          />
        </SettingsSection>

        <SettingsSection
          description="우측 하단 고정 문의 박스와 모바일 하단 고정 버튼 문구를 수정합니다."
          title="Sticky CTA"
        >
          <TextField label="고정 문의 상단 라벨" name="stickyEyebrow" value={settings.stickyEyebrow} />
          <TextAreaField label="고정 문의 제목" name="stickyTitle" rows={4} value={settings.stickyTitle} />
          <TextAreaField label="고정 문의 설명" name="stickyDescription" rows={4} value={settings.stickyDescription} />
          <TextField
            label="고정 문의 전화 버튼명"
            name="stickyPhoneButtonLabel"
            value={settings.stickyPhoneButtonLabel}
          />
          <TextField
            label="고정 문의 상담 버튼명"
            name="stickyContactButtonLabel"
            value={settings.stickyContactButtonLabel}
          />
        </SettingsSection>

        <SettingsSection
          description="푸터 소개 문구, 섹션 제목, 링크 이름, 마지막 저작권 문구를 수정합니다."
          title="Footer"
        >
          <TextField label="푸터 브랜드 문구" name="footerBrandEyebrow" value={settings.footerBrandEyebrow} />
          <TextAreaField label="푸터 설명" name="footerDescription" rows={4} value={settings.footerDescription} />
          <TextField label="푸터 전화 라벨" name="footerPhoneLabel" value={settings.footerPhoneLabel} />
          <TextField label="푸터 이메일 라벨" name="footerEmailLabel" value={settings.footerEmailLabel} />
          <TextField label="푸터 사이트맵 제목" name="footerSitemapTitle" value={settings.footerSitemapTitle} />
          <TextField label="푸터 문의 안내 제목" name="footerInquiryTitle" value={settings.footerInquiryTitle} />
          <TextField
            label="푸터 상담문의 링크명"
            name="footerInquiryContactLabel"
            value={settings.footerInquiryContactLabel}
          />
          <TextField label="푸터 개인정보 링크명" name="footerPrivacyLabel" value={settings.footerPrivacyLabel} />
          <TextField label="푸터 전화문의 링크명" name="footerInquiryPhoneLabel" value={settings.footerInquiryPhoneLabel} />
          <TextField
            label="푸터 분양중 링크명"
            name="footerInquiryProjectsLabel"
            value={settings.footerInquiryProjectsLabel}
          />
          <TextField label="푸터 저작권 문구" name="footerCopyrightText" value={settings.footerCopyrightText} />
          <TextAreaField label="푸터 마지막 문구" name="footerTaglineText" rows={3} value={settings.footerTaglineText} />
        </SettingsSection>

        <section className="rounded-[1.75rem] bg-slate-50 p-5 sm:p-6">
          <p className="text-xs uppercase tracking-[0.32em] text-muted">Mobile Typography</p>
          <p className="mt-3 text-sm leading-7 text-muted">
            모바일 기준으로 홈 화면에 보이는 주요 글씨 크기를 세부 항목별로 조정할 수 있습니다. 숫자를 너무 크게 올리면 줄바꿈이 많아질 수 있으니 조금씩 조정해보세요.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <NumberField
              label="상단 안내 문구 `px`"
              max={16}
              min={8}
              name="mobileHeaderAnnouncementPx"
              step={1}
              value={settings.mobileHeaderAnnouncementPx}
            />
            <NumberField
              label="영문 브랜드명 `px`"
              max={16}
              min={8}
              name="mobileHeaderBrandEnglishPx"
              step={1}
              value={settings.mobileHeaderBrandEnglishPx}
            />
            <NumberField
              label="브랜드명 `rem`"
              max={1.8}
              min={0.95}
              name="mobileHeaderBrandNameRem"
              step={0.01}
              value={settings.mobileHeaderBrandNameRem}
            />
            <NumberField
              label="브랜드 보조 문구 `px`"
              max={16}
              min={8}
              name="mobileHeaderBrandCaptionPx"
              step={1}
              value={settings.mobileHeaderBrandCaptionPx}
            />
            <NumberField
              label="메뉴 글씨 `px`"
              max={18}
              min={10}
              name="mobileHeaderNavPx"
              step={1}
              value={settings.mobileHeaderNavPx}
            />
            <NumberField
              label="버튼 글씨 `px`"
              max={18}
              min={11}
              name="mobileHeaderButtonPx"
              step={1}
              value={settings.mobileHeaderButtonPx}
            />
            <NumberField
              label="메인 눈썹 문구 `px`"
              max={16}
              min={8}
              name="mobileHeroEyebrowPx"
              step={1}
              value={settings.mobileHeroEyebrowPx}
            />
            <NumberField
              label="메인 제목 크기 `rem`"
              max={2.2}
              min={1.1}
              name="mobileHeroTitleRem"
              step={0.01}
              value={settings.mobileHeroTitleRem}
            />
            <NumberField
              label="메인 통계 라벨 `px`"
              max={16}
              min={10}
              name="mobileHeroStatLabelPx"
              step={1}
              value={settings.mobileHeroStatLabelPx}
            />
            <NumberField
              label="메인 통계 숫자 `rem`"
              max={2.2}
              min={1.1}
              name="mobileHeroStatValueRem"
              step={0.01}
              value={settings.mobileHeroStatValueRem}
            />
            <NumberField
              label="추천 현장 라벨 `px`"
              max={18}
              min={10}
              name="mobileFeaturedLabelPx"
              step={1}
              value={settings.mobileFeaturedLabelPx}
            />
            <NumberField
              label="섹션 제목 크기 `rem`"
              max={2}
              min={1}
              name="mobileSectionTitleRem"
              step={0.01}
              value={settings.mobileSectionTitleRem}
            />
            <NumberField
              label="본문 크기 `px`"
              max={18}
              min={12}
              name="mobileBodyTextPx"
              step={1}
              value={settings.mobileBodyTextPx}
            />
            <NumberField
              label="카드 제목 크기 `rem`"
              max={1.6}
              min={0.95}
              name="mobileProjectCardTitleRem"
              step={0.01}
              value={settings.mobileProjectCardTitleRem}
            />
            <NumberField
              label="카드 메타 문구 `px`"
              max={16}
              min={10}
              name="mobileProjectCardMetaPx"
              step={1}
              value={settings.mobileProjectCardMetaPx}
            />
            <NumberField
              label="카드 본문 `px`"
              max={18}
              min={12}
              name="mobileProjectCardBodyPx"
              step={1}
              value={settings.mobileProjectCardBodyPx}
            />
            <NumberField
              label="카드 라벨 `px`"
              max={18}
              min={12}
              name="mobileProjectCardLabelPx"
              step={1}
              value={settings.mobileProjectCardLabelPx}
            />
            <NumberField
              label="카드 버튼 `px`"
              max={18}
              min={11}
              name="mobileProjectCardButtonPx"
              step={1}
              value={settings.mobileProjectCardButtonPx}
            />
            <NumberField
              label="완료 현장 제목 `px`"
              max={18}
              min={12}
              name="mobileCompletedListTitlePx"
              step={1}
              value={settings.mobileCompletedListTitlePx}
            />
            <NumberField
              label="완료 현장 설명 `px`"
              max={18}
              min={12}
              name="mobileCompletedListBodyPx"
              step={1}
              value={settings.mobileCompletedListBodyPx}
            />
            <NumberField
              label="고정 문의 상단 라벨 `px`"
              max={16}
              min={10}
              name="mobileStickyEyebrowPx"
              step={1}
              value={settings.mobileStickyEyebrowPx}
            />
            <NumberField
              label="고정 문의 제목 `rem`"
              max={2.2}
              min={1.1}
              name="mobileStickyTitleRem"
              step={0.01}
              value={settings.mobileStickyTitleRem}
            />
            <NumberField
              label="고정 문의 본문 `px`"
              max={18}
              min={12}
              name="mobileStickyBodyPx"
              step={1}
              value={settings.mobileStickyBodyPx}
            />
            <NumberField
              label="고정 문의 버튼 `px`"
              max={18}
              min={11}
              name="mobileStickyButtonPx"
              step={1}
              value={settings.mobileStickyButtonPx}
            />
            <NumberField
              label="푸터 상단 문구 `px`"
              max={16}
              min={10}
              name="mobileFooterEyebrowPx"
              step={1}
              value={settings.mobileFooterEyebrowPx}
            />
            <NumberField
              label="푸터 제목 `px`"
              max={18}
              min={12}
              name="mobileFooterTitlePx"
              step={1}
              value={settings.mobileFooterTitlePx}
            />
            <NumberField
              label="푸터 본문 `px`"
              max={18}
              min={12}
              name="mobileFooterBodyPx"
              step={1}
              value={settings.mobileFooterBodyPx}
            />
            <NumberField
              label="푸터 링크 `px`"
              max={18}
              min={12}
              name="mobileFooterLinkPx"
              step={1}
              value={settings.mobileFooterLinkPx}
            />
            <NumberField
              label="푸터 맨 아래 문구 `px`"
              max={16}
              min={11}
              name="mobileFooterBottomPx"
              step={1}
              value={settings.mobileFooterBottomPx}
            />
          </div>
        </section>

        <div className="flex justify-end">
          <SubmitButton className="button-primary">홈페이지 설정 저장</SubmitButton>
        </div>
      </form>
    </div>
  );
}
