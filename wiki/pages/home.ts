import { createPage } from "ssg/generate";
import { renderMarkdown } from "ssg/markdown";
import { html } from "ssg/util";

export async function createHomePage() {
  await createPage("/", {
    title: "Home",
    content: await renderMarkdown("home.md") ?? "",
    contentTitle: "Suroi Wiki"
  });
}
