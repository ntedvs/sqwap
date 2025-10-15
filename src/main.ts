import { effects } from "./collect"
import "./style.css"

const grab = (id: string) => document.querySelector("#" + id)!

const before = grab("before") as HTMLDivElement
const after = grab("after") as HTMLDivElement

const canvas = grab("canvas") as HTMLCanvasElement
const context = canvas.getContext("2d")!

const input = grab("file") as HTMLInputElement

const video = grab("video") as HTMLVideoElement
const start = grab("start") as HTMLButtonElement
const stop = grab("stop") as HTMLButtonElement
const stream = grab("stream") as HTMLDivElement

const preview = grab("preview") as HTMLParagraphElement

let image: ImageData
const undo: ImageData[] = []
const redo: ImageData[] = []

const move = (source: CanvasImageSource, width: number, height: number) => {
  canvas.width = width
  canvas.height = height

  context.drawImage(source, 0, 0)
  image = context.getImageData(0, 0, width, height)

  undo.length = 0
  redo.length = 0

  before.hidden = true
  after.hidden = false
}

input.onchange = async () => {
  const bitmap = await createImageBitmap(input.files![0])
  move(bitmap, bitmap.width, bitmap.height)
}

start.addEventListener("click", async () => {
  video.srcObject = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: { ideal: "user" } },
    audio: false,
  })

  video.play()

  stream.hidden = false
})

stop.addEventListener("click", () => {
  const { videoWidth: width, videoHeight: height } = video
  move(video, width, height)
})

let effect = ""

document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase()

  if (key === "enter") {
    try {
      undo.push(structuredClone(image))
      redo.length = 0

      effects[+effect as keyof typeof effects](
        image.data,
        canvas.width,
        canvas.height
      )

      context.putImageData(image, 0, 0)
    } catch {}

    effect = ""
    preview.textContent = effect

    return
  }

  if (key === "z" && (e.ctrlKey || e.metaKey)) {
    e.preventDefault()

    if (undo.length === 0) return

    redo.push(structuredClone(image))
    image = undo.pop()!
    context.putImageData(image, 0, 0)

    return
  }

  if (key === "y" && (e.ctrlKey || e.metaKey)) {
    e.preventDefault()

    if (redo.length === 0) return

    undo.push(structuredClone(image))
    image = redo.pop()!
    context.putImageData(image, 0, 0)

    return
  }

  if (isNaN(+key)) return

  effect += key
  preview.textContent = effect
})
