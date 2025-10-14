import { ascii } from "./effects/ascii"
import { blue } from "./effects/blue"
import { brighten } from "./effects/brighten"
import { contrast } from "./effects/contrast"
import { cool } from "./effects/cool"
import { desaturate } from "./effects/desaturate"
import { duotone } from "./effects/duotone"
import { edges } from "./effects/edges"
import { emboss } from "./effects/emboss"
import { exposure } from "./effects/exposure"
import { gamma } from "./effects/gamma"
import { grayscale } from "./effects/grayscale"
import { green } from "./effects/green"
import { invert } from "./effects/invert"
import { paint } from "./effects/paint"
import { pixelate } from "./effects/pixelate"
import { posterize } from "./effects/posterize"
import { red } from "./effects/red"
import { rotate } from "./effects/rotate"
import { saturate } from "./effects/saturate"
import { sepia } from "./effects/sepia"
import { solarize } from "./effects/solarize"
import { swap } from "./effects/swap"
import { threshold } from "./effects/threshold"
import { tile } from "./effects/tile"
import { vintage } from "./effects/vintage"
import { warm } from "./effects/warm"

export const effects: any = {}

const all = [
  grayscale,
  invert,
  sepia,
  threshold,
  posterize,
  saturate,
  desaturate,
  rotate,
  warm,
  cool,
  vintage,
  pixelate,
  edges,
  emboss,
  paint,
  solarize,
  duotone,
  brighten,
  contrast,
  gamma,
  exposure,
  red,
  green,
  blue,
  swap,
  ascii,
  tile,
]

all.forEach((effect, i) => {
  effects[i + 1] = effect

  const list = document.querySelector("#list")!
  const item = document.createElement("li")

  item.textContent = i + 1 + ": " + effect.name
  list.appendChild(item)
})
