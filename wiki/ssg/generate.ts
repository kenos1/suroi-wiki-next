import { mkdir, writeFile } from "fs/promises";
import Path from "path";
import { WikiLayout, WikiLayoutOptions } from "./layout";

export type Route = {
  title: string;
  url: string;
};

let routes: Route[] = [];

export async function createPage(path: string, options: WikiLayoutOptions) {
  const buildPath = Path.join("./dist/", path);
  await mkdir(Path.join("./dist/", path), { recursive: true });
  await writeFile(
    Path.join(buildPath, "index.html"),
    await WikiLayout(options)
  );
  routes.push({
    title: options.title,
    url: path,
  });
}

export async function createRoutesFile() {
  await writeFile("./dist/routes.json", JSON.stringify(routes));
}
