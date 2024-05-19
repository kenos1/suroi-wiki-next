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

export async function createMarkdownPage(title: string, path: string, markdownPath: string) {
  return await createPage(path, {
    title: title,
    path: path,
    content: await renderMarkdown(markdownPath) ?? html`<div class="notification is-danger">No Article Found.</div>`
  })
}

export async function createItemArticle(options: {
  path: string,
  title: string,
  markdownPath: string,
  sidebar: string,
  thumbnail?: string
}) {
  return await createPage(`/wiki/${options.path}`, {
      title: options.title,
      thumbnailImage: options.thumbnail,
      path: `/wiki/${options.path}`,
      content: html`
        <div class="columns is-desktop">
          <article class="column is-two-thirds">
            ${(await renderMarkdown(`${options.markdownPath}.md`)) ??
            html`<div class="notification is-danger">No Written Article Found.</div>`}
          </article>
          ${options.sidebar}
        </div>
      `,
    })
}