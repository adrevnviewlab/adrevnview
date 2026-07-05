import { useEffect } from "react";
import { Outlet, Navigate } from "react-router";
import { RequireAuth } from "@/lib/admin/auth";
import { AdminSidebar } from "./components/AdminSidebar";

export default function AdminLayout() {
  useEffect(() => {
    const meta = document.querySelector('meta[name="robots"]');
    const previous = meta?.getAttribute("content") ?? "";
    meta?.setAttribute("content", "noindex, nofollow");
    return () => {
      if (meta && previous) meta.setAttribute("content", previous);
    };
  }, []);

  return (
    <RequireAuth>
      <div className="min-h-screen bg-[#06091a] text-white flex" style={{ fontFamily: "Inter, sans-serif" }}>
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </RequireAuth>
  );
}

export function AdminIndexRedirect() {
  return <Navigate to="/admin/dashboard" replace />;
}
