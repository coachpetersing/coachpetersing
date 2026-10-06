import { site } from "@/content/site";

export default function SocialLinks({
  dark = true,
  className = "",
  showHandle = true,
}: {
  dark?: boolean;
  className?: string;
  showHandle?: boolean;
}) {
  const links = [
    { name: "Instagram", url: site.social.instagram },
    { name: "TikTok", url: site.social.tiktok },
    { name: "YouTube", url: site.social.youtube },
  ];
  return (
    <div
      className={`flex flex-wrap items-center gap-x-5 gap-y-2 font-body text-base ${
        dark ? "text-white/70" : "text-offblack/70"
      } ${className}`}
    >
      {showHandle && <span className={dark ? "text-tan" : "text-forest"}>{site.handle}</span>}
      {links.map((l) => (
        <a
          key={l.name}
          href={l.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`underline-offset-4 hover:underline ${dark ? "hover:text-white" : "hover:text-ink"}`}
        >
          {l.name}
        </a>
      ))}
    </div>
  );
}
