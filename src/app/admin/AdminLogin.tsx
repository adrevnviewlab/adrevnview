import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { Lock } from "lucide-react";
import { Logo } from "@/components/Logo";
import { SpringPressable } from "@/components/SpringButton";
import { useAuth } from "@/lib/admin/auth";

export default function AdminLogin() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const from = (location.state as { from?: string } | null)?.from ?? "/admin/dashboard";

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (login(password)) {
      navigate(from, { replace: true });
    } else {
      setError("Invalid password. Try again.");
      setPassword("");
    }
  }

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center px-6"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo link={false} iconClassName="h-10 w-9" textClassName="h-6 w-auto" />
        </div>

        <div className="rounded-2xl border border-sky-900/30 bg-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-sky-600/20 flex items-center justify-center">
              <Lock className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground" style={{ fontFamily: "Manrope, sans-serif" }}>
                Admin Sign In
              </h1>
              <p className="text-muted-foreground text-sm">Enter your admin password to continue</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm text-muted-foreground mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-sky-900/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-sky-500/50"
                placeholder="Admin password"
                autoFocus
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <SpringPressable
              type="submit"
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-semibold hover:from-sky-500 hover:to-cyan-500 transition-all"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Sign In
            </SpringPressable>
          </form>
        </div>

        <p className="text-center text-muted-foreground text-xs mt-6">
          Set <code className="text-muted-foreground">VITE_ADMIN_PASSWORD</code> in your environment for production.
        </p>
      </div>
    </div>
  );
}
