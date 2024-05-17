import { mkdir, writeFile } from "fs/promises";
import Path from "path";
import { WikiLayout, WikiLayoutOptions } from "./layout";

export async function createPage(path: string, options: WikiLayoutOptions) {
  const buildPath = Path.join("./dist/", path);
  await mkdir(Path.join("./dist/", path), { recursive: true });
  await writeFile(
    Path.join(buildPath, "index.html"),
    await WikiLayout(options)
  );
}