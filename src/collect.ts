import ascii from "./effects/ascii"
import blue from "./effects/blue"
import brighten from "./effects/brighten"
import contrast from "./effects/contrast"
import cool from "./effects/cool"
import desaturate from "./effects/desaturate"
import duotone from "./effects/duotone"
import edges from "./effects/edges"
import emboss from "./effects/emboss"
import exposure from "./effects/exposure"
import gamma from "./effects/gamma"
import glitch from "./effects/glitch"
import grayscale from "./effects/grayscale"
import green from "./effects/green"
import halftone from "./effects/halftone"
import invert from "./effects/invert"
import kaleidoscope from "./effects/kaleidoscope"
import liquid from "./effects/liquid"
import paint from "./effects/paint"
import pixelate from "./effects/pixelate"
import posterize from "./effects/posterize"
import red from "./effects/red"
import ripple from "./effects/ripple"
import rotate from "./effects/rotate"
import saturate from "./effects/saturate"
import sepia from "./effects/sepia"
import solarize from "./effects/solarize"
import swap from "./effects/swap"
import swirl from "./effects/swirl"
import threshold from "./effects/threshold"
import tile from "./effects/tile"
import vintage from "./effects/vintage"
import voronoi from "./effects/voronoi"
import warm from "./effects/warm"

export const effects: any = {}

const all = [
  { name: "grayscale", effect: grayscale },
  { name: "invert", effect: invert },
  { name: "sepia", effect: sepia },
  { name: "threshold", effect: threshold },
  { name: "posterize", effect: posterize },
  { name: "saturate", effect: saturate },
  { name: "desaturate", effect: desaturate },
  { name: "rotate", effect: rotate },
  { name: "warm", effect: warm },
  { name: "cool", effect: cool },
  { name: "vintage", effect: vintage },
  { name: "pixelate", effect: pixelate },
  { name: "edges", effect: edges },
  { name: "emboss", effect: emboss },
  { name: "paint", effect: paint },
  { name: "solarize", effect: solarize },
  { name: "duotone", effect: duotone },
  { name: "brighten", effect: brighten },
  { name: "contrast", effect: contrast },
  { name: "gamma", effect: gamma },
  { name: "exposure", effect: exposure },
  { name: "red", effect: red },
  { name: "green", effect: green },
  { name: "blue", effect: blue },
  { name: "swap", effect: swap },
  { name: "ascii", effect: ascii },
  { name: "tile", effect: tile },
  { name: "ripple", effect: ripple },
  { name: "glitch", effect: glitch },
  { name: "halftone", effect: halftone },
  { name: "kaleidoscope", effect: kaleidoscope },
  { name: "liquid", effect: liquid },
  { name: "swirl", effect: swirl },
  { name: "voronoi", effect: voronoi },
]

all.forEach(({ name, effect }, i) => {
  effects[i + 1] = effect

  const list = document.querySelector("#list")!
  const item = document.createElement("li")

  item.textContent = i + 1 + ": " + name[0].toUpperCase() + name.slice(1)
  list.appendChild(item)
})
