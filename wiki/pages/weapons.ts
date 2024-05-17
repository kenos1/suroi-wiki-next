import { html } from "ssg/util";
import { createPage, createStatsTable } from "../ssg/generate";
import { Guns } from "@definitions/guns";
import { renderMarkdown } from "ssg/markdown";
import { Melees } from "@definitions/melees";
import { Throwables } from "@definitions/throwables";

export async function createWeaponPages() {
  await createPage(`/special/weapons`, {
    title: "Weapons",
    content: html`
      ${await renderMarkdown("weapons.md", {
        replace: [
          ["<guns>", Guns.definitions.length.toString()],
          ["<guns-list>", Guns
            .definitions.map(gun => 

              `- [${gun.name}](/wiki/${gun.idString})`

            ).join("\n")],

          ["<melees>", Melees.definitions.length.toString()],
          ["<melees-list>", Melees.definitions.map(melee => 

            `- [${melee.name}](/wiki/${melee.idString})`

          ).join("\n")],

          ["<throwables>", Throwables.definitions.length.toString()],
          ["<throwables-list>", Throwables.definitions.map(throwable => 

            `- [${throwable.name}](/wiki/${throwable.idString})`

          ).join("\n")]
        ]
      }) ?? ""}
    `,
  });

  for (const gun of Guns.definitions) {
    await createPage(`/wiki/${gun.idString}`, {
      title: gun.name,
      content: html`
        <div class="columns is-desktop">
          <article class="column is-two-thirds">
            ${(await renderMarkdown(`guns/${gun.idString}.md`)) ??
            "No content exists"}
          </article>
          ${createStatsTable([
            ["Loot Image", html`<img src="/img/game/weapons/${gun.idString}.svg" />`],
            ["World Image", html`<img src="/img/game/weapons/${gun.idString}_world.svg" />`],
            ["ID String", html`<code>${gun.idString}</code>`],
            ["Ammo Capacity", gun.capacity.toString()],
            ["Ammo Type", html`<img style="width: 2rem" src="/img/game/loot/${gun.ammoType}.svg" />`],
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
            ["Obstacle Damage Multiplyer", "x" + gun.ballistics.obstacleMultiplier.toString()]
          ])}
        </div>
      `,
    });
  }

  for (const melee of Melees.definitions) {
    await createPage(`/wiki/${melee.idString}`, {
      title: melee.name,
      content: html`
        <div class="columns is-desktop">
          <article class="column is-two-thirds">
            ${(await renderMarkdown(`melees/${melee.idString}.md`)) ??
            "No content exists"}
          </article>
          ${createStatsTable([
            ["Loot Image", html`<img src="/img/game/weapons/${melee.idString}.svg" />`],
            ["ID String", html`<code>${melee.idString}</code>`],
            ["Damage", melee.damage.toString()],
            ["Cooldown", melee.cooldown.toString() + " milliseconds"],
            ["Obstacle Damage Multiplyer", "x" + melee.obstacleMultiplier.toString()]
          ])}
        </div>
      `
    })
  }

  for (const throwable of Throwables.definitions) {
    await createPage(`/wiki/${throwable.idString}`, {
      title: throwable.name,
      content: html`
        <div class="columns is-desktop">
          <article class="column is-two-thirds">
            ${(await renderMarkdown(`throwables/${throwable.idString}.md`)) ??
            "No content exists"}
          </article>
          ${createStatsTable([
            ["Loot Image", html`<img src="/img/game/weapons/${throwable.idString}.svg" />`],
            ["ID String", html`<code>${throwable.idString}</code>`],
          ])}
        </div>
      `
    })
  }
}
