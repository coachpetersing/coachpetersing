import type { Metadata } from "next";
import { copy } from "@/content/copy";
import { pageMeta, descriptions } from "@/lib/seo";
import { checkEmailSig } from "@/lib/sign";
import { readRows, setCell } from "@/lib/sheets";
import { redirect } from "next/navigation";

export const metadata: Metadata = pageMeta("Unsubscribe", descriptions.unsubscribe, "/unsubscribe", { noindex: true });
export const dynamic = "force-dynamic";

// A button (POST) instead of acting on page load, so email scanners that open links don't unsubscribe people.
async function unsubscribe(fd: FormData) {
  "use server";
  const email = String(fd.get("e") ?? "").toLowerCase();
  const sig = String(fd.get("t") ?? "");
  if (!checkEmailSig(email, sig)) redirect("/unsubscribe?status=invalid");
  try {
    const rows = await readRows("Tryouts");
    for (const r of rows.filter((r) => r.Email.toLowerCase() === email)) await setCell("Tryouts", r._row, "Status", "Removed");
  } catch (err) {
    console.error("[unsubscribe] Sheet update failed:", (err as Error).message);
  }
  redirect("/unsubscribe?status=done");
}

export default async function UnsubscribePage({ searchParams }: { searchParams: Promise<{ e?: string; t?: string; status?: string }> }) {
  const { e = "", t = "", status } = await searchParams;
  const valid = status !== "invalid" && (status === "done" || checkEmailSig(e, t));
  return (
    <section className="grain section pt-10">
      <div className="wrap max-w-[760px]">
        <h1 className="h1">{copy.unsubscribe.h1}</h1>
        {status === "done" ? (
          <p role="status" className="mt-6 text-lg">
            {copy.unsubscribe.done}
          </p>
        ) : !valid ? (
          <p className="mt-6 text-lg">{copy.unsubscribe.invalid}</p>
        ) : (
          <form action={unsubscribe} className="mt-6">
            <p className="text-lg text-cream-50/90">{copy.unsubscribe.body}</p>
            <input type="hidden" name="e" value={e} />
            <input type="hidden" name="t" value={t} />
            <button type="submit" className="btn-primary mt-8">
              {copy.unsubscribe.button}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
