import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/services")({
  component: () => (
    <MobileShell>
      <div className="px-4 pt-6 pb-32">
        <h1 className="text-2xl font-bold text-[#1A202C] mb-4">Услуги</h1>
        <div className="bg-white rounded-2xl p-6 text-center text-gray-500">Каталог государственных услуг</div>
      </div>
      <BottomNav />
    </MobileShell>
  ),
});
