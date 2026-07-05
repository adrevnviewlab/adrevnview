import type { CompanySettings, Invoice } from "@/lib/admin/types";
import { formatCurrency, invoiceSubtotal, invoiceTax, invoiceTotal, lineItemTotal } from "@/lib/admin/invoice";

type InvoiceDocumentProps = {
  invoice: Invoice;
  company: CompanySettings;
  className?: string;
};

export function InvoiceDocument({ invoice, company, className = "" }: InvoiceDocumentProps) {
  return (
    <div
      className={`bg-white text-slate-900 p-10 rounded-lg shadow-sm ${className}`}
      id="invoice-document"
    >
      <div className="flex justify-between items-start gap-8 mb-10">
        <div>
          <h1 className="text-2xl font-bold text-[#0F2D4A]">{company.name}</h1>
          <p className="text-sm text-slate-600 mt-2 whitespace-pre-line">
            {company.streetAddress}
            {"\n"}
            {company.city}, {company.state} {company.postalCode}
            {"\n"}
            {company.email}
            {"\n"}
            {company.phone}
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-[#2474BC]">INVOICE</p>
          <p className="text-sm text-slate-600 mt-2">#{invoice.number}</p>
          <p className="text-sm text-slate-600 capitalize mt-1">Status: {invoice.status}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Bill To</p>
          <p className="font-semibold text-slate-900">{invoice.clientName || "—"}</p>
          {invoice.clientEmail && <p className="text-sm text-slate-600">{invoice.clientEmail}</p>}
          {invoice.clientAddress && (
            <p className="text-sm text-slate-600 mt-1 whitespace-pre-line">{invoice.clientAddress}</p>
          )}
        </div>
        <div className="text-right">
          <div className="inline-block text-left space-y-1 text-sm">
            <p>
              <span className="text-slate-500 w-24 inline-block">Issue Date</span>
              <span className="font-medium">{invoice.issueDate}</span>
            </p>
            <p>
              <span className="text-slate-500 w-24 inline-block">Due Date</span>
              <span className="font-medium">{invoice.dueDate}</span>
            </p>
          </div>
        </div>
      </div>

      <table className="w-full text-sm mb-8">
        <thead>
          <tr className="border-b-2 border-slate-200 text-left">
            <th className="py-3 font-semibold text-slate-600">Description</th>
            <th className="py-3 font-semibold text-slate-600 text-right w-20">Qty</th>
            <th className="py-3 font-semibold text-slate-600 text-right w-28">Rate</th>
            <th className="py-3 font-semibold text-slate-600 text-right w-28">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item) => (
            <tr key={item.id} className="border-b border-slate-100">
              <td className="py-3 pr-4">{item.description || "—"}</td>
              <td className="py-3 text-right">{item.quantity}</td>
              <td className="py-3 text-right">{formatCurrency(item.rate)}</td>
              <td className="py-3 text-right font-medium">{formatCurrency(lineItemTotal(item))}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mb-8">
        <div className="w-64 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600">Subtotal</span>
            <span>{formatCurrency(invoiceSubtotal(invoice))}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Tax ({invoice.taxRate}%)</span>
            <span>{formatCurrency(invoiceTax(invoice))}</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t border-slate-200 pt-2 text-[#0F2D4A]">
            <span>Total</span>
            <span>{formatCurrency(invoiceTotal(invoice))}</span>
          </div>
        </div>
      </div>

      {(invoice.notes || company.paymentTerms) && (
        <div className="border-t border-slate-200 pt-6 text-sm text-slate-600 space-y-3">
          {invoice.notes && (
            <div>
              <p className="font-semibold text-slate-700 mb-1">Notes</p>
              <p className="whitespace-pre-line">{invoice.notes}</p>
            </div>
          )}
          {company.paymentTerms && (
            <div>
              <p className="font-semibold text-slate-700 mb-1">Payment Terms</p>
              <p>{company.paymentTerms}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function printInvoice() {
  const doc = document.getElementById("invoice-document");
  if (!doc) return;

  const win = window.open("", "_blank", "width=900,height=700");
  if (!win) return;

  win.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Invoice</title>
        <style>
          body { font-family: Inter, Arial, sans-serif; margin: 0; padding: 40px; color: #0f172a; }
          table { width: 100%; border-collapse: collapse; }
          th, td { padding: 10px 8px; text-align: left; }
          th:last-child, td:last-child, th:nth-child(2), td:nth-child(2), th:nth-child(3), td:nth-child(3) { text-align: right; }
          thead tr { border-bottom: 2px solid #e2e8f0; }
          tbody tr { border-bottom: 1px solid #f1f5f9; }
          .totals { margin-top: 24px; text-align: right; }
          .total-row { font-size: 18px; font-weight: bold; border-top: 2px solid #e2e8f0; padding-top: 8px; margin-top: 8px; }
        </style>
      </head>
      <body>${doc.innerHTML}</body>
    </html>
  `);
  win.document.close();
  win.focus();
  setTimeout(() => {
    win.print();
    win.close();
  }, 300);
}
