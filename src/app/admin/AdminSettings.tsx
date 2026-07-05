import { useState } from "react";
import { Save } from "lucide-react";
import { defaultCompanySettings, getCompanySettings, saveCompanySettings } from "@/lib/admin/storage";
import type { CompanySettings } from "@/lib/admin/types";

export default function AdminSettings() {
  const [settings, setSettings] = useState<CompanySettings>(getCompanySettings);
  const [saved, setSaved] = useState(false);

  function update<K extends keyof CompanySettings>(key: K, value: CompanySettings[K]) {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function handleSave() {
    saveCompanySettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleReset() {
    if (!confirm("Reset to default company settings?")) return;
    const defaults = defaultCompanySettings();
    setSettings(defaults);
    saveCompanySettings(defaults);
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Manrope, sans-serif" }}>
          Settings
        </h1>
        <p className="text-slate-400 text-sm mt-1">Company details used on invoices and billing</p>
      </div>

      <div className="rounded-xl border border-violet-900/20 bg-[#0d1128] p-6 space-y-6">
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-300">Company Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs text-slate-500 mb-1">Company Name</label>
              <input
                value={settings.name}
                onChange={(e) => update("name", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#06091a] border border-violet-900/30 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Email</label>
              <input
                value={settings.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#06091a] border border-violet-900/30 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Phone</label>
              <input
                value={settings.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#06091a] border border-violet-900/30 text-white text-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-slate-500 mb-1">Street Address</label>
              <input
                value={settings.streetAddress}
                onChange={(e) => update("streetAddress", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#06091a] border border-violet-900/30 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">City</label>
              <input
                value={settings.city}
                onChange={(e) => update("city", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#06091a] border border-violet-900/30 text-white text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1">State</label>
                <input
                  value={settings.state}
                  onChange={(e) => update("state", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#06091a] border border-violet-900/30 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">ZIP</label>
                <input
                  value={settings.postalCode}
                  onChange={(e) => update("postalCode", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#06091a] border border-violet-900/30 text-white text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Tax ID / EIN</label>
              <input
                value={settings.taxId}
                onChange={(e) => update("taxId", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#06091a] border border-violet-900/30 text-white text-sm"
                placeholder="Optional"
              />
            </div>
          </div>
        </section>

        <section className="space-y-4 pt-4 border-t border-violet-900/20">
          <h2 className="text-sm font-semibold text-slate-300">Invoice Defaults</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-500 mb-1">Invoice Prefix</label>
              <input
                value={settings.invoicePrefix}
                onChange={(e) => update("invoicePrefix", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#06091a] border border-violet-900/30 text-white text-sm"
                placeholder="INV"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Default Tax Rate (%)</label>
              <input
                type="number"
                min={0}
                step={0.1}
                value={settings.defaultTaxRate}
                onChange={(e) => update("defaultTaxRate", Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-[#06091a] border border-violet-900/30 text-white text-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-slate-500 mb-1">Payment Terms</label>
              <textarea
                value={settings.paymentTerms}
                onChange={(e) => update("paymentTerms", e.target.value)}
                rows={2}
                className="w-full px-3 py-2 rounded-lg bg-[#06091a] border border-violet-900/30 text-white text-sm resize-none"
              />
            </div>
          </div>
        </section>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-violet-600 text-white text-sm font-semibold hover:bg-violet-500 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Settings
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-2.5 rounded-lg border border-violet-500/30 text-slate-400 text-sm hover:bg-violet-900/20 transition-colors"
          >
            Reset Defaults
          </button>
          {saved && <span className="text-emerald-400 text-sm">Saved!</span>}
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-violet-900/20 bg-[#0d1128] p-6">
        <h2 className="text-sm font-semibold text-slate-300 mb-2">Admin Access</h2>
        <p className="text-slate-400 text-sm">
          Default password: <code className="text-slate-500">adrevnview2026</code>. Override with the{" "}
          <code className="text-slate-500">VITE_ADMIN_PASSWORD</code> environment variable in production.
        </p>
      </div>
    </div>
  );
}
