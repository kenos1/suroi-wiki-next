import { html } from "./util";

export type WikiLayoutOptions = {
  title: string;
  content: string;
  contentTitle?: string;
};

export async function WikiLayout(options: WikiLayoutOptions) {
  return html`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/style.css" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <title>Suroi Wiki | ${options.title}</title>
      </head>
      <body>
        ${NavBar()}
        <section>
          <div class="container">
            <div class="content">
              <h1>${options.contentTitle ?? options.title}</h1>
              ${options.content}
            </div>
          </div>
        </section>
        <script src="/main.js"></script>
      </body>
    </html>
  `;
}

function NavBar() {
  return html`
    <nav class="navbar container block" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="/wiki.svg" />
          <span>Suroi Wiki</span>
        </a>
      </div>

      <div class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">Pages</a>

            <div class="navbar-dropdown">
              <a class="navbar-item" href="/">Home</a>
              <a class="navbar-item" href="/special/weapons">Weapons</a>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item control">
            <input id="search-bar" class="input" type="text" placeholder="Search">
          </div>
        </div>
      </div>
    </nav>
  `;
}
