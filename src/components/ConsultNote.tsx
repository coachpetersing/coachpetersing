import { site } from "@/content/site";
import { copy } from "@/content/copy";
import { mailto } from "@/lib/links";

/**
 * The free 15-minute consult is requested by email, not booked. The email address is a mailto
 * link with the subject "Free consult request".
 */
export default function ConsultNote({
  variant = "short",
  dark = false,
  className = "",
}: {
  /** "short" sits under booking buttons; "coaching" sits under the 1:1 session options. */
  variant?: "short" | "coaching";
  dark?: boolean;
  className?: string;
}) {
  const c = copy.consult;
  const [before, after] = variant === "coaching" ? [c.coachingBefore, c.coachingAfter] : [c.shortBefore, c.shortAfter];
  return (
    <p className={`font-body text-base ${dark ? "text-white/75" : "text-offblack/80"} ${className}`}>
      {before}{" "}
      <a
        href={mailto(c.subject)}
        className={`font-medium underline underline-offset-4 ${dark ? "text-tan hover:text-white" : "text-forest hover:text-ink"}`}
      >
        {site.email}
      </a>{" "}
      {after}
    </p>
  );
}
