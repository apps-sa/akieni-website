import { NextResponse } from "next/server";
import { z } from "zod";
import { notifyNewContact } from "@/lib/email";
import { supabaseAdmin } from "@/lib/supabase/server";

// Public endpoint: persists a contact-form submission. Not cached (default for
// non-GET in Next 16). Writes via the service-role client.

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  subject: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(5000),
  // Honeypot: real users leave this empty.
  website: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    const form = await request.formData();
    payload = Object.fromEntries(form.entries());
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed." }, { status: 400 });
  }
  const { website, company, subject, ...rest } = parsed.data;
  if (website) {
    // Honeypot tripped — pretend success, store nothing.
    return NextResponse.json({ ok: true });
  }

  const { error } = await supabaseAdmin()
    .from("contacts")
    .insert({
      ...rest,
      company: company || null,
      subject: subject || null,
    });

  if (error) {
    return NextResponse.json({ error: "Could not save message." }, { status: 500 });
  }

  // Fire-and-forget notification — never blocks or fails the submission.
  await notifyNewContact({
    name: rest.name,
    email: rest.email,
    company,
    subject,
    message: rest.message,
  });

  return NextResponse.json({ ok: true });
}
