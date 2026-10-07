import type { Metadata } from "next";
import { copy } from "@/content/copy";
import { pageMeta, descriptions } from "@/lib/seo";
import { bookingHref } from "@/lib/links";
import Section, { Eyebrow } from "@/components/Section";
import Button from "@/components/Button";
import EmailCopy from "@/components/EmailCopy";
import ContactForm from "@/components/ContactForm";
import ConsultNote from "@/components/ConsultNote";
import { site } from "@/content/site";

export const metadata: Metadata = pageMeta(copy.contact.title, descriptions.contact, "/contact");

// Inlined at build time. Unset means no form: the page shows only the email and Book a session.
const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID?.trim() || "";

export default function ContactPage() {
  const c = copy.contact;
  return (
    <>
      <Section>
        <Eyebrow tone="forest">{c.title}</Eyebrow>
        <h1 className="font-display text-6xl font-extrabold tracking-tight text-ink md:text-8xl lg:text-9xl">{c.heading}</h1>
        <p className="mt-6 max-w-2xl font-body text-lg text-offblack md:text-xl">{c.body}</p>

        <div className="mt-12">
          <EmailCopy />
        </div>
        <div className="mt-8">
          <Button href={bookingHref()} variant="ink" size="lg">
            {c.bookCall}
          </Button>
          <ConsultNote className="mt-4" />
        </div>
      </Section>

      {formId && (
        <Section tone="sand" tight>
          <div className="grid gap-12 py-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink md:text-4xl">{c.formHeading}</h2>
              <div className="mt-8">
                <ContactForm formId={formId} />
              </div>
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink md:text-4xl">{c.handlesHeading}</h2>
              <a
                href={site.dmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block font-body text-lg font-medium text-forest underline underline-offset-4 hover:text-ink"
              >
                {c.dmLink}
              </a>
            </div>
          </div>
        </Section>
      )}
    </>
  );
}
