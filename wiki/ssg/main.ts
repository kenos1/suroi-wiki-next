import { copyFile, cp, rmdir, writeFile } from "fs/promises";
import { createWeaponPages } from "pages/weapons";
import { createHomePage } from "pages/home";
import { build as bundleJS } from "esbuild"
import { compileAsync as bundleCSS } from "sass-embedded";
import { createRoutesFile } from "./generate";

(async () => {
  try {
    await rmdir("./dist");
  } catch {}
  await cp("../client/public/img/", "./dist/img", { recursive: true });
  await cp("./public", "./dist/", { recursive: true });
  await bundleJS({
    entryPoints: ["./scripts/main.ts"],
    outdir: "./dist",
    bundle: true
  })
  await writeFile("./dist/style.css", (await bundleCSS("./styles/style.scss", {loadPaths: ["node_modules"]})).css)
  await createHomePage();
  await createWeaponPages();

  await createRoutesFile()
})();
