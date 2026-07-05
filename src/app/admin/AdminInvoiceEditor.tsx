import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react";
import { CLIENTS } from "@/lib/content/clients";
import { getInvoice, upsertInvoice } from "@/lib/admin/storage";
import {
  createDraftInvoice,
  createEmptyLineItem,
  formatCurrency,
  invoiceSubtotal,
  invoiceTax,
  invoiceTotal,
  lineItemTotal,
} from "@/lib/admin/invoice";
import type { Invoice, InvoiceStatus } from "@/lib/admin/types";

export default function AdminInvoiceEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id || id === "new";

  const initial = useMemo(() => {
    if (isNew) return createDraftInvoice();
    return getInvoice(id!) ?? createDraftInvoice();
  }, [id, isNew]);

  const [invoice, setInvoice] = useState<Invoice>(initial);

  function update<K extends keyof Invoice>(key: K, value: Invoice[K]) {
    setInvoice((prev) => ({ ...prev, [key]: value, updatedAt: new Date().toISOString() }));
  }

  function updateItem(itemId: string, field: "description" | "quantity" | "rate", value: string | number) {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === itemId ? { ...item, [field]: value } : item)),
      updatedAt: new Date().toISOString(),
    }));
  }

  function addItem() {
    setInvoice((prev) => ({
      ...prev,
      items: [...prev.items, createEmptyLineItem()],
      updatedAt: new Date().toISOString(),
    }));
  }

  function removeItem(itemId: string) {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.length > 1 ? prev.items.filter((i) => i.id !== itemId) : prev.items,
      updatedAt: new Date().toISOString(),
    }));
  }

  function loadClient(slug: string) {
    const client = CLIENTS.find((c) => c.slug === slug);
    if (!client) return;
    update("clientName", client.name);
    update("clientAddress", client.url);
  }

  function handleSave() {
    upsertInvoice(invoice);
    navigate(`/admin/invoices/${invoice.id}`);
  }

  const statuses: InvoiceStatus[] = ["draft", "sent", "paid", "overdue"];

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/invoices" className="text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Manrope, sans-serif" }}>
            {isNew ? "New Invoice" : `Edit ${invoice.number}`}
          </h1>
        </div>
      </div>

      <div className="space-y-6">
        <section className="rounded-xl border border-violet-900/20 bg-[#0d1128] p-6 space-y-4">
          <h2 className="text-sm font-semibold text-slate-300">Invoice Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-500 mb-1">Invoice Number</label>
              <input
                value={invoice.number}
                onChange={(e) => update("number", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#06091a] border border-violet-900/30 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Status</label>
              <select
                value={invoice.status}
                onChange={(e) => update("status", e.target.value as InvoiceStatus)}
                className="w-full px-3 py-2 rounded-lg bg-[#06091a] border border-violet-900/30 text-white text-sm"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Issue Date</label>
              <input
                type="date"
                value={invoice.issueDate}
                onChange={(e) => update("issueDate", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#06091a] border border-violet-900/30 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Due Date</label>
              <input
                type="date"
                value={invoice.dueDate}
                onChange={(e) => update("dueDate", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#06091a] border border-violet-900/30 text-white text-sm"
              />
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-violet-900/20 bg-[#0d1128] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-300">Client</h2>
            <select
              onChange={(e) => loadClient(e.target.value)}
              defaultValue=""
              className="px-3 py-1.5 rounded-lg bg-[#06091a] border border-violet-900/30 text-slate-400 text-xs"
            >
              <option value="" disabled>
                Load from portfolio…
              </option>
              {CLIENTS.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-500 mb-1">Client Name</label>
              <input
                value={invoice.clientName}
                onChange={(e) => update("clientName", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#06091a] border border-violet-900/30 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Client Email</label>
              <input
                type="email"
                value={invoice.clientEmail}
                onChange={(e) => update("clientEmail", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#06091a] border border-violet-900/30 text-white text-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-slate-500 mb-1">Client Address</label>
              <textarea
                value={invoice.clientAddress}
                onChange={(e) => update("clientAddress", e.target.value)}
                rows={2}
                className="w-full px-3 py-2 rounded-lg bg-[#06091a] border border-violet-900/30 text-white text-sm resize-none"
              />
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-violet-900/20 bg-[#0d1128] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-300">Line Items</h2>
            <button
              type="button"
              onClick={addItem}
              className="inline-flex items-center gap-1.5 text-violet-400 hover:text-violet-300 text-xs font-medium"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Item
            </button>
          </div>

          <div className="space-y-3">
            {invoice.items.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-2 items-start">
                <div className="col-span-12 sm:col-span-5">
                  <input
                    value={item.description}
                    onChange={(e) => updateItem(item.id, "description", e.target.value)}
                    placeholder="Description"
                    className="w-full px-3 py-2 rounded-lg bg-[#06091a] border border-violet-900/30 text-white text-sm"
                  />
                </div>
                <div className="col-span-4 sm:col-span-2">
                  <input
                    type="number"
                    min={0}
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, "quantity", Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-[#06091a] border border-violet-900/30 text-white text-sm"
                  />
                </div>
                <div className="col-span-4 sm:col-span-2">
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    value={item.rate}
                    onChange={(e) => updateItem(item.id, "rate", Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-[#06091a] border border-violet-900/30 text-white text-sm"
                  />
                </div>
                <div className="col-span-3 sm:col-span-2 flex items-center py-2 text-sm text-slate-300">
                  {formatCurrency(lineItemTotal(item))}
                </div>
                <div className="col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-slate-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-violet-900/20 flex flex-col items-end gap-1 text-sm">
            <p className="text-slate-400">
              Subtotal: <span className="text-white">{formatCurrency(invoiceSubtotal(invoice))}</span>
            </p>
            <div className="flex items-center gap-2">
              <label className="text-slate-400">Tax %</label>
              <input
                type="number"
                min={0}
                step={0.1}
                value={invoice.taxRate}
                onChange={(e) => update("taxRate", Number(e.target.value))}
                className="w-20 px-2 py-1 rounded bg-[#06091a] border border-violet-900/30 text-white text-sm text-right"
              />
              <span className="text-slate-400">{formatCurrency(invoiceTax(invoice))}</span>
            </div>
            <p className="text-lg font-bold text-white">
              Total: {formatCurrency(invoiceTotal(invoice))}
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-violet-900/20 bg-[#0d1128] p-6">
          <label className="block text-xs text-slate-500 mb-1">Notes</label>
          <textarea
            value={invoice.notes}
            onChange={(e) => update("notes", e.target.value)}
            rows={3}
            className="w-full px-3 py-2 rounded-lg bg-[#06091a] border border-violet-900/30 text-white text-sm resize-none"
            placeholder="Additional notes for the client…"
          />
        </section>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold hover:from-violet-500 hover:to-indigo-500 transition-all"
          >
            <Save className="w-4 h-4" />
            Save Invoice
          </button>
          <Link
            to="/admin/invoices"
            className="px-6 py-2.5 rounded-lg border border-violet-500/30 text-slate-300 hover:bg-violet-900/20 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
