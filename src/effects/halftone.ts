export default (data: ImageDataArray, width: number, height: number) => {
  const output = new Uint8ClampedArray(data.length)
  output.fill(255)

  const dotSize = 8
  const dotRadius = dotSize / 2

  for (let y = 0; y < height; y += dotSize) {
    for (let x = 0; x < width; x += dotSize) {
      let r = 0,
        g = 0,
        b = 0,
        count = 0

      for (let by = 0; by < dotSize && y + by < height; by++) {
        for (let bx = 0; bx < dotSize && x + bx < width; bx++) {
          const i = ((y + by) * width + (x + bx)) * 4
          r += data[i]
          g += data[i + 1]
          b += data[i + 2]
          count++
        }
      }

      r /= count
      g /= count
      b /= count

      const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255
      const radius = brightness * dotRadius

      const centerX = x + dotRadius
      const centerY = y + dotRadius

      for (let by = 0; by < dotSize && y + by < height; by++) {
        for (let bx = 0; bx < dotSize && x + bx < width; bx++) {
          const px = x + bx
          const py = y + by
          const dx = px + 0.5 - centerX
          const dy = py + 0.5 - centerY
          const distance = Math.sqrt(dx * dx + dy * dy)

          const i = (py * width + px) * 4

          if (distance <= radius) {
            output[i] = 0
            output[i + 1] = 0
            output[i + 2] = 0
          } else {
            output[i] = 255
            output[i + 1] = 255
            output[i + 2] = 255
          }

          output[i + 3] = data[i + 3]
        }
      }
    }
  }

  data.set(output)
}
