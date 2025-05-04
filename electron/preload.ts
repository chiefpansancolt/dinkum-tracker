/* eslint-disable @typescript-eslint/no-explicit-any */
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  store: {
    get: async (key: string) => {
      return ipcRenderer.invoke("store-get", key);
    },
    set: async (key: string, value: any) => {
      return ipcRenderer.invoke("store-set", key, value);
    },
    delete: async (key: string) => {
      return ipcRenderer.invoke("store-delete", key);
    },
  },
  import: async () => {
    return ipcRenderer.invoke("import-data");
  },
  export: async (data: string) => {
    return ipcRenderer.invoke("export-data", data);
  },
});
