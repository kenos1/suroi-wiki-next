import { Obstacles, RotationMode } from "@definitions/obstacles";
import { createStatsTable } from "ssg/generate";
import { createItemArticle } from "ssg/markdown";
import { html } from "ssg/util";
import { range } from "util/arrays";

export async function createObstaclePages() {
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
        (obstacle.reflectBullets ? "Reflects bullets" : undefined)
      ]),
    });
  }
}
