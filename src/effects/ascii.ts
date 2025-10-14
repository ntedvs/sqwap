export const ascii = (data: ImageDataArray, width: number, height: number) => {
  const chars = " .:-=+*#%@"
  const size = 8

  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")!

  canvas.width = width
  canvas.height = height

  ctx.fillStyle = "#000000"
  ctx.fillRect(0, 0, width, height)
  ctx.fillStyle = "#ffffff"
  ctx.font = `${size}px monospace`

  for (let y = 0; y < height; y += size) {
    for (let x = 0; x < width; x += size) {
      let totalBrightness = 0
      let count = 0

      for (let by = 0; by < size && y + by < height; by++) {
        for (let bx = 0; bx < size && x + bx < width; bx++) {
          const i = ((y + by) * width + (x + bx)) * 4
          const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3
          totalBrightness += brightness
          count++
        }
      }

      const average = totalBrightness / count
      const index = Math.floor((average / 255) * (chars.length - 1))
      const char = chars[index]

      ctx.fillText(char, x, y + size)
    }
  }

  const imageData = ctx.getImageData(0, 0, width, height)
  data.set(imageData.data)
}
