import crypto from "node:crypto";
import { env } from "./env";

/**
 * Google Sheet "Coaching Sales", written with a service account (no SDK).
 * Column order for each tab is defined here; `npm run sheet:setup` writes these headers.
 * Share the sheet with the service account's client_email as an Editor.
 */
export const TABS = {
  Sales: ["Timestamp", "Kind", "Product", "Amount", "Email", "Name", "Partner code", "Partner name", "Month #", "Payout", "Flags", "Stripe ID", "Customer ID", "Subscription ID"],
  Partners: ["Timestamp", "Status", "Name", "Email", "Handle", "Who they'd send", "Code"],
  Events: ["Timestamp", "Stripe event ID", "Type"],
} as const;

export type Tab = keyof typeof TABS;

type ServiceAccount = { client_email: string; private_key: string };
let token: { value: string; exp: number } | null = null;

function account(): ServiceAccount {
  const raw = env.googleServiceAccount();
  if (!raw) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON is not set");
  // Accept the raw JSON or a base64 copy of it (easier to paste into Vercel).
  const json = raw.trim().startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8");
  return JSON.parse(json);
}

async function accessToken() {
  if (token && token.exp > Date.now() + 60_000) return token.value;
  const sa = account();
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const unsigned = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  })}`;
  const sig = crypto.createSign("RSA-SHA256").update(unsigned).sign(sa.private_key, "base64url");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${sig}` }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Google token ${res.status}: ${await res.text()}`);
  const data = (await res.json()) as { access_token: string; expires_in: number };
  token = { value: data.access_token, exp: Date.now() + data.expires_in * 1000 };
  return token.value;
}

async function api(path: string, init: RequestInit = {}) {
  const id = env.googleSheetId();
  if (!id) throw new Error("GOOGLE_SHEET_ID is not set");
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${id}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${await accessToken()}`, "Content-Type": "application/json", ...init.headers },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Sheets ${res.status}: ${await res.text()}`);
  return res.json();
}

export type Row = Record<string, string>;

/** Appends one row. Keys are column headers from TABS; anything missing is left blank. */
export async function appendRow(tab: Tab, row: Row) {
  const values = [TABS[tab].map((h) => row[h] ?? "")];
  await api(`/values/${encodeURIComponent(`${tab}!A1`)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`, {
    method: "POST",
    body: JSON.stringify({ values }),
  });
}

/** Every data row in a tab, as objects keyed by header, with its 1-based sheet row number. */
export async function readRows(tab: Tab): Promise<(Row & { _row: string })[]> {
  const data = (await api(`/values/${encodeURIComponent(`${tab}!A1:Z`)}`)) as { values?: string[][] };
  const [header = [], ...rows] = data.values ?? [];
  return rows.map((r, i) => {
    const o: Row & { _row: string } = { _row: String(i + 2) };
    header.forEach((h, j) => (o[h] = r[j] ?? ""));
    return o;
  });
}

/** Sets one cell by header name on a given sheet row. */
export async function setCell(tab: Tab, row: number | string, header: string, value: string) {
  const col = TABS[tab].indexOf(header as never);
  if (col < 0) throw new Error(`No column "${header}" in ${tab}`);
  const a1 = `${tab}!${String.fromCharCode(65 + col)}${row}`;
  await api(`/values/${encodeURIComponent(a1)}?valueInputOption=RAW`, {
    method: "PUT",
    body: JSON.stringify({ values: [[value]] }),
  });
}

/** Creates any missing tabs and writes the header row on each. Safe to run more than once. */
export async function setupSheet() {
  const meta = (await api("?fields=sheets.properties.title")) as { sheets: { properties: { title: string } }[] };
  const existing = new Set(meta.sheets.map((s) => s.properties.title));
  const missing = (Object.keys(TABS) as Tab[]).filter((t) => !existing.has(t));
  if (missing.length) {
    await api(":batchUpdate", {
      method: "POST",
      body: JSON.stringify({ requests: missing.map((title) => ({ addSheet: { properties: { title } } })) }),
    });
  }
  for (const tab of Object.keys(TABS) as Tab[]) {
    await api(`/values/${encodeURIComponent(`${tab}!A1`)}?valueInputOption=RAW`, {
      method: "PUT",
      body: JSON.stringify({ values: [TABS[tab]] }),
    });
  }
  return missing;
}

export const nowStamp = () => new Date().toISOString();
