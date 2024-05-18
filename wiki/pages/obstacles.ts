import { Obstacles, RotationMode } from "@definitions/obstacles";
import { createPage, createStatsTable } from "ssg/generate";
import { createItemArticle, renderMarkdown } from "ssg/markdown";
import { html } from "ssg/util";
import { range } from "util/arrays";

export async function createObstaclePages() {
  await createPage("/special/obstacles", {
    title: "Obstacles",
    content:
      (await renderMarkdown("obstacles.md", {
        replace: [
          ["<obstacles>", Obstacles.definitions.length.toString()],
          [
            "<obstacle-list>",
            html`
              <div class="grid">
                ${Obstacles.definitions
                  .map(
                    (obstacle) =>
                      html`<a href="/wiki/${obstacle.idString}"
                        >${obstacle.name}</a
                      >`
                  )
                  .join("")}
              </div>
            `,
          ],
        ],
      })) ?? "",
  });

  for (const obstacle of Obstacles.definitions) {
    await createItemArticle({
      path: obstacle.idString,
      markdownPath: `obstacles/${obstacle.idString}`,
      title: obstacle.name,
      sidebar: createStatsTable([
        (obstacle.variations
          ? [
              "Images",
              html`<div class="grid is-col-min-2">
                ${range(1, (obstacle.variations as number) + 1)
                  .map(
                    (variation) => html`
                      <img
                        src="/img/game/obstacles/${obstacle.idString}_${variation.toString()}.svg"
                      />
                    `
                  )
                  .join("")}
              </div>`,
            ]
          : [
              "Image",
              html`<img src="/img/game/obstacles/${obstacle.idString}.svg" />`,
            ]) as [string, string],
        ["Health", obstacle.health.toString()],
        [
          "Rotation Mode",
          ((rotationMode) => {
            switch (rotationMode) {
              case RotationMode.Full:
                return "Full";
              case RotationMode.Limited:
                return "Cardinal";
              case RotationMode.Binary:
                return "Binary";
              case RotationMode.None:
                return "None";
            }
          })(obstacle.rotationMode),
        ],
        obstacle.reflectBullets ? "Reflects bullets" : undefined,
      ]),
    });
  }
}
