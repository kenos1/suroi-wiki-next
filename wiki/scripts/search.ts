import Fuse from "fuse.js";
import { Route } from "ssg/generate";
import { html } from "ssg/util";

(async () => {
  const routes = (await (await fetch("/routes.json")).json()) as Route[];

  const fuse = new Fuse(routes, {
    keys: ["title"],
  });

  const searchModal = document.getElementById("search-modal") as HTMLDivElement;

  const searchModalBackground = searchModal.getElementsByClassName(
    "modal-background"
  )[0] as HTMLDivElement;

  const searchBar = document.getElementById("search-bar") as HTMLInputElement;

  const searchResults = document.getElementById(
    "search-results"
  ) as HTMLUListElement;

  searchModalBackground.addEventListener("click", () => {
    searchModal.classList.remove("is-active");
    searchBar.value = "";
  });

  searchBar.addEventListener("input", () => {
    const results = fuse.search(searchBar.value);

    searchResults.innerHTML =
      results.length > 0
        ? results
            .slice(0, 10)
            .map(
              (result) => html`
                <li><a href=${result.item.url}>${result.item.title}</a></li>
              `
            )
            .join("")
        : html` <li>No results found.</li> `;
  });

  (
    document.getElementById("search-button") as HTMLInputElement
  ).addEventListener("click", (e) => {
    (e.target as HTMLInputElement).value = "";
    searchModal.classList.add("is-active");
    searchBar.focus();
  });
  (
    document.getElementById("mobile-search-button") as HTMLButtonElement
  ).addEventListener("click", (e) => {
    (e.target as HTMLInputElement).value = "";
    searchModal.classList.add("is-active");
    searchBar.focus();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "/" && e.ctrlKey) {
      e.preventDefault();
      searchModal.classList.add("is-active");
      searchBar.focus();
    }
    if (e.key === "Escape") {
      searchModal.classList.remove("is-active");
      searchBar.value = "";
    }
  });
})();
