"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { FieldErrors, FormState } from "@/lib/schemas";

/** Lists every error at the top and moves focus there, so screen reader and keyboard users hear it right away. */
export function ErrorSummary({ state, labels }: { state: FormState; labels: Record<string, string> }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (state.status === "error") ref.current?.focus();
  }, [state]);
  if (state.status !== "error") return null;
  const entries = Object.entries(state.errors ?? {});
  return (
    <div ref={ref} tabIndex={-1} role="alert" className="rounded-card border-2 border-[#F2A285] bg-forest-900 p-5 focus:outline-none">
      <p className="font-semibold">{state.message ?? "Please fix the fields below."}</p>
      {entries.length > 0 && (
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          {entries.map(([k, msg]) => (
            <li key={k}>
              <a href={`#f-${k}`} className="link" aria-label={labels[k] ? `${labels[k]}: ${msg}` : msg}>
                {msg}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

type Common = { name: string; label: string; required?: boolean; hint?: ReactNode; errors?: FieldErrors };

const describedBy = (name: string, hint?: ReactNode, error?: string) =>
  [hint ? `h-${name}` : "", error ? `e-${name}` : ""].filter(Boolean).join(" ") || undefined;

function Meta({ name, hint, error }: { name: string; hint?: ReactNode; error?: string }) {
  return (
    <>
      {hint && (
        <p id={`h-${name}`} className="hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={`e-${name}`} className="error">
          {error}
        </p>
      )}
    </>
  );
}

const Req = () => (
  <span className="text-tan-400" aria-hidden="true">
    {" "}
    *
  </span>
);

export function TextField({
  name,
  label,
  required,
  hint,
  errors,
  type = "text",
  defaultValue,
  autoComplete,
  readOnly,
  inputMode,
  maxLength,
  value,
  onChange,
}: Common & {
  value?: string;
  onChange?: (v: string) => void;
  type?: string;
  defaultValue?: string;
  autoComplete?: string;
  readOnly?: boolean;
  inputMode?: "url" | "email" | "text";
  maxLength?: number;
}) {
  const error = errors?.[name];
  return (
    <div>
      <label htmlFor={`f-${name}`} className="label">
        {label}
        {required && <Req />}
      </label>
      <input
        id={`f-${name}`}
        name={name}
        type={type}
        required={required}
        {...(onChange ? { value, onChange: (e) => onChange(e.target.value) } : { defaultValue })}
        autoComplete={autoComplete}
        readOnly={readOnly}
        inputMode={inputMode}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(name, hint, error)}
        className="field"
      />
      <Meta name={name} hint={hint} error={error} />
    </div>
  );
}

export function TextArea({
  name,
  label,
  required,
  hint,
  errors,
  defaultValue,
  rows = 4,
  maxLength,
  value,
  onChange,
}: Common & { defaultValue?: string; rows?: number; maxLength?: number; value?: string; onChange?: (v: string) => void }) {
  const error = errors?.[name];
  return (
    <div>
      <label htmlFor={`f-${name}`} className="label">
        {label}
        {required && <Req />}
      </label>
      <textarea
        id={`f-${name}`}
        name={name}
        required={required}
        rows={rows}
        maxLength={maxLength}
        {...(onChange ? { value, onChange: (e) => onChange(e.target.value) } : { defaultValue })}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(name, hint, error)}
        className="field resize-y"
      />
      <Meta name={name} hint={hint} error={error} />
    </div>
  );
}

export function Select({
  name,
  label,
  required,
  hint,
  errors,
  options,
  defaultValue,
  value,
  onChange,
  placeholder = "Choose one",
}: Common & {
  options: readonly string[];
  defaultValue?: string;
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
}) {
  const error = errors?.[name];
  return (
    <div>
      <label htmlFor={`f-${name}`} className="label">
        {label}
        {required && <Req />}
      </label>
      <select
        id={`f-${name}`}
        name={name}
        required={required}
        {...(onChange ? { value, onChange: (e) => onChange(e.target.value) } : { defaultValue: defaultValue ?? "" })}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(name, hint, error)}
        className="field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2214%22 height=%228%22><path d=%22M1 1l6 6 6-6%22 fill=%22none%22 stroke=%22%23C8A97E%22 stroke-width=%222%22/></svg>')] bg-[length:14px_8px] bg-[right_16px_center] bg-no-repeat pr-10"
      >
        <option value="" disabled={required}>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <Meta name={name} hint={hint} error={error} />
    </div>
  );
}

export function Radios({
  name,
  label,
  required,
  hint,
  errors,
  options,
  defaultValue,
  value,
  onChange,
}: Common & {
  options: readonly { value: string; label: string }[];
  defaultValue?: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  const error = errors?.[name];
  return (
    <fieldset id={`f-${name}`} aria-describedby={describedBy(name, hint, error)} aria-invalid={Boolean(error) || undefined}>
      <legend className="label">
        {label}
        {required && <Req />}
      </legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <label
            key={o.value}
            className="relative inline-flex min-h-[44px] cursor-pointer items-center rounded-full border border-forest-800 bg-forest-900 px-4 text-base transition-colors duration-150 hover:border-tan-400 has-[:checked]:border-tan-400 has-[:checked]:bg-tan-400 has-[:checked]:text-ink has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-tan-400 has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-forest-950"
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              required={required}
              className="sr-only"
              {...(onChange ? { checked: value === o.value, onChange: () => onChange(o.value) } : { defaultChecked: defaultValue === o.value })}
            />
            {o.label}
          </label>
        ))}
      </div>
      <Meta name={name} hint={hint} error={error} />
    </fieldset>
  );
}

/** Hidden from people and screen readers; bots fill it in. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Leave this empty
        <input type="text" name="company_website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}

export function SubmitButton({ pending, label, pendingLabel }: { pending: boolean; label: string; pendingLabel: string }) {
  return (
    <button type="submit" disabled={pending} aria-disabled={pending} className="btn-primary w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto">
      {pending && <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />}
      {pending ? pendingLabel : label}
    </button>
  );
}

export function Success({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.focus(), []);
  return (
    <div ref={ref} tabIndex={-1} role="status" className="card animate-rise flex items-start gap-4 p-6 focus:outline-none sm:p-8">
      <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tan-400 text-ink">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M4 10.5l4 4 8-9" />
        </svg>
      </span>
      <div className="text-lg">{children}</div>
    </div>
  );
}
