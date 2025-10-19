export default (data: ImageDataArray, width: number, height: number) => {
  const output = new Uint8ClampedArray(data.length)
  output.set(data)

  const glitchIntensity = 0.1
  const channelShift = 5

  for (let y = 0; y < height; y++) {
    if (Math.random() < glitchIntensity) {
      const shift = Math.floor((Math.random() - 0.5) * 40)
      const rowStart = y * width * 4

      if (shift > 0) {
        for (let x = width - 1; x >= shift; x--) {
          const destI = rowStart + x * 4
          const srcI = rowStart + (x - shift) * 4
          output[destI] = data[srcI]
          output[destI + 1] = data[srcI + 1]
          output[destI + 2] = data[srcI + 2]
          output[destI + 3] = data[srcI + 3]
        }
      } else if (shift < 0) {
        for (let x = 0; x < width + shift; x++) {
          const destI = rowStart + x * 4
          const srcI = rowStart + (x - shift) * 4
          output[destI] = data[srcI]
          output[destI + 1] = data[srcI + 1]
          output[destI + 2] = data[srcI + 2]
          output[destI + 3] = data[srcI + 3]
        }
      }
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4

      const rSrcX = Math.max(0, Math.min(width - 1, x - channelShift))
      const bSrcX = Math.max(0, Math.min(width - 1, x + channelShift))

      const rI = (y * width + rSrcX) * 4
      const bI = (y * width + bSrcX) * 4

      output[i] = data[rI]
      output[i + 2] = data[bI + 2]
    }
  }

  for (let i = 0; i < 20; i++) {
    const x = Math.floor(Math.random() * width)
    const y = Math.floor(Math.random() * height)
    const w = Math.floor(Math.random() * 50) + 10
    const h = Math.floor(Math.random() * 20) + 5

    for (let by = 0; by < h && y + by < height; by++) {
      for (let bx = 0; bx < w && x + bx < width; bx++) {
        const idx = ((y + by) * width + (x + bx)) * 4
        const noise = Math.floor(Math.random() * 256)
        output[idx] = noise
        output[idx + 1] = noise
        output[idx + 2] = noise
      }
    }
  }

  data.set(output)
}
