export default (data: ImageDataArray, width: number, height: number) => {
  const output = new Uint8ClampedArray(data.length)
  output.set(data)

  const intensity = 15

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4

      const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3

      const rightI = (y * width + Math.min(x + 1, width - 1)) * 4
      const downI = (Math.min(y + 1, height - 1) * width + x) * 4

      const rightB = (data[rightI] + data[rightI + 1] + data[rightI + 2]) / 3
      const downB = (data[downI] + data[downI + 1] + data[downI + 2]) / 3

      const offsetX = ((brightness - rightB) / 255) * intensity
      const offsetY = ((brightness - downB) / 255) * intensity

      const srcX = Math.round(x + offsetX)
      const srcY = Math.round(y + offsetY)

      if (srcX >= 0 && srcX < width && srcY >= 0 && srcY < height) {
        const destI = (y * width + x) * 4
        const srcI = (srcY * width + srcX) * 4

        output[destI] = data[srcI]
        output[destI + 1] = data[srcI + 1]
        output[destI + 2] = data[srcI + 2]
        output[destI + 3] = data[srcI + 3]
      }
    }
  }

  data.set(output)
}
