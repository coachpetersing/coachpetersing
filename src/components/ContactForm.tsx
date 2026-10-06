import { site } from "@/content/site";
import { copy } from "@/content/copy";
import { isSet } from "@/content/offers";

const field =
  "w-full rounded-2xl border border-ink/20 bg-white px-5 py-4 font-body text-base text-offblack outline-none focus:border-forest";

export default function ContactForm() {
  const c = copy.contact;
  if (!isSet(site.formspreeId)) {
    return <p className="font-body text-lg text-offblack/70">{c.noForm}</p>;
  }
  return (
    <form action={`https://formspree.io/f/${site.formspreeId}`} method="POST" className="grid gap-5">
      <input type="hidden" name="_next" value={`${site.url}/thanks`} />
      <input type="hidden" name="_subject" value="New note from coachpetersing.com" />
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 font-body text-base font-medium text-ink">
          {c.fields.name}
          <input className={field} type="text" name="name" required autoComplete="name" />
        </label>
        <label className="grid gap-2 font-body text-base font-medium text-ink">
          {c.fields.email}
          <input className={field} type="email" name="email" required autoComplete="email" />
        </label>
      </div>

      <label className="grid gap-2 font-body text-base font-medium text-ink">
        {c.fields.role}
        <select className={field} name="role" defaultValue="" required>
          <option value="" disabled>
            Pick one
          </option>
          {c.roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2 font-body text-base font-medium text-ink">
        {c.fields.message}
        <textarea className={field} name="message" rows={6} required />
      </label>

      <button
        type="submit"
        className="justify-self-start rounded-full bg-ink px-8 py-4 font-body text-lg font-medium text-white transition-colors hover:bg-forest"
      >
        {c.fields.submit}
      </button>
    </form>
  );
}
