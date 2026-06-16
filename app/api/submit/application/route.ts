import { NextResponse } from "next/server";
import { z } from "zod";
import { notifyNewApplication } from "@/lib/email";
import { CV_BUCKET, supabaseAdmin } from "@/lib/supabase/server";

// Public endpoint: persists a job application and uploads its CV to the private
// `cvs` bucket. Expects multipart/form-data.

const MAX_CV_BYTES = 8 * 1024 * 1024; // 8 MB
const ALLOWED_CV_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const ApplicationSchema = z.object({
  firstName: z.string().trim().min(1).max(120),
  lastName: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().min(1).max(60),
  location: z.string().trim().min(1).max(200),
  profile: z.string().trim().url().max(500),
  roleTitle: z.string().trim().max(200).optional().or(z.literal("")),
  roleSlug: z.string().trim().max(200).optional().or(z.literal("")),
  cover: z.string().trim().min(1).max(5000),
  source: z.string().trim().min(1).max(120),
  consent: z.union([z.literal("on"), z.literal("true")]),
  website: z.string().max(0).optional(), // honeypot
});

function safeName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-120);
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const fields = Object.fromEntries(
    [...form.entries()].filter(([, v]) => typeof v === "string"),
  );
  const parsed = ApplicationSchema.safeParse(fields);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed." }, { status: 400 });
  }
  if (parsed.data.website) {
    return NextResponse.json({ ok: true }); // honeypot
  }

  const db = supabaseAdmin();

  // CV upload (required).
  const cv = form.get("cv");
  if (!(cv instanceof File) || cv.size === 0) {
    return NextResponse.json({ error: "A CV is required." }, { status: 400 });
  }
  if (cv.size > MAX_CV_BYTES) {
    return NextResponse.json({ error: "CV exceeds 8 MB." }, { status: 400 });
  }
  if (!ALLOWED_CV_TYPES.has(cv.type)) {
    return NextResponse.json({ error: "CV must be PDF or Word." }, { status: 400 });
  }
  const cvPath = `applications/${crypto.randomUUID()}-${safeName(cv.name)}`;
  const { error: uploadError } = await db.storage
    .from(CV_BUCKET)
    .upload(cvPath, cv, { contentType: cv.type, upsert: false });
  if (uploadError) {
    return NextResponse.json({ error: "CV upload failed." }, { status: 500 });
  }

  const d = parsed.data;
  const { error } = await db.from("applications").insert({
    first_name: d.firstName,
    last_name: d.lastName,
    email: d.email,
    phone: d.phone || null,
    location: d.location || null,
    profile_url: d.profile || null,
    role_title: d.roleTitle || null,
    role_slug: d.roleSlug || null,
    cv_path: cvPath,
    cover_note: d.cover || null,
    source: d.source || null,
    consent: true,
  });

  if (error) {
    return NextResponse.json({ error: "Could not save application." }, { status: 500 });
  }

  // Fire-and-forget notification — never blocks or fails the submission.
  await notifyNewApplication({
    firstName: d.firstName,
    lastName: d.lastName,
    email: d.email,
    roleTitle: d.roleTitle || null,
    phone: d.phone || null,
    location: d.location || null,
  });

  return NextResponse.json({ ok: true });
}
