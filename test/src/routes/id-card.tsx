import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, QrCode, X } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { MobileShell } from "@/components/MobileShell";
import { IdCardFront, IdCardBack } from "@/components/IdCard";
import { useCardData } from "@/lib/cardData";


export const Route = createFileRoute("/id-card")({
  head: () => ({ meta: [{ title: "Идентификационная карта" }] }),
  component: IdCardPage,
});

function IdCardPage() {
  const [data] = useCardData();
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);
  const [drag, setDrag] = useState(0);
  const [showQR, setShowQR] = useState(false);
  const startX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const TOTAL_SLIDES = 2;

  const onStart = (x: number) => { startX.current = x; };
  const onMove = (x: number) => {
    if (startX.current === null) return;
    const dx = x - startX.current;
    setDrag(dx);
  };
  const onEnd = () => {
    if (startX.current === null) return;
    const w = containerRef.current?.offsetWidth ?? 300;
    if (Math.abs(drag) > w * 0.25) {
      let newSlide = slide + (drag < 0 ? 1 : -1);
      // Бесконечный слайдер
      newSlide = (newSlide % TOTAL_SLIDES + TOTAL_SLIDES) % TOTAL_SLIDES;
      setSlide(newSlide);
    }
    setDrag(0);
    startX.current = null;
  };

  useEffect(() => {
    const up = () => onEnd();
    window.addEventListener("mouseup", up);
    return () => window.removeEventListener("mouseup", up);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drag, slide]);

  // Compute transforms for stacking effect with depth
  const slideStyle = (idx: number): React.CSSProperties => {
    const w = containerRef.current?.offsetWidth ?? 300;
    const h = containerRef.current?.offsetHeight ?? 400;
    const isActive = idx === slide;
    const nextSlide = (slide + 1) % TOTAL_SLIDES;
    const isNext = idx === nextSlide;
    
    let translateX = 0;
    let translateY = 0;
    let scale = 1;
    let opacity = 1;
    let z = isActive ? 20 : 10;
    
    const STACK_OFFSET = 20; // Смещение для эффекта стопки

    if (drag !== 0) {
      const dragPercent = drag / w;
      
      if (isActive) {
        // Активная карточка уходит вниз и влево
        translateX = dragPercent * 100;
        translateY = Math.abs(dragPercent) * STACK_OFFSET;
        scale = 1;
        opacity = 1;
        z = 20;
      } else if (isNext) {
        // Входящая карточка поднимается и приходит справа
        translateX = 100 + dragPercent * 100;
        translateY = STACK_OFFSET - Math.abs(dragPercent) * STACK_OFFSET;
        scale = 1;
        opacity = 1;
        z = 30;
      } else {
        translateX = idx < slide ? -100 : 100;
        translateY = idx < slide ? -STACK_OFFSET : STACK_OFFSET;
        scale = 1;
        opacity = 0;
      }
    } else {
      if (isActive) {
        // Активная карточка вверху
        translateX = 0;
        translateY = 0;
        scale = 1;
        opacity = 1;
        z = 20;
      } else if (isNext) {
        // Следующая карточка видна снизу
        translateX = 0;
        translateY = STACK_OFFSET;
        scale = 1;
        opacity = 1;
        z = 15;
      } else {
        translateX = idx < slide ? -100 : 100;
        translateY = idx < slide ? -STACK_OFFSET : STACK_OFFSET;
        scale = 1;
        opacity = 0;
        z = 10;
      }
    }

    return {
      transform: `translateX(${translateX}%) translateY(${translateY}px) scale(${scale})`,
      opacity,
      zIndex: z,
      transition: drag === 0 ? "all 350ms cubic-bezier(0.34, 1.56, 0.64, 1)" : "none",
    };
  };

  return (
    <MobileShell>
      <div className="px-4 pt-4 pb-24">
        <div className="flex items-center justify-center relative mb-6">
          <button onClick={() => navigate({ to: "/" })} className="absolute left-0 w-8 h-8 flex items-center justify-center">
            <ChevronLeft className="w-7 h-7 text-[#1A202C]" />
          </button>
          <h1 className="text-lg font-bold text-[#1A202C]">Идентификационная карта</h1>
        </div>

        <div
          ref={containerRef}
          className="relative w-full overflow-hidden touch-pan-y select-none"
          style={{ aspectRatio: "0.72" }}
          onTouchStart={(e) => onStart(e.touches[0].clientX)}
          onTouchMove={(e) => onMove(e.touches[0].clientX)}
          onTouchEnd={onEnd}
          onMouseDown={(e) => onStart(e.clientX)}
          onMouseMove={(e) => startX.current !== null && onMove(e.clientX)}
        >
          <div className="absolute inset-0" style={slideStyle(0)}>
            <IdCardFront data={data} />
          </div>
          <div className="absolute inset-0" style={slideStyle(1)}>
            <IdCardBack data={data} />
          </div>
          
          {/* Пагинация внутри слайдера */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-40">
            <button 
              onClick={() => setSlide(0)} 
              className={`h-2 rounded-full transition-all duration-300 ${slide === 0 ? "w-6 bg-[#2B6CB0]" : "w-2 bg-white/50"}`} 
            />
            <button 
              onClick={() => setSlide(1)} 
              className={`h-2 rounded-full transition-all duration-300 ${slide === 1 ? "w-6 bg-teal-500" : "w-2 bg-white/50"}`} 
            />
          </div>
        </div>

        {/* QR - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-lg p-6 z-10">
          <div className="flex flex-col items-center">
            <button onClick={() => setShowQR(true)} className="w-16 h-16 rounded-full bg-[#2B6CB0] shadow-lg flex items-center justify-center">
              <QrCode className="w-9 h-9 text-white" />
            </button>
            <div className="text-xs text-gray-600 mt-3">Потяните для просмотра QR кода</div>
          </div>
        </div>
      </div>

      {showQR && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center" onClick={() => setShowQR(false)}>
          <div className="bg-white w-full max-w-[390px] rounded-t-3xl sm:rounded-3xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">QR код</h3>
              <button onClick={() => setShowQR(false)}><X className="w-6 h-6" /></button>
            </div>
            <div className="aspect-square w-full bg-white border border-gray-200 rounded-xl flex items-center justify-center p-6">
              <QrPattern data={data.documentNumber} />
            </div>
            <div className="text-center text-sm text-gray-600 mt-4">{data.documentNumber}</div>
          </div>
        </div>
      )}
    </MobileShell>
  );
}

// Simple decorative QR-like pattern
function QrPattern({ data }: { data: string }) {
  const size = 21;
  const cells: boolean[] = [];
  let h = 0;
  for (let i = 0; i < data.length; i++) h = (h * 31 + data.charCodeAt(i)) >>> 0;
  for (let i = 0; i < size * size; i++) {
    h = (h * 1103515245 + 12345) >>> 0;
    cells.push((h & 1) === 1);
  }
  // Force corner finder patterns
  const isFinder = (r: number, c: number) => {
    const inBox = (br: number, bc: number) => r >= br && r < br + 7 && c >= bc && c < bc + 7;
    return inBox(0, 0) || inBox(0, size - 7) || inBox(size - 7, 0);
  };
  const finderPx = (r: number, c: number) => {
    let br = 0, bc = 0;
    if (r < 7 && c < 7) { br = 0; bc = 0; }
    else if (r < 7) { br = 0; bc = size - 7; }
    else { br = size - 7; bc = 0; }
    const lr = r - br, lc = c - bc;
    const outer = lr === 0 || lr === 6 || lc === 0 || lc === 6;
    const inner = lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4;
    return outer || inner;
  };
  return (
    <div className="grid w-full h-full" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
      {Array.from({ length: size * size }).map((_, i) => {
        const r = Math.floor(i / size), c = i % size;
        const on = isFinder(r, c) ? finderPx(r, c) : cells[i];
        return <div key={i} style={{ background: on ? "#000" : "transparent" }} />;
      })}
    </div>
  );
}
