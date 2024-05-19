import { mkdir, writeFile } from "fs/promises";
import Path from "path";
import { WikiLayout, WikiLayoutOptions } from "./layout";
import { html } from "./util";
import { createThumbnail } from "./thumbnail";

export type Route = {
  title: string;
  url: string;
  thumbnailImage?: string;
};

let routes: Route[] = [];

export async function createPage(path: string, options: WikiLayoutOptions) {
  const buildPath = Path.join("./dist/", path);
  await mkdir(Path.join("./dist/", path), { recursive: true });
  await writeFile(
    Path.join(buildPath, "index.html"),
    await WikiLayout(options)
  );
  const route: Route = {
    title: options.title,
    url: path,
    thumbnailImage: options.thumbnailImage
  }
  createThumbnail(route);
  routes.push(route);
}

export function createStatsTable(information: ([string, string] | string | undefined)[]) {
  return html`
    <table class="column">
      <thead>
        <th>Property Name</th>
        <th>Property Value</th>
      </thead>
      <tbody>
        ${information.map(row => {
          if (!row) return ``;
          switch (typeof(row)) {
            case "string":
              return html`<tr>
                <th>${row}</th>
                <th></th>
              </tr>`
              default:
                return html`<tr>
                  <td>${row[0]}</td>
                  <td>${row[1]}</td>
                </tr>`
          }
        }).join("")}
      </tbody>
    </table>
  `;
}

export async function createRoutesFile() {
  await writeFile("./dist/routes.json", JSON.stringify(routes));
}
