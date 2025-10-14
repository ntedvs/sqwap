export const emboss = (data: ImageDataArray, width: number, height: number) => {
  const output = new Uint8ClampedArray(data.length)

  const kernel = [
    [-2, -1, 0],
    [-1, 1, 1],
    [0, 1, 2],
  ]

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = (y * width + x) * 4

      let r = 0,
        g = 0,
        b = 0

      for (let ky = 0; ky < 3; ky++) {
        for (let kx = 0; kx < 3; kx++) {
          const py = y + ky - 1
          const px = x + kx - 1
          const pi = (py * width + px) * 4
          const weight = kernel[ky][kx]

          r += data[pi] * weight
          g += data[pi + 1] * weight
          b += data[pi + 2] * weight
        }
      }

      output[i] = Math.min(255, Math.max(0, r + 128))
      output[i + 1] = Math.min(255, Math.max(0, g + 128))
      output[i + 2] = Math.min(255, Math.max(0, b + 128))
      output[i + 3] = data[i + 3]
    }
  }

  data.set(output)
}
