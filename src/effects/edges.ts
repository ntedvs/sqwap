export const edges = (data: ImageDataArray, width: number, height: number) => {
  const output = new Uint8ClampedArray(data.length)

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = (y * width + x) * 4

      let gx = 0,
        gy = 0

      for (let c = 0; c < 3; c++) {
        const tl = data[((y - 1) * width + (x - 1)) * 4 + c]
        const tm = data[((y - 1) * width + x) * 4 + c]
        const tr = data[((y - 1) * width + (x + 1)) * 4 + c]
        const ml = data[(y * width + (x - 1)) * 4 + c]
        const mr = data[(y * width + (x + 1)) * 4 + c]
        const bl = data[((y + 1) * width + (x - 1)) * 4 + c]
        const bm = data[((y + 1) * width + x) * 4 + c]
        const br = data[((y + 1) * width + (x + 1)) * 4 + c]

        const gradX = -tl - 2 * ml - bl + tr + 2 * mr + br
        const gradY = -tl - 2 * tm - tr + bl + 2 * bm + br

        gx += gradX * gradX
        gy += gradY * gradY
      }

      const magnitude = Math.min(255, Math.sqrt(gx + gy))

      output[i] = magnitude
      output[i + 1] = magnitude
      output[i + 2] = magnitude
      output[i + 3] = data[i + 3]
    }
  }

  data.set(output)
}
