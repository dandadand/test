import type { CardData } from "@/lib/cardData";
import { User } from "lucide-react";
import Gerb from '../public/Emblem_of_Kyrgyzstan.svg.png';
import backgroundIDcard from '../public/backgroundIDcard.png';
import elemnt from '../public/element.png';

function CardHeader() {
  return (
    <div className="flex items-start justify-between gap-2 pb-2">
      <div className="flex items-start gap-2">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500 flex items-center justify-center text-[8px] font-bold text-white shrink-0">
          <img src={Gerb} alt="Emblem of Kyrgyzstan" className="w-full h-full object-cover" />
        </div>
        <div className="leading-tight">
          <div className="text-[9px] text-[#125D87] font-medium leading-2.1">КЫРГЫЗ РЕСПУБЛИКАСЫ</div>
          <div className="text-[9px] text-[#125D87] font-medium leading-2.1">КЫРГЫЗСКАЯ РЕСПУБЛИКА</div>
          <div className="text-[9px] text-[#125D87] font-medium leading-2.1">THE KYRGYZ REPUBLIC</div>
        </div>
      </div>
      <div className="text-right leading-tight">
        <div className="text-[9px] text-[#125D87] font-medium leading-2.1 text-center">ИДЕНТИФИКАЦИЯЛЫК КАРТА</div>
        <div className="text-[9px] text-[#125D87] font-medium leading-2.1 text-center">ИДЕНТИФИКАЦИОННАЯ КАРТА</div>
        <div className="text-[9px] text-[#125D87] font-medium leading-2.1 text-center">
          IDENTITY CARD
        </div>
         <img src={elemnt} alt="element" className="w-5 h-3" />
      </div>
    </div>
  );
}

const Field = ({ label, value }: { label: string; value: string }) => (
  <div className="mb-1.5">
    <div className="text-[8.5px] text-gray-500 leading-tight">{label}</div>
    <div className="text-[12px] font-semibold text-gray-900 leading-tight break-words">{value}</div>
  </div>
);

const decorBg = {
  backgroundImage: `url(${backgroundIDcard})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

export function IdCardFront({ data }: { data: CardData }) {
  return (
    <div className="relative w-full aspect-[0.98] bg-white rounded-2xl shadow-md p-4 overflow-hidden" style={decorBg}>
      <CardHeader />
      <div className="flex gap-3 mt-3">
        <div className="w-[38%] flex flex-col items-center">
          <div className="w-22 aspect-[2/3] rounded-md overflow-hidden bg-gray-100  flex items-center justify-center">
            {data.photo ? (
              <img src={data.photo} alt="Photo" className="w-full h-full object-cover" />
            ) : (
              <User className="w-10 h-10 text-gray-400" />
            )}
          </div>
          <div className="text-[8px] text-gray-500 mt-2 text-center leading-tight font-semibold">
            Колу / Подпись<br/>/ Signature
          </div>
          <div className="h-8 flex items-center justify-center mt-1">
            {data.signature ? (
              <img src={data.signature} alt="sig" className="max-h-8" />
            ) : (
              <span className="italic text-base text-gray-700" style={{ fontFamily: "cursive" }}>
                {data.lastNameLatin?.charAt(0)}{data.firstNameLatin?.charAt(0)}
              </span>
            )}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <Field label="Аты / Имя / Name" value={`${data.firstName} / ${data.firstNameLatin}`} />
          <Field label="Фамилиясы / Фамилия / Surname" value={`${data.lastName} / ${data.lastNameLatin}`} />
          <Field label="Атасынын аты / Отчество / Patronymic" value={data.patronymic} />
          <Field label="Жынысы / Пол / Sex" value="Э / М" />
          <Field label="Жарандыгы / Гражданство / Citizenship" value="Кыргыз Республикасы" />
          <Field label="Улуту / Национальность / Nationality" value="КЫРГЫЗ" />
          <Field label="Туулган күнү / Дата рождения / Date of birth" value={data.dateOfBirth} />
        </div>
      </div>
      <div className="absolute bottom-2 right-3 text-1xl font-bold text-black-400">1</div>
    </div>
  );
}

export function IdCardBack({ data }: { data: CardData }) {
  return (
    <div className="relative w-full aspect-[0.98] bg-white rounded-2xl shadow-md p-4 overflow-hidden" style={decorBg}>
      <CardHeader />
      <div className="mt-3 space-y-1">
        <Field label="Берген мекеме / Орган выдачи / Authority" value={data.authority} />
        <Field label="Берилген күнү / Дата выдачи / Date of issue" value={data.issueDate} />
        <Field label="Жеке номуру / Персональный номер / Personal number" value={data.personalNumber} />
        <Field label="Документтин № / № Документа / Document №" value={data.documentNumber} />
        <Field label="Колдонуу мөөнөтү / Срок действия / Date of expiry" value={data.expiryDate} />
        <Field label="Катталган жери / Адрес прописки / Address" value={data.address} />
      </div>
      <div className="absolute bottom-2 right-3 text-1xl font-bold text-black-400">2</div>
    </div>
  );
}
