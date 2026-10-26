"use client";

import { useActionState, useEffect } from "react";
import { applyPartner } from "./actions";
import { copy } from "@/content/copy";
import type { FormState } from "@/lib/schemas";
import { track } from "@/lib/track";
import { ErrorSummary, TextField, TextArea, Honeypot, SubmitButton, Success } from "@/components/form/Fields";

const labels: Record<string, string> = { name: "Name", email: "Email", handle: "Instagram, TikTok or website", who: "Who would you send?" };

export default function PartnerForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(applyPartner, { status: "idle" });
  const v = state.values ?? {};

  useEffect(() => {
    if (state.status === "success") track("partner_apply");
  }, [state]);

  if (state.status === "success") {
    return (
      <Success>
        <p>{copy.partners.form.success}</p>
      </Success>
    );
  }

  return (
    <form action={action} noValidate className="relative space-y-8">
      <ErrorSummary state={state} labels={labels} />
      <Honeypot />
      <TextField name="name" label={labels.name} required errors={state.errors} defaultValue={v.name} autoComplete="name" />
      <TextField name="email" label={labels.email} type="email" required errors={state.errors} defaultValue={v.email} autoComplete="email" />
      <TextField name="handle" label={labels.handle} errors={state.errors} defaultValue={v.handle} inputMode="url" />
      <TextArea name="who" label={labels.who} required rows={4} errors={state.errors} defaultValue={v.who} hint="Creators you manage, a studio, your clients, your city. A sentence or two." />
      <SubmitButton pending={pending} label={copy.partners.form.submit} pendingLabel={copy.partners.form.sending} />
    </form>
  );
}
