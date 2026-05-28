import { useEffect, useState, useSyncExternalStore } from "react";

export type CardData = {
  firstName: string;
  firstNameLatin: string;
  lastName: string;
  lastNameLatin: string;
  patronymic: string;
  dateOfBirth: string;
  personalNumber: string;
  documentNumber: string;
  issueDate: string;
  expiryDate: string;
  authority: string;
  address: string;
  photo: string | null;
  signature: string | null;
};

export const defaultData: CardData = {
  firstName: "БЕКСУЛТАН",
  firstNameLatin: "BEKSULTAN",
  lastName: "ШЕКЕРБЕКОВ",
  lastNameLatin: "SHEKERBEKOV",
  patronymic: "ЭМИРБЕКОВИЧ",
  dateOfBirth: "04.06.2006",
  personalNumber: "20406200600376",
  documentNumber: "ID2953516",
  issueDate: "02.09.2022",
  expiryDate: "02.09.2032",
  authority: "МКК 211031",
  address: "Кыргызская Республика, г. Бишкек, Свердловский р-н, улица Осмонкула, дом 13, кв. 6",
  photo: null,
  signature: null,
};

const STORAGE_KEY = "kg-id-card-data";

// Shared in-memory store so all components update in real time
let current: CardData = defaultData;
let hydrated = false;
const listeners = new Set<() => void>();

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) current = { ...defaultData, ...JSON.parse(raw) };
  } catch {}
}

function emit() {
  listeners.forEach((l) => l());
}

function setStore(updater: CardData | ((d: CardData) => CardData)) {
  const next = typeof updater === "function" ? (updater as (d: CardData) => CardData)(current) : updater;
  if (next === current) return;
  current = next;
  try {
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {}
  emit();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  return current;
}

function getServerSnapshot() {
  return defaultData;
}

export function useCardData() {
  // Hydrate from localStorage once on the client
  const [, force] = useState(0);
  useEffect(() => {
    if (!hydrated) {
      hydrate();
      force((n) => n + 1);
    }
  }, []);
  const data = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return [data, setStore] as const;
}

export function displayName(d: CardData) {
  const last = d.lastName ? d.lastName.charAt(0).toUpperCase() + d.lastName.slice(1).toLowerCase() : "";
  const initial = d.firstName ? d.firstName.charAt(0).toUpperCase() + "." : "";
  return `${last} ${initial}`.trim();
}
