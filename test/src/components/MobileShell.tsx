import type { ReactNode } from "react";

export function MobileShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex justify-center" style={{ background: "#C8DFF0" }}>
      <div className="relative w-full max-w-[390px] min-h-screen" style={{ background: "#C8DFF0" }}>
        {children}
      </div>
    </div>
  );
}
