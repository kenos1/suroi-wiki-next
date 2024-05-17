import { existsSync } from "fs";
import { readFile } from "fs/promises";
import MarkdownIt from "markdown-it";
import MarkdownItAnchor from "markdown-it-anchor";
import Path from "path";
import { createPage } from "./generate";
import { html } from "./util";

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

export async function createItemArticle(options: {
  path: string,
  title: string,
  markdownPath: string,
  sidebar: string,
}) {
  return await createPage(`/wiki/${options.path}`, {
      title: options.title,
      content: html`
        <div class="columns is-desktop">
          <article class="column is-two-thirds">
            ${(await renderMarkdown(`${options.markdownPath}.md`)) ??
            html`<div class="notification is-danger">No Written Article Found.</div>`}
          </article>
          ${options.sidebar}
        </div>
      `
    })
}