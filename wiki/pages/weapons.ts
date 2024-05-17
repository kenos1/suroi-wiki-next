import { html } from "ssg/util";
import { createPage } from "../ssg/generate";
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
            ${await renderMarkdown(`guns/${gun.idString}.md`)}
          </article>
          <table class="column">
            <thead>
              <th>Property Name</th>
              <th>Property Value</th>
            </thead>
            <tbody>
              <tr>
                <td>Loot Image</td>
                <td><img src="/img/game/weapons/${gun.idString}.svg" /></td>
              </tr>
              <tr>
                <td>World Image</td>
                <td>
                  <img src="/img/game/weapons/${gun.idString}_world.svg" />
                </td>
              </tr>
              <tr>
                <td>Name</td>
                <td>${gun.name}</td>
              </tr>
              <tr>
                <td>ID String</td>
                <td><code>${gun.idString}</code></td>
              </tr>
              <tr>
                <td>Ammo Capacity</td>
                <td>${gun.capacity.toString()}</td>
              </tr>
              <tr>
                <td>Ammo Type</td>
                <td>${gun.ammoType}</td>
              </tr>
              <tr>
                <td>Idle Spread</td>
                <td>${gun.shotSpread.toString()}</td>
              </tr>
              <tr>
                <td>Moving Spread</td>
                <td>${gun.moveSpread.toString()}</td>
              </tr>
              <tr>
                <th>Timings and Delays</th>
                <th></th>
              </tr>
              <tr>
                <td>Reload Time</td>
                <td>${gun.reloadTime.toString()} seconds</td>
              </tr>
              <tr>
                <td>Fire Delay</td>
                <td>${gun.fireDelay.toString()} milliseconds</td>
              </tr>
              <tr>
                <td>Switch Delay</td>
                <td>${gun.switchDelay.toString()} milliseconds</td>
              </tr>
              <tr>
                <td>Holding Speed Multiplyer</td>
                <td>x${gun.speedMultiplier.toString()}</td>
              </tr>
              <tr>
                <td>Recoil Speed Multiplyer</td>
                <td>x${gun.recoilMultiplier.toString()}</td>
              </tr>
              <tr>
                <td>Recoil Duration</td>
                <td>${gun.recoilDuration.toString()} milliseconds</td>
              </tr>
              <tr>
                <th>Ballistics</th>
                <th></th>
              </tr>
              <tr>
                <td>Damage</td>
                <td>${gun.ballistics.damage.toString()}</td>
              </tr>
              <tr>
                <td>Bullet Speed</td>
                <td>${gun.ballistics.speed.toString()}</td>
              </tr>
              <tr>
                <td>Range</td>
                <td>${gun.ballistics.range.toString()}</td>
              </tr>
              <tr>
                <td>Obstacle Damage Multiplyer</td>
                <td>${gun.ballistics.obstacleMultiplier.toString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
    });
  }
}
