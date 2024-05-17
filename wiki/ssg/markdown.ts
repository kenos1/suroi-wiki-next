import { existsSync } from "fs";
import { readFile } from "fs/promises";
import MarkdownIt from "markdown-it";
import MarkdownItAnchor from "markdown-it-anchor";
import Path from "path";

const markdownIt = MarkdownIt({
  html: true,
  linkify: true,
}).use(MarkdownItAnchor);

export type RenderMarkdownOptions = {
  replace?: [string, string][];
};

export async function renderMarkdown(
  path: string,
  options?: RenderMarkdownOptions
) {
  if (!existsSync(Path.join("./content", path))) return;
  let file = await readFile(Path.join("./content", path), { encoding: "utf8" });

  if (options?.replace) {
    options.replace.forEach((replaceOption) => {
      file = file.replace(replaceOption[0], replaceOption[1]);
    });
  }
  return markdownIt.render(file);
}
