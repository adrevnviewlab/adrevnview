import { Suspense } from "react";
import { RouterProvider } from "react-router";
import { AuthProvider } from "@/lib/admin/auth";
import { router } from "./routes";

export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<div className="min-h-screen bg-[#06091a]" />}>
        <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>
  );
}
