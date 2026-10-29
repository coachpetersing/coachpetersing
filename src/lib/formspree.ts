/**
 * Backup delivery to Peter through Formspree, used only when the email service (Resend) isn't set
 * up or fails, so a form is never lost.
 */
export async function formspree(fields: Record<string, string>) {
  const id = process.env.NEXT_PUBLIC_FORMSPREE_ID;
  if (!id) return false;
  try {
    const res = await fetch(`https://formspree.io/f/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(fields),
      cache: "no-store",
    });
    if (!res.ok) console.error("[formspree] Formspree returned", res.status);
    return res.ok;
  } catch (err) {
    console.error("[formspree] Formspree failed:", (err as Error).message);
    return false;
  }
}

