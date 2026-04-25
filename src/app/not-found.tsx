import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-shell section-space">
      <div className="surface-dark bg-hero-navy p-10 text-center">
        <span className="section-kicker">404</span>
        <h1 className="mt-6 text-5xl text-white">현장을 찾을 수 없습니다</h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-white/70">
          요청하신 페이지의 주소가 변경되었거나 현재 준비 중일 수 있습니다. 분양중 현장 목록에서
          다시 확인해주세요.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link className="button-accent" href="/projects">
            분양중 현장 보기
          </Link>
          <Link className="button-secondary !bg-white !text-deep" href="/">
            홈으로
          </Link>
        </div>
      </div>
    </div>
  );
}
