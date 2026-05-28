import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Bell, HelpCircle, Search, QrCode, ThumbsUp, ChevronRight, MapPin, HeartPulse, FileText, Shield, Pencil } from "lucide-react";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { BottomNav } from "@/components/BottomNav";
import { EditSheet } from "@/components/EditSheet";
import { useCardData, displayName } from "@/lib/cardData";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Главная — Цифровой кошелёк" }] }),
  component: Home,
});

const banners = [
  { title: "ОСТЕРЕГАЙТЕСЬ", sub: "МОШЕННИКОВ", bg: "linear-gradient(135deg,#1a2a4a,#2c4870)", warn: true },
  { title: "ЗАМЕНА ВОДИТЕЛЬСКОГО", sub: "УДОСТОВЕРЕНИЯ ОНЛАЙН", bg: "linear-gradient(135deg,#3b82f6,#1d4ed8)" },
  { title: "СПРАВКА О НАЛИЧИИ", sub: "ИЛИ ОТСУТСТВИИ СУДИМОСТИ", bg: "linear-gradient(135deg,#0891b2,#0e7490)" },
];

function Home() {
  const [data] = useCardData();
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);

  return (
    <MobileShell>
      <div className="px-4 pt-4 pb-32">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button className="flex items-center gap-1 text-[#1A202C]">
            <span className="font-bold text-lg">{displayName(data) || "Пользователь"}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
              <Bell className="w-5 h-5 text-[#2B6CB0]" />
            </button>
            <button className="w-10 h-10 rounded-full bg-[#2B6CB0] shadow-sm flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Banners */}
        <div className="-mx-4 px-4 mb-4 overflow-x-auto no-scrollbar">
          <div className="flex gap-3">
            {banners.map((b, i) => (
              <div key={i} className="shrink-0 w-[170px] h-[105px] rounded-xl p-3 text-white relative overflow-hidden" style={{ background: b.bg }}>
                <div className="text-[11px] font-bold leading-tight">{b.title}</div>
                <div className="text-[11px] font-bold leading-tight">{b.sub}</div>
                {b.warn && (
                  <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">!</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-full h-12 flex items-center px-4 gap-3 mb-4 shadow-sm">
          <Search className="w-5 h-5 text-gray-400" />
          <input className="flex-1 bg-transparent outline-none text-sm" placeholder="Поиск услуг" />
          <QrCode className="w-5 h-5 text-gray-500" />
        </div>

        {/* Fines banner */}
        <button className="w-full h-14 rounded-2xl bg-[#2B6CB0] text-white flex items-center gap-3 px-5 mb-5 shadow-sm">
          <ThumbsUp className="w-6 h-6" />
          <span className="font-bold">Штрафов нет</span>
        </button>

        {/* Documents */}
        <h2 className="text-lg font-bold text-[#1A202C] mb-3">Мои документы</h2>
        <div className="grid grid-cols-2 gap-3 mb-2">
          <button onClick={() => navigate({ to: "/id-card" })} className="relative h-32 rounded-2xl p-3 text-left overflow-hidden shadow-sm" style={{ background: "linear-gradient(135deg,#63B3ED,#2B6CB0)" }}>
            <div className="text-white font-bold text-sm leading-tight">ID-карта</div>
            <div className="absolute bottom-2 right-2 w-14 h-10 rounded-md bg-white/90 flex flex-col justify-center items-center gap-0.5">
              <div className="w-6 h-1 bg-[#2B6CB0] rounded-full" />
              <div className="w-8 h-1 bg-[#63B3ED] rounded-full" />
              <div className="w-7 h-1 bg-[#63B3ED] rounded-full" />
            </div>
          </button>
          <button className="relative h-32 rounded-2xl p-3 text-left overflow-hidden shadow-sm" style={{ background: "linear-gradient(135deg,#68D391,#38A169)" }}>
            <div className="text-white font-bold text-sm leading-tight">Водительское<br/>удостоверение</div>
            <div className="absolute bottom-2 right-2 w-12 h-12 rounded-full border-4 border-white/90 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-white/90" />
            </div>
          </button>
        </div>

        <Link to="/id-card" className="flex items-center justify-center gap-1 py-3 text-[#2B6CB0] font-semibold">
          Все документы <ChevronRight className="w-4 h-4" />
        </Link>

        {/* Life situations */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-[#1A202C]">Жизненные ситуации</h2>
          <div className="w-7 h-7 rounded-full bg-[#2B6CB0] flex items-center justify-center">
            <HelpCircle className="w-4 h-4 text-white" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { Icon: MapPin, color: "text-red-500", title: "Смена прописки", sub: "4 услуг" },
            { Icon: HeartPulse, color: "text-pink-500", title: "Я заболел", sub: "6 услуг" },
            { Icon: FileText, color: "text-blue-500", title: "Получение справки", sub: "12 услуг" },
            { Icon: Shield, color: "text-indigo-500", title: "Защита прав", sub: "5 услуг" },
          ].map((c, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm h-32 flex flex-col justify-between">
              <c.Icon className={`w-8 h-8 ${c.color}`} />
              <div>
                <div className="text-[#2B6CB0] font-bold text-sm">{c.title}</div>
                <div className="text-xs text-gray-500 mt-0.5">{c.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit floating button */}
      <button onClick={() => setEditOpen(true)} className="fixed bottom-6 w-14 h-14 rounded-full bg-[#2B6CB0] shadow-lg flex items-center justify-center z-20" style={{ right: "max(calc(50% - 180px), 16px)" }}>
        <Pencil className="w-6 h-6 text-white" />
      </button>

      <EditSheet open={editOpen} onClose={() => setEditOpen(false)} />
      <BottomNav />
    </MobileShell>
  );
}
