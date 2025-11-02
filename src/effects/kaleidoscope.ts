export default (data: ImageDataArray, width: number, height: number) => {
  const output = new Uint8ClampedArray(data.length)
  output.set(data)

  const centerX = width / 2
  const centerY = height / 2
  const segments = 8
  const segmentAngle = (Math.PI * 2) / segments

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const dx = x - centerX
      const dy = y - centerY

      let angle = Math.atan2(dy, dx)
      const radius = Math.sqrt(dx * dx + dy * dy)

      if (angle < 0) angle += Math.PI * 2

      const index = Math.floor(angle / segmentAngle)
      let local = angle - index * segmentAngle
      if (index % 2 === 1) local = segmentAngle - local

      const srcX = Math.round(centerX + radius * Math.cos(local))
      const srcY = Math.round(centerY + radius * Math.sin(local))

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
