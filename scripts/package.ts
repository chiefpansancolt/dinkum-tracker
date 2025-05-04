import { build } from "electron-builder";

async function packageApp() {
  try {
    await import("./build-electron");

    const result = await build({
      config: {
        appId: "com.dinkumtracker.app",
        productName: "Dinkum Tracker",
        files: ["dist/**/*", "electron/next/**/*"],
        directories: {
          output: "release",
        },
        mac: {
          category: "public.app-category.lifestyle",
        },
        win: {
          target: [
            {
              target: "nsis",
              arch: ["x64"],
            },
            {
              target: "portable",
            },
          ],
        },
        publish: {
          provider: "github",
          owner: "chiefpansancolt",
          repo: "dinkum-tracker",
        },
      },
    });

    console.log("Packaging completed:", result);
  } catch (error) {
    console.error("Error packaging app:", error);
  }
}

packageApp();
