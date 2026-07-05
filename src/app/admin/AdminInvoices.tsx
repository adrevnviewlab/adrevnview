import { Link } from "react-router";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { deleteInvoice, getInvoices } from "@/lib/admin/storage";
import { formatCurrency, invoiceTotal } from "@/lib/admin/invoice";
import { useState } from "react";

const STATUS_STYLES: Record<string, string> = {
  draft: "bg-slate-700/50 text-slate-300",
  sent: "bg-blue-900/40 text-blue-300",
  paid: "bg-emerald-900/40 text-emerald-300",
  overdue: "bg-red-900/40 text-red-300",
};

export default function AdminInvoices() {
  const [invoices, setInvoices] = useState(getInvoices);

  function refresh() {
    setInvoices(getInvoices());
  }

  function handleDelete(id: string, number: string) {
    if (!confirm(`Delete invoice ${number}?`)) return;
    deleteInvoice(id);
    refresh();
  }

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Manrope, sans-serif" }}>
            Invoices
          </h1>
          <p className="text-slate-400 text-sm mt-1">Create, manage, and export client invoices</p>
        </div>
        <Link
          to="/admin/invoices/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold hover:from-violet-500 hover:to-indigo-500 transition-all"
        >
          <Plus className="w-4 h-4" />
          New Invoice
        </Link>
      </div>

      <div className="rounded-xl border border-violet-900/20 bg-[#0d1128] overflow-hidden">
        {invoices.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-400 mb-4">No invoices yet</p>
            <Link
              to="/admin/invoices/new"
              className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Create your first invoice
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-violet-900/20 text-left text-slate-500">
                  <th className="px-5 py-3 font-medium">Invoice</th>
                  <th className="px-5 py-3 font-medium">Client</th>
                  <th className="px-5 py-3 font-medium">Issue Date</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium text-right">Amount</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id} className="border-b border-violet-900/10 hover:bg-slate-800/20">
                    <td className="px-5 py-3 font-medium text-white">{inv.number}</td>
                    <td className="px-5 py-3 text-slate-300">{inv.clientName || "—"}</td>
                    <td className="px-5 py-3 text-slate-400">{inv.issueDate}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs capitalize ${STATUS_STYLES[inv.status]}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right text-white font-medium">
                      {formatCurrency(invoiceTotal(inv))}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/admin/invoices/${inv.id}`}
                          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/invoices/${inv.id}/edit`}
                          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(inv.id, inv.number)}
                          className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/30"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
