"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track } from "@/lib/track";

/** Any link to /tryouts. Records `tryout_click` with where on the site it was clicked. */
export default function TryoutLink({
  location,
  href = "/tryouts",
  className = "btn-primary",
  children,
  ...rest
}: {
  location: string;
  href?: string;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}) {
  return (
    <Link href={href} className={className} onClick={() => track("tryout_click", { location })} {...rest}>
      {children}
    </Link>
  );
}
