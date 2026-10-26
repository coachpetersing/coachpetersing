"use client";

import { useEffect, useState } from "react";
import { findPartner } from "@/content/partners";
import { copy, fill } from "@/content/copy";
import { products, referredPrice, type ProductId } from "@/content/site";
import { PARTNER_EVENT, readPartnerCode } from "./PartnerCode";

/** On a price card: the first-payment price once a partner code is in. Renders nothing otherwise. */
export default function PartnerNote({ product }: { product: ProductId }) {
  const [code, setCode] = useState<string | null>(null);
  useEffect(() => {
    const read = () => setCode(readPartnerCode());
    read();
    window.addEventListener(PARTNER_EVENT, read);
    return () => window.removeEventListener(PARTNER_EVENT, read);
  }, []);
  const partner = findPartner(code);
  if (!partner) return null;
  const p = products[product];
  const text =
    p.per === "once"
      ? fill(copy.partner.cardOnce, { price: referredPrice(product), name: partner.name })
      : fill(copy.partner.cardFirstMonth, { price: referredPrice(product), name: partner.name, full: p.price });
  return <p className="mt-3 rounded-xl bg-forest-600/15 px-3 py-2 text-sm font-semibold text-forest-600">{text}</p>;
}
