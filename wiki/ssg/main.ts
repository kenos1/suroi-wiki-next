import { cp, rmdir } from "fs/promises";
import { createPage } from "ssg/generate";
import { createGunPages } from "pages/guns";

(async () => {
  try {
    await rmdir("./dist");
  } catch {}
  await cp("../client/public/img/", "./dist/img", {recursive: true})
  createPage("/", {
    title: "Suroi Wiki",
    content: "BBBB",
  });
  createGunPages();
})();
