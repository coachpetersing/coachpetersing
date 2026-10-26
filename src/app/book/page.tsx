import type { Metadata } from "next";
import { copy } from "@/content/copy";
import { pageMeta, descriptions } from "@/lib/seo";
import BookForm from "./BookForm";

export const metadata: Metadata = pageMeta("Book a call", descriptions.book, "/book", { noindex: true });

export default function BookPage() {
  return (
    <section className="grain section pt-10">
      <div className="wrap max-w-[880px]">
        <h1 className="h1">{copy.book.h1}</h1>
        <p className="mt-6 text-lg text-cream-50/90">{copy.book.intro}</p>
        <div className="mt-10">
          <BookForm />
        </div>
        <p className="mt-10 text-sm text-muted">{copy.book.oneOff}</p>
      </div>
    </section>
  );
}
