import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { BottomNav } from "@/components/BottomNav";
import { useCardData, displayName } from "@/lib/cardData";
import { Pencil, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const [data] = useCardData();
  return (
    <MobileShell>
      <div className="px-4 pt-6 pb-32">
        <h1 className="text-2xl font-bold text-[#1A202C] mb-4">Профиль</h1>
        <div className="bg-white rounded-2xl p-4 flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
            {data.photo ? <img src={data.photo} className="w-full h-full object-cover" /> : <span className="text-xs text-gray-400">фото</span>}
          </div>
          <div className="flex-1">
            <div className="font-bold">{displayName(data)}</div>
            <div className="text-xs text-gray-500">{data.documentNumber}</div>
          </div>
        </div>
        <Link to="/edit" className="bg-white rounded-2xl p-4 flex items-center gap-3">
          <Pencil className="w-5 h-5 text-[#2B6CB0]" />
          <span className="flex-1 font-medium">Редактировать данные</span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </Link>
      </div>
      <BottomNav />
    </MobileShell>
  );
}
