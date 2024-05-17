import { html } from "ssg/util";
import { createPage } from "../ssg/generate";
import { Guns } from "@definitions/guns";

export async function createGunPages() {
  for (const gun of Guns.definitions) {
    await createPage(`/wiki/${gun.idString}`, {
      title: gun.name,
      content: html`
        <table>
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
              <td><img src="/img/game/weapons/${gun.idString}_world.svg" /></td>
            </tr>
            <tr>
              <td>Name</td>
              <td>${gun.name}</td>
            </tr>
            <tr>
              <td>ID String</td>
              <td>${gun.idString}</td>
            </tr>
            <tr>
              <td>Damage</td>
              <td>${gun.ballistics.damage.toString()}</td>
            </tr>
          </tbody>
        </table>
      `,
    });
  }
}
