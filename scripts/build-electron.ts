import * as fs from "fs";
import * as path from "path";
import { exec } from "child_process";

exec("next build && next export -o electron/next", (error, stdout, stderr) => {
  if (error) {
    console.error(`Error building Next.js app: ${error}`);
    return;
  }

  console.log("Next.js build completed");
  console.log(stdout);

  const outDir = path.join(__dirname, "../electron/next");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  exec("tsc --project electron/tsconfig.json", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error building Electron: ${error}`);
      return;
    }

    console.log("Electron build completed");
    console.log(stdout);

    console.log("Build completed successfully");
  });
});
