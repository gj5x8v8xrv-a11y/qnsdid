# 분양대행 대표 홈페이지

Next.js App Router, Tailwind CSS, Supabase 기반으로 만든 분양대행 회사 대표 홈페이지입니다.
Vercel에 배포 가능한 구조이며, 배포 후에는 노트북이 꺼져 있어도 24시간 접속 가능한 운영형 사이트로 사용할 수 있습니다.

기본 브랜드 값은 `분양맵`, 대표번호는 `1533-8170` 으로 설정되어 있습니다.

## 포함 기능

- 대표 홈페이지 `/`
- 회사소개 `/company`
- 분양중 목록 `/projects`
- 분양완료 목록 `/completed`
- 현장 상세 `/projects/[slug]`
- 상담문의 `/contact`
- 숨김 처리된 관리자 로그인 `/admin/login`
- 관리자 대시보드 `/admin`
- 현장 추가 / 수정 / 삭제 / 상태 변경
- 대표 이미지 + 상세 이미지 다중 업로드
- 상담문의 저장 및 관리자 문의 목록 확인
- 현장별 SEO 메타 자동 생성
- `/admin` 경로 자동 보호 및 비로그인 사용자 로그인 페이지 이동
- `robots.txt` / `sitemap.xml` 자동 생성

## 폴더 구조

```text
src/
  app/
    (site)/
      page.tsx
      company/page.tsx
      completed/page.tsx
      projects/page.tsx
      projects/[slug]/page.tsx
      contact/page.tsx
    admin/
      login/page.tsx
      (dashboard)/
        page.tsx
        projects/new/page.tsx
        projects/[id]/edit/page.tsx
        inquiries/page.tsx
  components/
    admin/
    site/
    ui/
  lib/
    auth.ts
    data.ts
    seo.ts
    storage.ts
    supabase/
supabase/
  schema.sql
proxy.ts
DEPLOY_GUIDE.md
```

## 시작 방법

1. 원하는 위치에서 의존성 설치

```bash
npm install
```

2. 환경변수 설정

```bash
cp .env.example .env.local
```

3. Supabase 프로젝트 생성 후 `.env.local` 값 입력

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SECRET_KEY`
- `ADMIN_EMAILS`

4. Supabase SQL Editor 에서 `supabase/schema.sql` 실행

5. Supabase Auth > Users 에서 관리자 이메일/비밀번호 계정 생성

6. 개발 서버 실행

```bash
npm run dev
```

## 운영 배포

이 프로젝트는 로컬 전용이 아니라 Vercel 배포를 전제로 구성되어 있습니다.

- Vercel 배포
- Supabase DB / Auth / Storage 연결
- 환경변수 설정
- 도메인 연결

자세한 배포 순서는 [DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md) 에 정리되어 있습니다.

## 관리자 운영 방식

- 일반 방문자 화면에는 관리자 로그인 링크가 노출되지 않습니다.
- 관리자는 `/admin` 또는 `/admin/login` 을 직접 입력해 로그인합니다.
- 로그인하지 않고 `/admin` 하위 경로에 접근하면 자동으로 `/admin/login` 으로 이동합니다.
- `/admin/projects/new` 에서 새 현장 등록
- `/admin/projects/[id]/edit` 에서 현장 수정
- 대시보드에서 상태를 `분양중 / 분양완료` 로 전환
- `/admin/inquiries` 에서 문의 목록과 응대 상태 확인

## 이미지 업로드 방식

- 대표 이미지는 `projects/[projectId]/cover`
- 상세 이미지는 `projects/[projectId]/gallery`
- 업로드 후 Supabase Storage Public URL 을 자동 생성해서 DB 에 저장

## 초보자용 운영 팁

- slug 는 광고 랜딩 URL 이므로 영문 소문자/숫자/하이픈만 사용하세요.
- 예시: `haneulchae`, `ipark-central`, `songdo-premium`
- 분양이 끝난 현장은 삭제하지 말고 `분양완료` 로 바꾸면 실적 페이지처럼 활용할 수 있습니다.
- 방문예약 버튼은 네이버 예약 URL 이 없으면 기본적으로 상담문의 페이지로 연결됩니다.

## 참고

- Supabase 환경변수가 없으면 샘플 데이터로 화면만 미리 확인할 수 있습니다.
- 실제 저장, 로그인, 이미지 업로드는 Supabase 연결 후 활성화됩니다.
- 운영 배포 시 `NEXT_PUBLIC_SITE_URL` 은 실제 도메인으로 설정해야 합니다.
