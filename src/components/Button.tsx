import Link from "next/link";
import type { ReactNode } from "react";
import { isExternal } from "@/lib/links";

type Variant = "tan" | "outline-light" | "outline-dark" | "forest" | "ink";

const styles: Record<Variant, string> = {
  tan: "bg-tan text-ink hover:bg-[#d9bb82]",
  forest: "bg-forest text-white hover:bg-[#2a5239]",
  ink: "bg-ink text-white hover:bg-forest",
  "outline-light": "border-2 border-white/70 text-white hover:border-tan hover:text-tan",
  "outline-dark": "border-2 border-ink text-ink hover:bg-ink hover:text-white",
};

export default function Button({
  href,
  variant = "tan",
  children,
  className = "",
  size = "md",
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  size?: "md" | "lg";
}) {
  const cls = `inline-flex items-center justify-center rounded-full font-body font-medium transition-colors duration-200 ${
    size === "lg" ? "px-8 py-4 text-lg" : "px-6 py-3 text-base"
  } ${styles[variant]} ${className}`;
  if (isExternal(href)) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
