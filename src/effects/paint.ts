export default (data: ImageDataArray, width: number, height: number) => {
  const output = new Uint8ClampedArray(data.length)
  const radius = 5

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4

      const intensityBins = new Array(256).fill(0)
      const rBins = new Array(256).fill(0)
      const gBins = new Array(256).fill(0)
      const bBins = new Array(256).fill(0)

      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const ny = y + dy
          const nx = x + dx

          if (ny >= 0 && ny < height && nx >= 0 && nx < width) {
            const ni = (ny * width + nx) * 4
            const r = data[ni]
            const g = data[ni + 1]
            const b = data[ni + 2]

            const intensity = Math.round((r + g + b) / 3)

            intensityBins[intensity]++
            rBins[intensity] += r
            gBins[intensity] += g
            bBins[intensity] += b
          }
        }
      }

      let maxCount = 0
      let maxIntensity = 0

      for (let j = 0; j < 256; j++) {
        if (intensityBins[j] > maxCount) {
          maxCount = intensityBins[j]
          maxIntensity = j
        }
      }

      output[i] = Math.round(rBins[maxIntensity] / maxCount)
      output[i + 1] = Math.round(gBins[maxIntensity] / maxCount)
      output[i + 2] = Math.round(bBins[maxIntensity] / maxCount)
      output[i + 3] = data[i + 3]
    }
  }

  data.set(output)
}
