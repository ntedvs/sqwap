import effects from "./effects.js"

const input = document.querySelector("input")
const canvas = document.querySelector("canvas")
const text = document.querySelector("p")
const context = canvas.getContext("2d")

let image

input.onchange = async () => {
  const bitmap = await createImageBitmap(input.files[0])

  canvas.width = bitmap.width
  canvas.height = bitmap.height

  context.drawImage(bitmap, 0, 0)
  image = context.getImageData(0, 0, canvas.width, canvas.height)

  input.hidden = true
  canvas.hidden = false
}

let effect = ""

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    try {
      effects[effect](image.data, canvas.width, canvas.height)
      context.putImageData(image, 0, 0)
    } catch {}

    effect = ""
    text.textContent = effect

    return
  }

  if (isNaN(e.key)) return

  effect += e.key
  text.textContent = effect
})
