import { Suspense, useEffect } from "react";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PerformanceProvider } from "@/lib/performance";
import { MusicProvider } from "@/lib/audio";
import { AuthProvider } from "@/lib/admin/auth";
import { trackPageView } from "@/lib/analytics";
import { router } from "./routes";

router.subscribe((state) => {
  trackPageView(state.location.pathname + state.location.search);
});

export default function App() {
  useEffect(() => {
    trackPageView(window.location.pathname + window.location.search);
  }, []);

  return (
    <ThemeProvider>
      <PerformanceProvider>
        <MusicProvider>
          <AuthProvider>
            <Suspense fallback={<div className="min-h-screen bg-background" />}>
              <RouterProvider router={router} />
            </Suspense>
          </AuthProvider>
        </MusicProvider>
      </PerformanceProvider>
    </ThemeProvider>
  );
}
