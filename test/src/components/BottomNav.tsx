import { Link, useLocation } from "@tanstack/react-router";
import { Home, FileText, LayoutGrid, User } from "lucide-react";

const tabs = [
  { to: "/", label: "Главная", Icon: Home },
  { to: "/documents", label: "Документы", Icon: FileText },
  { to: "/services", label: "Услуги", Icon: LayoutGrid },
  { to: "/profile", label: "Профиль", Icon: User },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[94%] max-w-[370px] z-30">
      <nav className="bg-white rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.08)] flex items-center justify-around py-3 px-2">
        {tabs.map(({ to, label, Icon }) => {
          const active = pathname === to || (to === "/" && pathname === "/");
          return (
            <Link key={to} to={to} className="flex flex-col items-center gap-1 px-2">
              <Icon className={`w-6 h-6 ${active ? "text-[#2B6CB0]" : "text-gray-400"}`} strokeWidth={active ? 2.5 : 2} />
              <span className={`text-[11px] ${active ? "text-[#2B6CB0] font-semibold" : "text-gray-400"}`}>{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
