/* eslint-disable @typescript-eslint/no-explicit-any */
import { ImportData } from "@/types";
import { getPlaythroughs, STORAGE_KEY } from "@/lib/storage";

export const exportData = async (): Promise<string> => {
  if (typeof window === "undefined") {
    return "";
  }

  const playthroughs = await getPlaythroughs();
  return JSON.stringify({
    playthroughs,
    version: "1.0.0",
    exportDate: new Date().toISOString(),
  });
};

export const downloadData = async (): Promise<void> => {
  if (typeof window === "undefined") {
    return;
  }

  const data = await exportData();

  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `dinkum-tracker-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const validateImportData = (data: any): data is ImportData => {
  return (
    data &&
    Array.isArray(data.playthroughs) &&
    typeof data.version === "string" &&
    typeof data.exportDate === "string"
  );
};

export const importData = async (file?: File): Promise<boolean> => {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    if (!file) return false;
    const text = await file.text();

    const data = JSON.parse(text);

    if (!validateImportData(data)) {
      throw new Error("Invalid data format");
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data.playthroughs));

    return true;
  } catch (error) {
    console.error("Error importing data:", error);
    return false;
  }
};

export const clearAllData = async (): Promise<void> => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
};

export const saveDefaultSortPreference = async (
  sortBy: string,
): Promise<void> => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem("dinkum-tracker-default-sort", sortBy);
};

export const getDefaultSortPreference = async (): Promise<string> => {
  if (typeof window === "undefined") {
    return "lastUpdated";
  }

  return localStorage.getItem("dinkum-tracker-default-sort") || "lastUpdated";
};
