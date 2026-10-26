import Link from "next/link";
import { copy } from "@/content/copy";

export default function NotFound() {
  return (
    <section className="grain section flex min-h-[70vh] items-center">
      <div className="wrap">
        <p aria-hidden="true" className="font-display text-[120px] font-extrabold leading-none text-tan-400 sm:text-[200px]">
          404
        </p>
        <h1 className="h1 mt-2">{copy.notFound.h1}</h1>
        <p className="mt-6 text-lg text-cream-50/90">{copy.notFound.body}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn-secondary">
            {copy.notFound.home}
          </Link>
          <Link href="/#prices" className="btn-primary">
            {copy.notFound.prices}
          </Link>
        </div>
      </div>
    </section>
  );
}
