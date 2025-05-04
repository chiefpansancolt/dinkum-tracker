/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from "fs";
import * as path from "path";
import * as url from "url";
import { app, BrowserWindow, dialog, ipcMain } from "electron";
import { autoUpdater } from "electron-updater";

app.commandLine.appendSwitch("disable-backgrounding-occluded-windows", "true");

let mainWindow: BrowserWindow | null;
const isDev = process.env.NODE_ENV === "development";
const appDataPath = app.getPath("userData");
const storePath = path.join(appDataPath, "store.json");

function initStore() {
  if (!fs.existsSync(storePath)) {
    fs.writeFileSync(storePath, JSON.stringify({}), "utf8");
  }
}

function getStore() {
  try {
    return JSON.parse(fs.readFileSync(storePath, "utf8"));
  } catch (error) {
    console.error("Error reading store:", error);
    return {};
  }
}

function setStore(data: any) {
  try {
    fs.writeFileSync(storePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing store:", error);
  }
}

async function createWindow() {
  initStore();

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
    backgroundColor: "#5a9367",
    show: false,
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow?.show();
  });

  autoUpdater.checkForUpdatesAndNotify();

  const startUrl = isDev
    ? "http://localhost:3000"
    : url.format({
        pathname: path.join(__dirname, "../next/index.html"),
        protocol: "file:",
        slashes: true,
      });

  await mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.handle("store-get", async (_, key: string) => {
  const store = getStore();
  return store[key];
});

ipcMain.handle("store-set", async (_, key: string, value: any) => {
  const store = getStore();
  store[key] = value;
  setStore(store);
  return true;
});

ipcMain.handle("store-delete", async (_, key: string) => {
  const store = getStore();
  delete store[key];
  setStore(store);
  return true;
});

ipcMain.handle("import-data", async () => {
  if (!mainWindow) return null;

  const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
    filters: [{ name: "JSON", extensions: ["json"] }],
    properties: ["openFile"],
  });

  if (canceled || filePaths.length === 0) return null;

  try {
    return fs.readFileSync(filePaths[0], "utf8");
  } catch (error) {
    console.error("Error reading import file:", error);
    return null;
  }
});

ipcMain.handle("export-data", async (_, data: string) => {
  if (!mainWindow) return false;

  const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
    filters: [{ name: "JSON", extensions: ["json"] }],
    defaultPath: `dinkum-tracker-backup-${new Date().toISOString().slice(0, 10)}.json`,
  });

  if (canceled || !filePath) return false;

  try {
    fs.writeFileSync(filePath, data, "utf8");
    return true;
  } catch (error) {
    console.error("Error writing export file:", error);
    return false;
  }
});
