import { html } from "ssg/util";
import { createPage, createStatsTable } from "../ssg/generate";
import { Guns } from "@definitions/guns";
import { createItemArticle, renderMarkdown } from "ssg/markdown";
import { Melees } from "@definitions/melees";
import { Throwables } from "@definitions/throwables";

export async function createWeaponPages() {
  await createPage(`/special/weapons`, {
    title: "Weapons",
    content: html`
      ${(await renderMarkdown("weapons.md", {
        replace: [
          ["<guns>", Guns.definitions.length.toString()],
          [
            "<guns-list>",
            html`<div class="grid">
              ${Guns.definitions
                .map(
                  (gun) => html`<a href="/wiki/${gun.idString}">${gun.name}</a>`
                )
                .join("\n")}
            </div>`,
          ],

          ["<melees>", Melees.definitions.length.toString()],
          [
            "<melees-list>",
            html`<div class="grid">
              ${Melees.definitions
                .map(
                  (melee) =>
                    html`<a href="/wiki/${melee.idString}">${melee.name}</a>`
                )
                .join("\n")}
            </div>`,
          ],

          ["<throwables>", Throwables.definitions.length.toString()],
          [
            "<throwables-list>",
            html`<div class="grid">
              ${Throwables.definitions
                .map(
                  (throwable) =>
                    html`<a href="/wiki/${throwable.idString}">${throwable.name}</a>`
                )
                .join("\n")}
            </div>`,
          ],
        ],
      })) ?? ""}
    `,
  });

  for (const gun of Guns.definitions) {
    await createItemArticle({
      title: gun.name,
      path: gun.idString,
      markdownPath: `guns/${gun.idString}`,
      sidebar: createStatsTable([
        [
          "Loot Image",
          html`<img src="/img/game/weapons/${gun.idString}.svg" />`,
        ],
        [
          "World Image",
          html`<img src="/img/game/weapons/${gun.idString}_world.svg" />`,
        ],
        ["ID String", html`<code>${gun.idString}</code>`],
        ["Ammo Capacity", gun.capacity.toString()],
        [
          "Ammo Type",
          html`<img
            style="width: 2rem"
            src="/img/game/loot/${gun.ammoType}.svg"
          />`,
        ],
        ["Idle Spread", gun.shotSpread.toString()],
        ["Moving Spread", gun.moveSpread.toString()],

        "Timings and Delays",
        ["Reload Time", gun.reloadTime.toString() + " seconds"],
        ["Fire Delay", gun.fireDelay.toString() + " milliseconds"],
        ["Switch Delay", gun.switchDelay.toString() + " milliseconds"],
        ["Holding Speed Multiplyer", "x" + gun.speedMultiplier.toString()],
        ["Recoil Speed Multiplyer", "x" + gun.recoilMultiplier.toString()],
        ["Recoil Duration", gun.recoilDuration.toString() + " milliseconds"],

        "Ballistics",
        ["Damage", gun.ballistics.damage.toString()],
        ["Bullet Speed", gun.ballistics.speed.toString()],
        ["Range", gun.ballistics.range.toString()],
        [
          "Obstacle Damage Multiplyer",
          "x" + gun.ballistics.obstacleMultiplier.toString(),
        ],
      ]),
    });
  }

  for (const melee of Melees.definitions) {
    await createItemArticle({
      path: melee.idString,
      title: melee.name,
      markdownPath: `melees/${melee.idString}`,
      sidebar: createStatsTable([
        [
          "Loot Image",
          html`<img src="/img/game/weapons/${melee.idString}.svg" />`,
        ],
        ["ID String", html`<code>${melee.idString}</code>`],
        ["Damage", melee.damage.toString()],
        ["Cooldown", melee.cooldown.toString() + " milliseconds"],
        [
          "Obstacle Damage Multiplyer",
          "x" + melee.obstacleMultiplier.toString(),
        ],
      ]),
    });
  }

  for (const throwable of Throwables.definitions) {
    await createItemArticle({
      title: throwable.name,
      path: throwable.idString,
      markdownPath: `throwables/${throwable.idString}`,
      sidebar: createStatsTable([
        [
          "Loot Image",
          html`<img src="/img/game/weapons/${throwable.idString}.svg" />`,
        ],
        ["ID String", html`<code>${throwable.idString}</code>`],
      ]),
    });
  }
}
