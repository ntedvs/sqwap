import effects from "./effects.js"

const input = document.querySelector("input")
const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")

let image

input.onchange = async () => {
  context.drawImage(await createImageBitmap(input.files[0]), 0, 0)
  image = context.getImageData(0, 0, canvas.width, canvas.height)
}

let effect = ""

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    try {
      effects[effect](image.data)
      context.putImageData(image, 0, 0)
    } catch {}

    effect = ""
    return
  }

  if (isNaN(e.key)) return
  effect += e.key
})
