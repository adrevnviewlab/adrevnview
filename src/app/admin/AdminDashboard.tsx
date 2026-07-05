import { Link } from "react-router";
import { Users, FileText, DollarSign, Clock, Plus } from "lucide-react";
import { CLIENTS } from "@/lib/content/clients";
import { getInvoices } from "@/lib/admin/storage";
import { formatCurrency, invoiceTotal } from "@/lib/admin/invoice";

export default function AdminDashboard() {
  const invoices = getInvoices();
  const paid = invoices.filter((i) => i.status === "paid");
  const outstanding = invoices.filter((i) => i.status === "sent" || i.status === "overdue");
  const drafts = invoices.filter((i) => i.status === "draft");

  const paidTotal = paid.reduce((s, i) => s + invoiceTotal(i), 0);
  const outstandingTotal = outstanding.reduce((s, i) => s + invoiceTotal(i), 0);

  const stats = [
    { label: "Clients", value: String(CLIENTS.length), icon: Users, href: "/admin/clients" },
    { label: "Invoices", value: String(invoices.length), icon: FileText, href: "/admin/invoices" },
    { label: "Paid Revenue", value: formatCurrency(paidTotal), icon: DollarSign, href: "/admin/invoices" },
    { label: "Outstanding", value: formatCurrency(outstandingTotal), icon: Clock, href: "/admin/invoices" },
  ];

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Manrope, sans-serif" }}>
            Dashboard
          </h1>
          <p className="text-slate-400 text-sm mt-1">Overview of clients, invoices, and revenue</p>
        </div>
        <Link
          to="/admin/invoices/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold hover:from-violet-500 hover:to-indigo-500 transition-all"
        >
          <Plus className="w-4 h-4" />
          New Invoice
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            to={href}
            className="rounded-xl border border-violet-900/20 bg-[#0d1128] p-5 hover:border-violet-600/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-400 text-sm">{label}</span>
              <Icon className="w-4 h-4 text-violet-400" />
            </div>
            <p className="text-2xl font-bold text-white" style={{ fontFamily: "Manrope, sans-serif" }}>
              {value}
            </p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="rounded-xl border border-violet-900/20 bg-[#0d1128] p-6">
          <h2 className="text-lg font-semibold text-white mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
            Recent Invoices
          </h2>
          {invoices.length === 0 ? (
            <p className="text-slate-500 text-sm">No invoices yet. Create your first invoice.</p>
          ) : (
            <ul className="space-y-3">
              {invoices.slice(0, 5).map((inv) => (
                <li key={inv.id}>
                  <Link
                    to={`/admin/invoices/${inv.id}`}
                    className="flex items-center justify-between py-2 border-b border-violet-900/10 last:border-0 hover:text-violet-300 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">{inv.number}</p>
                      <p className="text-xs text-slate-500">{inv.clientName || "No client"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">{formatCurrency(invoiceTotal(inv))}</p>
                      <p className="text-xs text-slate-500 capitalize">{inv.status}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-xl border border-violet-900/20 bg-[#0d1128] p-6">
          <h2 className="text-lg font-semibold text-white mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
            Quick Stats
          </h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-400">Draft invoices</dt>
              <dd className="text-white font-medium">{drafts.length}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Paid invoices</dt>
              <dd className="text-white font-medium">{paid.length}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Awaiting payment</dt>
              <dd className="text-white font-medium">{outstanding.length}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Portfolio clients</dt>
              <dd className="text-white font-medium">{CLIENTS.length}</dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}
