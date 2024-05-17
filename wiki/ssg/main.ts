import { copyFile, cp, rmdir } from "fs/promises";
import { createWeaponPages } from "pages/weapons";
import { createHomePage } from "pages/home";

(async () => {
  try {
    await rmdir("./dist");
  } catch {}
  await cp("../client/public/img/", "./dist/img", { recursive: true });
  await cp("./public", "./dist/", { recursive: true });
  await copyFile("node_modules/bulma/css/bulma.css", "./dist/style.css");
  createHomePage();
  createWeaponPages();
})();
