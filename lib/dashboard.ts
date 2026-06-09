import "server-only";
import { headers } from "next/headers";
import { auth } from "./auth";
import { isAdminEmail } from "./admin";
import { CV_BUCKET, supabaseAdmin } from "./supabase/server";

// Server-side data + session helpers for the /dashboard route tree.

export type Contact = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  subject: string | null;
  message: string;
  read: boolean;
  created_at: string;
};

export type Application = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  location: string | null;
  profile_url: string | null;
  role_title: string | null;
  role_slug: string | null;
  cv_path: string | null;
  cover_note: string | null;
  source: string | null;
  consent: boolean;
  status: string;
  created_at: string;
};

export type AdminSession = { email: string; name: string | null };

/** Returns the signed-in admin, or null if not signed in / not allowlisted. */
export async function getAdminSession(): Promise<AdminSession | null> {
  const session = await auth.api.getSession({ headers: await headers() });
  const email = session?.user?.email;
  if (!email || !isAdminEmail(email)) return null;
  return { email, name: session.user.name ?? null };
}

export async function getContacts(): Promise<Contact[]> {
  const { data } = await supabaseAdmin()
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });
  return (data as Contact[]) ?? [];
}

export async function getContactById(id: string): Promise<Contact | null> {
  const { data } = await supabaseAdmin()
    .from("contacts")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  return (data as Contact) ?? null;
}

export async function getApplications(): Promise<Application[]> {
  const { data } = await supabaseAdmin()
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });
  return (data as Application[]) ?? [];
}

export async function getApplicationById(id: string): Promise<Application | null> {
  const { data } = await supabaseAdmin()
    .from("applications")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  return (data as Application) ?? null;
}

export async function getOverview() {
  const [contacts, applications] = await Promise.all([
    getContacts(),
    getApplications(),
  ]);
  return {
    contacts,
    applications,
    contactCount: contacts.length,
    applicationCount: applications.length,
    unreadContacts: contacts.filter((c) => !c.read).length,
    newApplications: applications.filter((a) => a.status === "new").length,
    recentContacts: contacts.slice(0, 5),
    recentApplications: applications.slice(0, 5),
  };
}

/** Short-lived signed URL for a CV object, or null. */
export async function signedCvUrl(cvPath: string | null): Promise<string | null> {
  if (!cvPath) return null;
  const { data } = await supabaseAdmin()
    .storage.from(CV_BUCKET)
    .createSignedUrl(cvPath, 60 * 10); // 10 minutes
  return data?.signedUrl ?? null;
}
