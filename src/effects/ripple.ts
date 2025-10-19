export default (data: ImageDataArray, width: number, height: number) => {
  const output = new Uint8ClampedArray(data.length)
  output.set(data)

  const amplitude = 10
  const frequency = 0.05
  const centerX = width / 2
  const centerY = height / 2

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const dx = x - centerX
      const dy = y - centerY
      const distance = Math.sqrt(dx * dx + dy * dy)

      const offsetX = Math.sin(distance * frequency) * amplitude
      const offsetY = Math.cos(distance * frequency) * amplitude

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
