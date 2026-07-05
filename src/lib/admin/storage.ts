import { ORG } from "@/lib/seo/siteConfig";
import type { ClientNote, CompanySettings, Invoice } from "./types";

const KEYS = {
  invoices: "adrevnview_admin_invoices",
  settings: "adrevnview_admin_settings",
  clientNotes: "adrevnview_admin_client_notes",
} as const;

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function defaultCompanySettings(): CompanySettings {
  return {
    name: ORG.name,
    email: ORG.email,
    phone: ORG.phone,
    streetAddress: ORG.address.streetAddress,
    city: ORG.address.addressLocality,
    state: ORG.address.addressRegion,
    postalCode: ORG.address.postalCode,
    country: ORG.address.addressCountry,
    taxId: "",
    invoicePrefix: "INV",
    defaultTaxRate: 0,
    paymentTerms: "Net 30 — payment due within 30 days of invoice date.",
  };
}

export function getCompanySettings(): CompanySettings {
  return read(KEYS.settings, defaultCompanySettings());
}

export function saveCompanySettings(settings: CompanySettings) {
  write(KEYS.settings, settings);
}

export function getInvoices(): Invoice[] {
  return read<Invoice[]>(KEYS.invoices, []);
}

export function saveInvoices(invoices: Invoice[]) {
  write(KEYS.invoices, invoices);
}

export function getInvoice(id: string): Invoice | undefined {
  return getInvoices().find((inv) => inv.id === id);
}

export function upsertInvoice(invoice: Invoice) {
  const invoices = getInvoices();
  const index = invoices.findIndex((inv) => inv.id === invoice.id);
  if (index >= 0) invoices[index] = invoice;
  else invoices.unshift(invoice);
  saveInvoices(invoices);
}

export function deleteInvoice(id: string) {
  saveInvoices(getInvoices().filter((inv) => inv.id !== id));
}

export function getClientNotes(): ClientNote[] {
  return read<ClientNote[]>(KEYS.clientNotes, []);
}

export function getClientNote(slug: string): ClientNote | undefined {
  return getClientNotes().find((n) => n.clientSlug === slug);
}

export function saveClientNote(note: ClientNote) {
  const notes = getClientNotes().filter((n) => n.clientSlug !== note.clientSlug);
  notes.push(note);
  write(KEYS.clientNotes, notes);
}
