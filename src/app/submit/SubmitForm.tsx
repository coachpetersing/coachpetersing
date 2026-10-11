"use client";

import { useActionState, useEffect, useState } from "react";
import { submitWork } from "./actions";
import { copy } from "@/content/copy";
import type { FormState } from "@/lib/schemas";
import { track } from "@/lib/track";
import { ErrorSummary, TextField, TextArea, Radios, Honeypot, SubmitButton, Success } from "@/components/form/Fields";

const labels: Record<string, string> = {
  email: "Email",
  type: "Type",
  links: "Links",
  lookAt: "What to look at",
  goal: "Goal",
  product: "Product, topic or idea",
  cantDo: "Anything you can't do",
};

export default function SubmitForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(submitWork, { status: "idle" });
  const v = state.values ?? {};
  const [type, setType] = useState(v.type ?? "Review");

  useEffect(() => {
    if (state.status === "success") track("submit_work");
  }, [state]);

  if (state.status === "success") {
    return (
      <Success>
        <p>{copy.submit.success}</p>
        {state.flag === "over" && <p className="mt-3 font-semibold text-tan-400">{copy.submit.overLimit}</p>}
        <a href="/submit" className="link mt-4 inline-block text-base">
          Send another
        </a>
      </Success>
    );
  }

  const e = state.errors;
  return (
    <form action={action} noValidate className="relative space-y-8">
      <ErrorSummary state={state} labels={labels} />
      <Honeypot />
      <TextField name="email" label={labels.email} type="email" required errors={e} defaultValue={v.email} autoComplete="email" hint="The one you signed up with." />
      <Radios
        name="type"
        label="What are you sending?"
        required
        errors={e}
        value={type}
        onChange={setType}
        options={[
          { value: "Review", label: "Review" },
          { value: "Brief", label: "Brief" },
        ]}
      />

      {type === "Review" ? (
        <>
          <TextArea name="links" label="Link(s) to the video, profile, or file" required rows={3} errors={e} defaultValue={v.links} hint="One per line. Drive, Dropbox, or a public post all work." />
          <TextArea name="lookAt" label="What do you want me to look at?" required rows={4} errors={e} defaultValue={v.lookAt} />
        </>
      ) : (
        <>
          <TextArea name="goal" label="What's the goal?" required rows={3} errors={e} defaultValue={v.goal} />
          <TextArea name="product" label="Product, topic or idea, if you have one" rows={3} errors={e} defaultValue={v.product} />
          <TextArea name="cantDo" label="Anything you can't do?" rows={3} errors={e} defaultValue={v.cantDo} hint="For example: no kids on camera, only weekends." />
        </>
      )}

      <SubmitButton pending={pending} label="Send it" pendingLabel="Sending" />
    </form>
  );
}
