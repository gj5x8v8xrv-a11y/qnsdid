# 배포 가이드

이 프로젝트는 `Next.js + Supabase` 구조로 만들어져 있어서 `Vercel`에 배포하면 노트북이 꺼져 있어도 24시간 접속 가능한 운영형 사이트로 사용할 수 있습니다.

## 1. 준비물

- GitHub 저장소
- Vercel 계정
- Supabase 계정
- 연결할 도메인

## 2. Supabase 설정

### 2-1. 프로젝트 생성

Supabase에서 새 프로젝트를 만든 뒤 아래 값을 준비합니다.

- `Project URL`
- `Publishable Key`
- `Secret Key`

### 2-2. DB 테이블 생성

Supabase Dashboard의 `SQL Editor`에서 아래 파일 내용을 실행합니다.

- [supabase/schema.sql](./supabase/schema.sql)

### 2-3. Storage 버킷 생성

`Storage`에서 버킷을 생성합니다.

- 버킷 이름: `project-media`
- 공개 여부: `Public`

이 프로젝트는 대표 이미지와 상세 이미지를 이 버킷에 저장합니다.

### 2-4. 관리자 계정 생성

`Authentication > Users`에서 이메일/비밀번호 계정을 생성합니다.

예시:

- `admin@yourdomain.com`

이 이메일은 아래 `ADMIN_EMAILS` 환경변수에도 동일하게 넣어야 합니다.

### 2-5. Auth URL 설정

`Authentication > URL Configuration`에서 아래를 설정합니다.

- `Site URL`: 실제 운영 도메인
- `Redirect URLs`:
  - `http://localhost:3000/**`
  - `https://*-<team-or-account-slug>.vercel.app/**`
  - `https://www.yourdomain.com/**`
  - 필요하면 `https://yourdomain.com/**`

## 3. 환경변수 설정

로컬에서는 `.env.local`, 배포에서는 Vercel 환경변수에 아래 값을 동일하게 넣습니다.

```env
NEXT_PUBLIC_SITE_URL=https://www.yourdomain.com
NEXT_PUBLIC_COMPANY_NAME=분양맵
NEXT_PUBLIC_COMPANY_TAGLINE=프리미엄 분양 현장을 가장 설득력 있게 소개하는 파트너
NEXT_PUBLIC_COMPANY_DESCRIPTION=현장 기획부터 상담 연결까지 신뢰감 있게 운영하는 분양대행 전문 회사
NEXT_PUBLIC_COMPANY_PHONE=1533-8170
NEXT_PUBLIC_COMPANY_EMAIL=hello@yourdomain.com
NEXT_PUBLIC_COMPANY_ADDRESS=서울시 강남구 테헤란로 100

NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
SUPABASE_SECRET_KEY=YOUR_SUPABASE_SECRET_KEY
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=project-media

ADMIN_EMAILS=admin@yourdomain.com
```

## 4. GitHub 업로드

프로젝트를 GitHub 저장소에 올립니다.

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
git push -u origin main
```

## 5. Vercel 배포

### 5-1. 저장소 연결

1. Vercel 로그인
2. `Add New Project`
3. GitHub 저장소 선택
4. Framework는 `Next.js`로 자동 인식되는지 확인
5. 프로젝트 생성

### 5-2. Vercel 환경변수 입력

Vercel 프로젝트의 `Settings > Environment Variables`에서 아래 값을 추가합니다.

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_COMPANY_NAME`
- `NEXT_PUBLIC_COMPANY_TAGLINE`
- `NEXT_PUBLIC_COMPANY_DESCRIPTION`
- `NEXT_PUBLIC_COMPANY_PHONE`
- `NEXT_PUBLIC_COMPANY_EMAIL`
- `NEXT_PUBLIC_COMPANY_ADDRESS`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SECRET_KEY`
- `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET`
- `ADMIN_EMAILS`

환경변수 저장 후에는 반드시 다시 배포하거나 `Redeploy` 해야 반영됩니다.

## 6. 도메인 연결

### 6-1. Vercel 프로젝트에 도메인 추가

Vercel 프로젝트에서 아래 메뉴로 이동합니다.

- `Settings > Domains`

여기서 운영 도메인을 추가합니다.

예시:

- `www.yourdomain.com`
- `yourdomain.com`

### 6-2. DNS 연결

도메인 구입처(가비아, 카페24, 호스팅KR 등)에서 Vercel이 안내하는 DNS 레코드를 그대로 등록합니다.

보통은 아래 둘 중 하나를 사용합니다.

- 루트 도메인: `A` 레코드
- `www` 서브도메인: `CNAME` 레코드

DNS 반영 후 Vercel에서 `Valid Configuration` 또는 연결 완료 상태를 확인합니다.

### 6-3. 운영 도메인으로 환경변수 수정

도메인 연결이 완료되면 `NEXT_PUBLIC_SITE_URL` 값을 실제 운영 주소로 고정합니다.

예시:

```env
NEXT_PUBLIC_SITE_URL=https://www.yourdomain.com
```

그다음 Vercel에서 다시 배포합니다.

## 7. 관리자 접근 방식

- 일반 사용자 화면에는 관리자 로그인 링크가 노출되지 않습니다.
- 관리자는 주소창에 `/admin` 또는 `/admin/login` 을 직접 입력해 접근합니다.
- 로그인하지 않은 상태에서 `/admin`, `/admin/projects`, `/admin/inquiries` 등으로 들어가면 자동으로 `/admin/login` 으로 이동합니다.
- 검색엔진에는 `/admin` 경로가 노출되지 않도록 `robots`와 `noindex` 설정이 포함되어 있습니다.

## 8. 운영 체크리스트

- Supabase SQL 실행 완료
- Storage 버킷 `project-media` 생성 및 공개 설정 완료
- 관리자 이메일/비밀번호 계정 생성 완료
- Vercel 환경변수 입력 완료
- 운영 도메인 연결 완료
- `NEXT_PUBLIC_SITE_URL` 를 실제 도메인으로 설정 완료

## 9. 배포 후 확인할 주소

- 메인: `/`
- 회사소개: `/company`
- 분양중: `/projects`
- 분양완료: `/completed`
- 상담문의: `/contact`
- 관리자 로그인: `/admin/login`

관리자 로그인 주소는 외부 메뉴에 노출되지 않으며, 직접 주소로만 접근합니다.
