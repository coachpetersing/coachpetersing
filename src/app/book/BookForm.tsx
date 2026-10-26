"use client";

import { useActionState, useEffect } from "react";
import { lookupMember } from "./actions";
import { copy, fill } from "@/content/copy";
import type { FormState } from "@/lib/schemas";
import { track } from "@/lib/track";
import { ErrorSummary, TextField, Honeypot, SubmitButton } from "@/components/form/Fields";
import CalEmbed from "@/components/CalEmbed";

export default function BookForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(lookupMember, { status: "idle" });
  const v = state.values ?? {};

  useEffect(() => {
    if (state.status === "success") track("book_lookup");
  }, [state]);

  if (state.status === "success" && state.data) {
    return (
      <div>
        <p className="mb-6 text-cream-50/90">{fill(copy.book.note, { calls: state.data.calls })}</p>
        <CalEmbed url={String(state.data.url)} title="Book a call" email={String(state.data.email)} name={String(state.data.name)} />
      </div>
    );
  }

  return (
    <form action={action} noValidate className="relative space-y-8">
      <ErrorSummary state={state} labels={{ email: "Email" }} />
      <Honeypot />
      <TextField name="email" label="Email" type="email" required errors={state.errors} defaultValue={v.email} autoComplete="email" />
      <SubmitButton pending={pending} label={copy.book.button} pendingLabel={copy.book.checking} />
    </form>
  );
}
