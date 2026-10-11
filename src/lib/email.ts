import { Resend } from "resend";
import { env } from "./env";

let client: Resend | null = null;
function resend() {
  const key = env.resendKey();
  if (!key) throw new Error("RESEND_API_KEY is not set");
  if (!client) client = new Resend(key);
  return client;
}

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const linkify = (s: string) =>
  escape(s).replace(/(https?:\/\/[^\s<]+[^\s<.,)])/g, '<a href="$1" style="color:#2F5A3E;text-decoration:underline">$1</a>');

/**
 * Renders paragraphs into a plain personal-looking email (cream background, forest text) plus
 * a plain-text version. Lines starting with "?key:" only appear when vars[key] is truthy.
 */
export function render(paragraphs: string[], vars: Record<string, string | number | null | undefined> = {}, opts: { sign?: boolean; footer?: string[] } = {}) {
  const fillVars = (s: string) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
  const lines = paragraphs
    .filter((p) => {
      const m = p.match(/^\?(\w+):/);
      return !m || Boolean(vars[m[1]]);
    })
    .map((p) => fillVars(p.replace(/^\?\w+:/, "")));
  if (opts.sign !== false) lines.push("Peter");
  const footer = (opts.footer ?? []).map(fillVars);

  const text = [...lines, ...(footer.length ? ["--", ...footer] : [])].join("\n\n");
  const p = (s: string, style = "") => `<p style="margin:0 0 16px;${style}">${linkify(s)}</p>`;
  const html = `<!doctype html><html><body style="margin:0;padding:0;background:#F6F0E4">
<div style="max-width:560px;margin:0 auto;padding:32px 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;color:#0E1A12">
${lines.map((l) => p(l)).join("\n")}
${footer.length ? `<div style="margin-top:32px;padding-top:16px;border-top:1px solid #E6DCC8;font-size:14px;color:#2F5A3E">${footer.map((f) => p(f, "margin:0 0 8px")).join("")}</div>` : ""}
</div></body></html>`;
  return { html, text };
}

export async function sendEmail({
  to,
  subject,
  html,
  text,
  replyTo,
}: {
  to: string;
  subject: string;
  html?: string;
  text: string;
  replyTo?: string;
}) {
  const { error } = await resend().emails.send({
    from: env.emailFrom(),
    to,
    subject,
    html: html ?? `<pre style="font-family:inherit;white-space:pre-wrap">${escape(text)}</pre>`,
    text,
    replyTo: replyTo ?? env.emailPeter(),
  });
  if (error) throw new Error(`Resend: ${error.message}`);
}

/** Plain note to Peter. Never throws; returns false if it didn't send, so forms can warn instead of losing data. */
export async function notifyPeter(subject: string, fields: Record<string, string | number | undefined | null> | string, replyTo?: string): Promise<boolean> {
  const text =
    typeof fields === "string"
      ? fields
      : Object.entries(fields)
          .map(([k, v]) => `${k}: ${v ?? ""}`)
          .join("\n");
  try {
    await sendEmail({ to: env.emailPeter(), subject, text, replyTo });
    return true;
  } catch (err) {
    console.error("[email] note to Peter failed:", subject, (err as Error).message);
    return false;
  }
}
