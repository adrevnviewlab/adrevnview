import type { ReactNode } from "react";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";

type SiteLayoutProps = {
  children: ReactNode;
  showFooter?: boolean;
  mainClassName?: string;
};

export function SiteLayout({ children, showFooter = true, mainClassName = "" }: SiteLayoutProps) {
  return (
    <div className="min-h-screen bg-[#06091a] text-white" style={{ fontFamily: "Inter, sans-serif" }}>
      <SiteHeader />
      <main className={`pt-28 ${mainClassName}`.trim()}>{children}</main>
      {showFooter ? <SiteFooter /> : null}
    </div>
  );
}
