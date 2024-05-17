export function html(
  templateStrings: TemplateStringsArray,
  ...strings: string[]
) {
  return templateStrings
    .map(
      (templateString, i) =>
        templateString +
        ((str) => (str === undefined ? "" : str))(strings.at(i))
    )
    .join("")
    .trim();
}
