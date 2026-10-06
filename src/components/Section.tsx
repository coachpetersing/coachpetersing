import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  dark?: boolean;
  tight?: boolean;
  id?: string;
  className?: string;
  /** Alternate light background. Overrides the cream default. */
  tone?: "cream" | "sand";
};

export default function Section({ children, dark, tight, id, className = "", tone = "cream" }: Props) {
  const bg = dark ? "bg-ink text-white" : tone === "sand" ? "bg-[#EFE8DA] text-offblack" : "bg-cream text-offblack";
  return (
    <section
      id={id}
      className={`${bg} ${
        tight ? "py-12 md:py-16" : "py-20 md:py-28"
      } ${className}`}
    >
      <div className="mx-auto w-full max-w-site px-5 md:px-8">{children}</div>
    </section>
  );
}

export function Heading({ children, dark, small }: { children: ReactNode; dark?: boolean; small?: boolean }) {
  return (
    <h2
      className={`font-display font-extrabold tracking-tight ${
        small ? "text-3xl md:text-4xl" : "text-4xl md:text-6xl"
      } ${dark ? "text-white" : "text-ink"}`}
    >
      {children}
    </h2>
  );
}

export function Eyebrow({ children, tone = "tan" }: { children: ReactNode; tone?: "tan" | "forest" }) {
  return (
    <p className={`mb-3 font-body text-sm font-medium uppercase tracking-[0.18em] ${tone === "forest" ? "text-forest" : "text-tan"}`}>
      {children}
    </p>
  );
}
