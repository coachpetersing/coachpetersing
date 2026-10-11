"use client";

import { useActionState, useState } from "react";
import { submitIntake } from "./actions";
import { followerRanges, memberTypes, regions, type RosterEntry } from "@/content/roster";
import { copy } from "@/content/copy";
import { NICHE_MAX, type FormState } from "@/lib/schemas";
import { ErrorSummary, TextField, TextArea, Select, Radios, Honeypot, SubmitButton, Success } from "@/components/form/Fields";
import JerseyCard from "@/components/JerseyCard";

const labels: Record<string, string> = {
  name: "Name",
  email: "Email",
  handles: "Your handles",
  goal: "Goal",
  videos: "Last 3 videos",
  notes: "Anything else",
  listing: "Roster listing",
  type: "Type",
  niche: "Niche",
  range: "Follower range",
  region: "Region",
};

export default function IntakeForm({ name, email, plan }: { name: string; email: string; plan: "notes" | "coaching" }) {
  const [state, action, pending] = useActionState<FormState, FormData>(submitIntake, { status: "idle" });
  const v = state.values ?? {};
  const [listing, setListing] = useState(v.listing ?? "");
  const [card, setCard] = useState({ type: v.type ?? "", niche: v.niche ?? "", range: v.range ?? "", region: v.region ?? "" });
  const set = (k: keyof typeof card) => (val: string) => setCard((c) => ({ ...c, [k]: val }));

  if (state.status === "success") return <Success>{copy.welcome.intakeSuccess}</Success>;

  const e = state.errors;
  const preview: RosterEntry = {
    number: 7,
    type: card.type || "Your type",
    niche: card.niche,
    range: (card.range || "Follower range") as RosterEntry["range"],
    region: card.region as RosterEntry["region"],
    plan,
  };

  return (
    <form action={action} noValidate className="relative space-y-8">
      <ErrorSummary state={state} labels={labels} />
      <Honeypot />
      <input type="hidden" name="plan" value={plan} />

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField name="name" label={labels.name} required errors={e} defaultValue={v.name ?? name} autoComplete="name" />
        <TextField name="email" label={labels.email} type="email" required errors={e} defaultValue={v.email ?? email} autoComplete="email" />
      </div>
      <TextArea name="handles" label="All your handles" required rows={3} errors={e} defaultValue={v.handles} hint="Every platform you post on, plus your website if you have one." />
      <TextArea name="goal" label="Your goal for the next 3 months" required rows={3} errors={e} defaultValue={v.goal} />
      <TextArea name="videos" label="Links to your last 3 videos" required rows={3} errors={e} defaultValue={v.videos} hint="One per line." />
      <TextArea name="notes" label="Anything I should know" rows={3} errors={e} defaultValue={v.notes} hint="Optional" />

      <Radios
        name="listing"
        label="Roster listing"
        required
        errors={e}
        value={listing}
        onChange={setListing}
        options={[
          { value: "listed", label: "List me anonymously" },
          { value: "private", label: "Keep me private" },
        ]}
      />

      {listing === "listed" && (
        <div className="grid gap-8 rounded-card border border-forest-800 p-5 sm:p-6 md:grid-cols-[1fr_200px]">
          <div className="space-y-6">
            <Select name="type" label="Type" required errors={e} options={memberTypes} value={card.type} onChange={set("type")} />
            <TextField
              name="niche"
              label="Niche"
              errors={e}
              value={card.niche}
              onChange={set("niche")}
              maxLength={NICHE_MAX}
              hint={`A few words, like "parenting comedy". ${NICHE_MAX} characters max. No names, handles or numbers.`}
            />
            <Select name="range" label="Follower range" required errors={e} options={followerRanges} value={card.range} onChange={set("range")} />
            <Select name="region" label="Region" errors={e} options={regions} value={card.region} onChange={set("region")} placeholder="Leave off" />
            <p className="text-sm text-muted">{copy.welcome.listingNote}</p>
          </div>
          <div>
            <p className="label mb-3" aria-hidden="true">
              Preview
            </p>
            <div aria-hidden="true" className="max-w-[200px]">
              <JerseyCard slot={{ kind: "listed", number: preview.number, entry: preview }} />
            </div>
          </div>
        </div>
      )}

      <SubmitButton pending={pending} label="Send my intake" pendingLabel="Sending" />
    </form>
  );
}

