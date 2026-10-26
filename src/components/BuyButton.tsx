"use client";

import type { ReactNode } from "react";
import { startCheckout } from "@/app/checkout/actions";
import { track } from "@/lib/track";

/** A button that starts Stripe Checkout for one product. Records `buy_click` with where it was clicked. */
export default function BuyButton({
  product,
  location,
  className = "btn-primary",
  children,
}: {
  product: string;
  location: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <form action={startCheckout.bind(null, product)} className="contents">
      <button type="submit" className={className} onClick={() => track("buy_click", { product, location })}>
        {children}
      </button>
    </form>
  );
}
