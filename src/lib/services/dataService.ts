/* eslint-disable @typescript-eslint/no-explicit-any */
import { ImportData } from "@/types";
import { getPlaythroughs, STORAGE_KEY } from "@/lib/storage";

const isElectron = (): boolean => {
  return typeof window !== "undefined" && window.electron !== undefined;
};

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

  if (isElectron()) {
    await window.electron?.export(data);
  } else {
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `dinkum-tracker-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
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
    let text;

    if (isElectron()) {
      text = await window.electron?.import();
      if (!text) return false;
    } else {
      if (!file) return false;
      text = await file.text();
    }

    const data = JSON.parse(text);

    if (!validateImportData(data)) {
      throw new Error("Invalid data format");
    }

    if (isElectron()) {
      await window.electron?.store.set(STORAGE_KEY, data.playthroughs);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data.playthroughs));
    }

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

  if (isElectron()) {
    await window.electron?.store.set(STORAGE_KEY, []);
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
};

export const saveDefaultSortPreference = async (
  sortBy: string,
): Promise<void> => {
  if (typeof window === "undefined") {
    return;
  }

  if (isElectron()) {
    await window.electron?.store.set("dinkum-tracker-default-sort", sortBy);
  } else {
    localStorage.setItem("dinkum-tracker-default-sort", sortBy);
  }
};

export const getDefaultSortPreference = async (): Promise<string> => {
  if (typeof window === "undefined") {
    return "lastUpdated";
  }

  if (isElectron()) {
    const pref = await window.electron?.store.get(
      "dinkum-tracker-default-sort",
    );
    return pref || "lastUpdated";
  } else {
    return localStorage.getItem("dinkum-tracker-default-sort") || "lastUpdated";
  }
};
