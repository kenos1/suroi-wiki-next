import { html } from "ssg/util";
import { createPage, createStatsTable } from "../ssg/generate";
import { Guns } from "@definitions/guns";
import { renderMarkdown } from "ssg/markdown";

export async function createWeaponPages() {
  await createPage(`/special/weapons`, {
    title: "Weapons",
    content: html`
      <h2>Guns</h2>
      <ul>
        ${Guns.definitions
          .map(
            (gun) => html`
              <li>
                <a href="/wiki/${gun.idString}">${gun.name}</a>
              </li>
            `
          )
          .join("")}
      </ul>
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
}
