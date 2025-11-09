export default (data: ImageDataArray, width: number, height: number) => {
  const output = new Uint8ClampedArray(data.length)
  output.set(data)

  const centerX = width / 2
  const centerY = height / 2
  const maxRadius = Math.sqrt(centerX * centerX + centerY * centerY)
  const strength = 1.5

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const dx = x - centerX
      const dy = y - centerY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const angle = Math.atan2(dy, dx)

      const amount = (maxRadius - distance) / maxRadius
      const twist = amount * strength

      const srcX = Math.round(centerX + distance * Math.cos(angle + twist))
      const srcY = Math.round(centerY + distance * Math.sin(angle + twist))

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
