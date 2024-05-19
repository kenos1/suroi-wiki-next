import { readFile, writeFile } from "fs/promises";
import { Route } from "./generate";
import { svg } from "./util";
import { Resvg } from "@resvg/resvg-js";
import Path from "path";

export async function createThumbnail(route: Route) {
  const thumbnailSVG = (
    await readFile("./public/thumbnail-template.svg", { encoding: "utf-8" })
  ).replace("{{title}}", route.title)
  .replace("--thumbnail--", route.thumbnailImage ?? "./public/suroi_favicon.svg");

  const resvg = new Resvg(thumbnailSVG, {
    fitTo: {
      mode: "width",
      value: 1200,
    },
    font: {
      loadSystemFonts: false,
      fontFiles: ["./public/fonts/Inter-Regular.otf"],
    },
  });

  await writeFile(
    Path.join("./dist", route.url, "thumbnail.png"),
    resvg.render().asPng()
  );
}
