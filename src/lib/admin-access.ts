export function parseAdminEmails() {
  return (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAllowedAdminEmail(email?: string | null) {
  if (!email) return false;

  const whitelist = parseAdminEmails();
  if (whitelist.length === 0) return true;

  return whitelist.includes(email.toLowerCase());
}
