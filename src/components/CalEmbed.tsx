import { copy } from "@/content/copy";

/** A Cal.com booking page, embedded. Shows a note instead when the URL isn't set yet. */
export default function CalEmbed({ url, title, email, name }: { url: string; title: string; email?: string; name?: string }) {
  if (!url) return <p className="text-muted">{copy.welcome.noCal}</p>;
  const q = new URLSearchParams({ embed: "true", theme: "dark" });
  if (email) q.set("email", email);
  if (name) q.set("name", name);
  const src = `${url}${url.includes("?") ? "&" : "?"}${q.toString()}`;
  return (
    <>
      <iframe src={src} title={title} className="h-[760px] w-full rounded-card border border-forest-800 bg-forest-900" loading="lazy" />
      <a href={url} target="_blank" rel="noopener noreferrer" className="link mt-4 inline-block text-sm">
        {copy.welcome.bookFallback}
      </a>
    </>
  );
}
