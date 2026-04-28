import { updateHomeHeroContentAction } from "@/app/admin/actions";
import { AdminHomeHeroForm } from "@/components/admin/admin-home-hero-form";
import { AdminSetupNotice } from "@/components/admin/admin-setup-notice";
import { FlashBanner } from "@/components/ui/flash-banner";
import { getHomeHeroContent } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "메인 문구 설정"
};

export default async function AdminSitePage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const message = Array.isArray(params.message) ? params.message[0] : params.message;
  const error = Array.isArray(params.error) ? params.error[0] : params.error;
  const homeHero = await getHomeHeroContent();

  return (
    <div className="space-y-6">
      <FlashBanner message={message} tone="success" />
      <FlashBanner message={error} tone="error" />
      {!isSupabaseConfigured() ? <AdminSetupNotice /> : null}
      <AdminHomeHeroForm action={updateHomeHeroContentAction} initialValues={homeHero} />
    </div>
  );
}
