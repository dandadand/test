import { useEffect, useRef, useState } from "react";
import { X, Upload, Trash2 } from "lucide-react";
import { useCardData, type CardData } from "@/lib/cardData";

type Props = { open: boolean; onClose: () => void };

export function EditSheet({ open, onClose }: Props) {
  const [data, setData] = useCardData();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const photoRef = useRef<HTMLInputElement>(null);
  const sigRef = useRef<HTMLInputElement>(null);

  // Animate enter/exit
  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
    } else if (mounted) {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 320);
      return () => clearTimeout(t);
    }
  }, [open, mounted]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!mounted) return null;

  const update = (k: keyof CardData, v: string | null) =>
    setData((d) => ({ ...d, [k]: v }));

  const onFile = (k: "photo" | "signature") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => update(k, reader.result as string);
    reader.readAsDataURL(f);
    e.target.value = "";
  };

  const renderField = (label: string, k: keyof CardData, type: string = "text") => (
    <label className="block">
      <div className="text-[11px] text-gray-600 mb-1">{label}</div>
      <input
        type={type}
        value={(data[k] as string) ?? ""}
        onChange={(e) => update(k, e.target.value)}
        className="w-full h-10 px-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#2B6CB0] focus:bg-white text-sm"
      />
    </label>
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-center pointer-events-none">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black transition-opacity duration-300 pointer-events-auto ${visible ? "opacity-50" : "opacity-0"}`}
      />
      {/* Sheet */}
      <div
        className={`relative w-full max-w-[390px] mt-auto bg-white rounded-t-3xl shadow-2xl pointer-events-auto transition-transform duration-300 ease-out ${visible ? "translate-y-0" : "translate-y-full"}`}
        style={{ maxHeight: "92vh" }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-2 pb-3 border-b border-gray-100">
          <h2 className="font-bold text-base text-[#1A202C]">Редактирование данных</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Scrollable form */}
        <div className="overflow-y-auto px-5 py-4 space-y-4" style={{ maxHeight: "calc(92vh - 120px)" }}>
          {/* Photo + Signature */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center">
              <div className="text-[11px] font-semibold text-gray-700 mb-2">Фото</div>
              <div className="w-20 h-24 rounded-lg bg-white border border-gray-200 overflow-hidden flex items-center justify-center mb-2">
                {data.photo ? (
                  <img src={data.photo} className="w-full h-full object-cover" alt="" />
                ) : (
                  <span className="text-[10px] text-gray-400">нет</span>
                )}
              </div>
              <div className="flex gap-1">
                <button onClick={() => photoRef.current?.click()} className="px-2 h-7 rounded-md bg-[#2B6CB0] text-white text-[11px] inline-flex items-center gap-1">
                  <Upload className="w-3 h-3" /> Фото
                </button>
                {data.photo && (
                  <button onClick={() => update("photo", null)} className="w-7 h-7 rounded-md bg-red-50 text-red-500 inline-flex items-center justify-center">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={onFile("photo")} />
            </div>

            <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center">
              <div className="text-[11px] font-semibold text-gray-700 mb-2">Подпись</div>
              <div className="w-full h-24 rounded-lg bg-white border border-gray-200 overflow-hidden flex items-center justify-center mb-2">
                {data.signature ? (
                  <img src={data.signature} className="max-w-full max-h-full object-contain" alt="" />
                ) : (
                  <span className="text-[10px] text-gray-400">нет</span>
                )}
              </div>
              <div className="flex gap-1">
                <button onClick={() => sigRef.current?.click()} className="px-2 h-7 rounded-md bg-[#2B6CB0] text-white text-[11px] inline-flex items-center gap-1">
                  <Upload className="w-3 h-3" /> Подпись
                </button>
                {data.signature && (
                  <button onClick={() => update("signature", null)} className="w-7 h-7 rounded-md bg-red-50 text-red-500 inline-flex items-center justify-center">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <input ref={sigRef} type="file" accept="image/*" className="hidden" onChange={onFile("signature")} />
            </div>
          </div>

          {/* ФИО */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {renderField("Имя (кир.)", "firstName")}
              {renderField("Имя (лат.)", "firstNameLatin")}
              {renderField("Фамилия (кир.)", "lastName")}
              {renderField("Фамилия (лат.)", "lastNameLatin")}
            </div>
            {renderField("Отчество", "patronymic")}
            {renderField("Дата рождения", "dateOfBirth")}
            <label className="block">
              <div className="text-[11px] text-gray-600 mb-1">Адрес прописки</div>
              <textarea
                value={data.address}
                onChange={(e) => update("address", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#2B6CB0] focus:bg-white text-sm"
              />
            </label>
            <details className="bg-gray-50 rounded-xl p-3">
              <summary className="text-xs font-semibold text-gray-700 cursor-pointer">Документ (доп.)</summary>
              <div className="space-y-3 mt-3">
                {renderField("Персональный номер", "personalNumber")}
                {renderField("№ Документа", "documentNumber")}
                {renderField("Дата выдачи", "issueDate")}
                {renderField("Срок действия", "expiryDate")}
                {renderField("Орган выдачи", "authority")}
              </div>
            </details>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-100 bg-white rounded-b-none">
          <button
            onClick={onClose}
            className="w-full h-12 rounded-2xl bg-[#2B6CB0] text-white font-bold shadow-md active:scale-[0.99] transition"
          >
            Сохранить
          </button>
          <div className="text-center text-[10px] text-gray-400 mt-2">Изменения сохраняются автоматически</div>
        </div>
      </div>
    </div>
  );
}
