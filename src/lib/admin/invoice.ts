import { getCompanySettings, getInvoices } from "./storage";
import type { Invoice, InvoiceLineItem } from "./types";

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export function lineItemTotal(item: InvoiceLineItem) {
  return item.quantity * item.rate;
}

export function invoiceSubtotal(invoice: Pick<Invoice, "items">) {
  return invoice.items.reduce((sum, item) => sum + lineItemTotal(item), 0);
}

export function invoiceTax(invoice: Pick<Invoice, "items" | "taxRate">) {
  return invoiceSubtotal(invoice) * (invoice.taxRate / 100);
}

export function invoiceTotal(invoice: Pick<Invoice, "items" | "taxRate">) {
  return invoiceSubtotal(invoice) + invoiceTax(invoice);
}

export function nextInvoiceNumber(): string {
  const { invoicePrefix } = getCompanySettings();
  const year = new Date().getFullYear();
  const prefix = `${invoicePrefix}-${year}-`;
  const existing = getInvoices()
    .map((inv) => inv.number)
    .filter((n) => n.startsWith(prefix))
    .map((n) => parseInt(n.replace(prefix, ""), 10))
    .filter((n) => !Number.isNaN(n));
  const next = existing.length ? Math.max(...existing) + 1 : 1;
  return `${prefix}${String(next).padStart(3, "0")}`;
}

export function createEmptyLineItem(): InvoiceLineItem {
  return {
    id: crypto.randomUUID(),
    description: "",
    quantity: 1,
    rate: 0,
  };
}

export function createDraftInvoice(): Invoice {
  const now = new Date();
  const due = new Date(now);
  due.setDate(due.getDate() + 30);

  return {
    id: crypto.randomUUID(),
    number: nextInvoiceNumber(),
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    issueDate: now.toISOString().slice(0, 10),
    dueDate: due.toISOString().slice(0, 10),
    status: "draft",
    items: [createEmptyLineItem()],
    taxRate: getCompanySettings().defaultTaxRate,
    notes: "",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };
}
