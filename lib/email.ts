import "server-only";
import nodemailer from "nodemailer";

// Email notifications for new submissions.
//
// PLACEHOLDER SMTP: configure these env vars with your real SMTP credentials
// later (see .env.example). Until SMTP_HOST is set, sendMail() is a safe no-op
// that just logs — submissions still succeed without email configured.
//
//   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE
//   MAIL_FROM   — the From: address
//   MAIL_TO     — where submission notifications are delivered (admin inbox)

function isConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.MAIL_TO);
}

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
  });
  return transporter;
}

type Mail = {
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

/**
 * Sends a notification to the admin inbox. Never throws — email failures must
 * not break a public form submission. Returns true if actually sent.
 */
export async function sendMail({ subject, text, html, replyTo }: Mail): Promise<boolean> {
  if (!isConfigured()) {
    // Placeholder path: no SMTP yet. Log so it's visible during development.
    console.info(`[email] (not configured) would send: "${subject}"`);
    return false;
  }
  try {
    await getTransporter().sendMail({
      from: process.env.MAIL_FROM ?? process.env.SMTP_USER,
      to: process.env.MAIL_TO,
      subject,
      text,
      html,
      replyTo,
    });
    return true;
  } catch (err) {
    console.error("[email] send failed:", err);
    return false;
  }
}

export async function notifyNewContact(input: {
  name: string;
  email: string;
  company?: string | null;
  subject?: string | null;
  message: string;
}): Promise<void> {
  const lines = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Company: ${input.company || "—"}`,
    `Subject: ${input.subject || "—"}`,
    "",
    input.message,
  ];
  await sendMail({
    subject: `New contact message — ${input.name}`,
    text: lines.join("\n"),
    replyTo: input.email,
  });
}

export async function notifyNewApplication(input: {
  firstName: string;
  lastName: string;
  email: string;
  roleTitle?: string | null;
  phone?: string | null;
  location?: string | null;
}): Promise<void> {
  const lines = [
    `Name: ${input.firstName} ${input.lastName}`,
    `Email: ${input.email}`,
    `Role: ${input.roleTitle || "—"}`,
    `Phone: ${input.phone || "—"}`,
    `Location: ${input.location || "—"}`,
    "",
    "View full details in the admin dashboard → Applications.",
  ];
  await sendMail({
    subject: `New application — ${input.firstName} ${input.lastName}${
      input.roleTitle ? ` (${input.roleTitle})` : ""
    }`,
    text: lines.join("\n"),
    replyTo: input.email,
  });
}
