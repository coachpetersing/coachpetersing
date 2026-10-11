"use client";

import { useActionState, useEffect, useState } from "react";
import { submitTryout } from "./actions";
import { followerRanges } from "@/content/roster";
import { copy } from "@/content/copy";
import { HELP_MAX, type FormState } from "@/lib/schemas";
import { track } from "@/lib/track";
import { ErrorSummary, TextField, TextArea, Select, Radios, Honeypot, SubmitButton, Success } from "@/components/form/Fields";
import Turnstile from "@/components/form/Turnstile";

const labels: Record<string, string> = {
  name: "Name",
  email: "Email",
  role: "What you do",
  handle: "Main handle or website",
  platform: "Main platform",
  range: "Follower range",
  video: "Video link",
  help: "What you want help with",
  plan: "Which plan",
  source: "How you found me",
  consent: "Email consent",
};

const opts = (xs: readonly string[]) => xs.map((x) => ({ value: x, label: x }));

export default function TryoutForm({ plan, siteKey }: { plan: string; siteKey: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(submitTryout, { status: "idle" });
  const v = state.values ?? {};
  const [help, setHelp] = useState("");

  useEffect(() => {
    if (state.status === "success") track("tryout_submit");
    if (state.status === "error" && state.values?.help !== undefined) setHelp(state.values.help);
  }, [state]);

  if (state.status === "success") return <Success>{copy.tryouts.success}</Success>;

  const e = state.errors;
  return (
    <form action={action} noValidate className="relative space-y-8">
      <ErrorSummary state={state} labels={labels} />
      <Honeypot />

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField name="name" label={labels.name} required errors={e} defaultValue={v.name} autoComplete="name" />
        <TextField name="email" label={labels.email} type="email" required errors={e} defaultValue={v.email} autoComplete="email" inputMode="email" />
      </div>

      <Radios name="role" label={labels.role} required errors={e} defaultValue={v.role} options={opts(["Creator", "Actor", "Business owner", "Other"])} />

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField name="handle" label={labels.handle} required errors={e} defaultValue={v.handle} hint="Like @yourname or yourbusiness.com" />
        <Select name="platform" label={labels.platform} required errors={e} defaultValue={v.platform} options={["TikTok", "Instagram", "YouTube", "Other"]} />
      </div>

      <Select name="range" label={labels.range} required errors={e} defaultValue={v.range} options={followerRanges} />

      <TextField
        name="video"
        label="One video link you want me to see"
        type="url"
        inputMode="url"
        required
        errors={e}
        defaultValue={v.video}
        hint="Any public link: TikTok, Instagram, YouTube, or a Drive or Dropbox file."
      />

      <TextArea
        name="help"
        label="What do you want help with?"
        required
        errors={e}
        rows={5}
        maxLength={HELP_MAX}
        value={help}
        onChange={setHelp}
        hint={
          <>
            {help.length} of {HELP_MAX} characters
            {/* Only announce when getting close, so screen readers aren't read every keystroke. */}
            <span className="sr-only" aria-live="polite">
              {HELP_MAX - help.length <= 50 ? `${HELP_MAX - help.length} characters left` : ""}
            </span>
          </>
        }
      />

      <Radios name="plan" label="Which plan?" required errors={e} defaultValue={v.plan ?? plan} options={opts(["Notes", "Coaching", "Not sure"])} />

      <TextField name="source" label="How did you find me?" errors={e} defaultValue={v.source} hint="Optional" />

      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            id="f-consent"
            type="checkbox"
            name="consent"
            value="yes"
            required
            defaultChecked={v.consent === "yes"}
            aria-invalid={Boolean(e?.consent)}
            aria-describedby={e?.consent ? "e-consent" : undefined}
            className="mt-1 h-5 w-5 shrink-0 accent-tan-400"
          />
          <span>
            {copy.tryouts.consent}
            <span className="text-tan-400" aria-hidden="true">
              {" "}
              *
            </span>
          </span>
        </label>
        {e?.consent && (
          <p id="e-consent" className="error">
            {e.consent}
          </p>
        )}
      </div>

      <Turnstile siteKey={siteKey} />

      <SubmitButton pending={pending} label={copy.tryouts.submit} pendingLabel={copy.tryouts.sending} />
    </form>
  );
}
