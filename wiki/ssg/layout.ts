import { html } from "./util";

export type WikiLayoutOptions = {
  title: string,
  content: string
}

export async function WikiLayout(options: WikiLayoutOptions) {
  return html`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>${options.title}</title>
      </head>
      <body>
        ${options.content}
      </body>
    </html>
  `;
}
