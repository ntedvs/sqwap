import { effects } from "./collect"
import "./style.css"

const input = document.querySelector("input")!
const text = document.querySelector("p")!
const canvas = document.querySelector("canvas")!
const context = canvas.getContext("2d")!

let image: ImageData

input.onchange = async () => {
  const bitmap = await createImageBitmap(input.files![0])

  canvas.width = bitmap.width
  canvas.height = bitmap.height

  context.drawImage(bitmap, 0, 0)
  image = context.getImageData(0, 0, canvas.width, canvas.height)

  document.querySelector("label")!.hidden = true
  document.querySelector<HTMLDivElement>("#box")!.hidden = false
}

let effect = ""

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    try {
      effects[+effect as keyof typeof effects](
        image.data,
        canvas.width,
        canvas.height
      )

      context.putImageData(image, 0, 0)
    } catch {}

    effect = ""
    text.textContent = effect

    return
  }

  if (isNaN(+e.key)) return

  effect += e.key
  text.textContent = effect
})
