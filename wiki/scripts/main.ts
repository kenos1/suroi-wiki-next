import "./search"
import "iconify-icon"

import renderMathInElement from "katex/contrib/auto-render"

renderMathInElement(document.body, {
  delimiters: [{left: "$$", right: "$$", display: false}]
})