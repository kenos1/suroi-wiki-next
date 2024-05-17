(() => {
  const searchBar = document.getElementById("search-bar");
  if (!searchBar) return;

  searchBar.addEventListener("input", (e) => {
    console.log((e.target as HTMLInputElement).value)
  })
})();
