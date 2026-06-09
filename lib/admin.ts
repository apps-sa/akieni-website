// Admin allowlist. The set of Google accounts permitted into /dashboard is
// driven entirely by the ADMIN_EMAILS env var (comma-separated). Used by the
// BetterAuth sign-in hook and the dashboard layout guard.

function adminEmails(): Set<string> {
  return new Set(
    (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean),
  );
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return adminEmails().has(email.trim().toLowerCase());
}
