import { readFile } from "fs/promises";
import { html } from "./util";

export type WikiLayoutOptions = {
  title: string;
  content: string;
  path: string;
  contentTitle?: string;
  thumbnailImage?: string;
};

export async function WikiLayout(options: WikiLayoutOptions) {
  return html`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:image" content="${options.path}/thumbnail.png" />
        <link rel="stylesheet" href="/style.css" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <title>Suroi Wiki | ${options.title}</title>
      </head>
      <body class="theme-dark">
        ${SearchModal()} ${NavBar()}
        <section style="min-height: 100vh" class="block">
          <div class="container">
            <div class="content">
              <h1>${options.contentTitle ?? options.title}</h1>
              ${options.content}
            </div>
          </div>
        </section>
        ${await Footer()}
        <script src="/main.js"></script>
      </body>
    </html>
  `;
}

function NavBar() {
  return html`
    <nav
      class="navbar container block"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="/wiki.svg" />
          <span style="margin-left: 1ch">Suroi Wiki</span>
        </a>

        <button id="mobile-search-button" class="navbar-burger"><iconify-icon class="icon" icon="mdi:magnify"></iconify-icon></button>
      </div>

      <div class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">Pages</a>
            <div class="navbar-dropdown">
              <a class="navbar-item" href="/">Home</a>
              <a class="navbar-item" href="/special/weapons">Weapons</a>
              <a class="navbar-item" href="/special/obstacles">Obstacles</a>
              <a class="navbar-item" href="/special/faq">Frequently Asked Questions</a>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item control">
            <input
              id="search-button"
              class="input"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
    </nav>
  `;
}


const buildDate = new Date().toUTCString()
const commit = readFile("../.git/ORIG_HEAD", {encoding: "utf-8"})

async function Footer() {
  return html`
    <footer class="footer">
      <div class="container">
        <p>Offical Suroi Wiki</p>
        <p>Built on ${buildDate}</p>
        <p>Information generated on commit ${await commit}</p>
      </div>
    </footer>
  `;
}

function SearchModal() {
  return html`<div id="search-modal" class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
      <input
        id="search-bar"
        class="input block"
        type="text"
        placeholder="Search here"
      />
      <div class="menu block">
        <p class="menu-label">Results</p>
        <ul class="menu-list" id="search-results">
          <li>No Results Found.</li>
        </ul>
      </div>
    </div>
  </div>`;
}
