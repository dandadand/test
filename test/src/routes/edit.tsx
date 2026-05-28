import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Upload } from "lucide-react";
import { useRef } from "react";
import { MobileShell } from "@/components/MobileShell";
import { useCardData, type CardData } from "@/lib/cardData";

export const Route = createFileRoute("/edit")({
  head: () => ({ meta: [{ title: "Редактирование данных" }] }),
  component: EditPage,
});

function EditPage() {
  const [data, setData] = useCardData();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  const update = (k: keyof CardData, v: string | null) => setData((d) => ({ ...d, [k]: v }));

  const onPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => update("photo", reader.result as string);
    reader.readAsDataURL(f);
  };

  const Field = ({ label, k, type = "text" }: { label: string; k: keyof CardData; type?: string }) => (
    <label className="block">
      <div className="text-xs text-gray-600 mb-1">{label}</div>
      <input
        type={type}
        value={(data[k] as string) ?? ""}
        onChange={(e) => update(k, e.target.value)}
        className="w-full h-11 px-3 rounded-xl bg-white border border-gray-200 outline-none focus:border-[#2B6CB0] text-sm"
      />
    </label>
  );

  return (
    <MobileShell>
      <div className="px-4 pt-4 pb-32">
        <div className="flex items-center justify-center relative mb-6">
          <button onClick={() => navigate({ to: "/id-card" })} className="absolute left-0 w-8 h-8 flex items-center justify-center">
            <ChevronLeft className="w-7 h-7 text-[#1A202C]" />
          </button>
          <h1 className="text-lg font-bold text-[#1A202C]">Редактирование данных</h1>
        </div>

        {/* Photo */}
        <div className="bg-white rounded-2xl p-4 mb-4 flex items-center gap-4">
          <div className="w-20 h-24 rounded-lg bg-gray-100 overflow-hidden border border-gray-200 flex items-center justify-center">
            {data.photo ? <img src={data.photo} className="w-full h-full object-cover" /> : <span className="text-xs text-gray-400">Нет фото</span>}
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold mb-1">Фото</div>
            <button onClick={() => fileRef.current?.click()} className="inline-flex items-center gap-2 px-3 h-9 rounded-lg bg-[#2B6CB0] text-white text-sm">
              <Upload className="w-4 h-4" /> Загрузить
            </button>
            {data.photo && (
              <button onClick={() => update("photo", null)} className="ml-2 text-xs text-red-500">Удалить</button>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPhoto} />
          </div>
        </div>

        <div className="space-y-3 bg-white rounded-2xl p-4">
          <Field label="Имя (кириллица)" k="firstName" />
          <Field label="Имя (латиница)" k="firstNameLatin" />
          <Field label="Фамилия (кириллица)" k="lastName" />
          <Field label="Фамилия (латиница)" k="lastNameLatin" />
          <Field label="Отчество" k="patronymic" />
          <Field label="Дата рождения" k="dateOfBirth" />
          <Field label="Персональный номер" k="personalNumber" />
          <Field label="№ Документа" k="documentNumber" />
          <Field label="Дата выдачи" k="issueDate" />
          <Field label="Срок действия" k="expiryDate" />
          <Field label="Орган выдачи" k="authority" />
          <label className="block">
            <div className="text-xs text-gray-600 mb-1">Адрес прописки</div>
            <textarea
              value={data.address}
              onChange={(e) => update("address", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 outline-none focus:border-[#2B6CB0] text-sm"
            />
          </label>
        </div>

        <button
          onClick={() => navigate({ to: "/id-card" })}
          className="mt-5 w-full h-12 rounded-2xl bg-[#2B6CB0] text-white font-bold shadow-md"
        >
          Сохранить
        </button>
      </div>
    </MobileShell>
  );
}
