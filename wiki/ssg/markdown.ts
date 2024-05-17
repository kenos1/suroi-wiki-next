import { existsSync } from "fs";
import { readFile } from "fs/promises";
import MarkdownIt from "markdown-it";
import Path from "path";

const markdownIt = MarkdownIt({
  html: true,
  linkify: true,
});

export async function renderMarkdown(path: string) {
  if (!existsSync(Path.join("./content", path))) return;
  return markdownIt.render(
    await readFile(Path.join("./content", path), { encoding: "utf8" })
  );
}