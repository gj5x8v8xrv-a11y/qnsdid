import { AdminInquiryTable } from "@/components/admin/admin-inquiry-table";
import { AdminSetupNotice } from "@/components/admin/admin-setup-notice";
import { FlashBanner } from "@/components/ui/flash-banner";
import { getInquiries } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "문의 목록"
};

export default async function AdminInquiriesPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const message = Array.isArray(params.message) ? params.message[0] : params.message;
  const error = Array.isArray(params.error) ? params.error[0] : params.error;
  const inquiries = await getInquiries();

  return (
    <div className="space-y-6">
      <FlashBanner message={message} tone="success" />
      <FlashBanner message={error} tone="error" />
      {!isSupabaseConfigured() ? <AdminSetupNotice /> : null}
      <AdminInquiryTable inquiries={inquiries} />
    </div>
  );
}
