export const pixelate = (
  data: ImageDataArray,
  width: number,
  height: number
) => {
  const blockSize = 8

  for (let y = 0; y < height; y += blockSize) {
    for (let x = 0; x < width; x += blockSize) {
      let r = 0,
        g = 0,
        b = 0,
        a = 0,
        count = 0

      for (let by = 0; by < blockSize && y + by < height; by++) {
        for (let bx = 0; bx < blockSize && x + bx < width; bx++) {
          const i = ((y + by) * width + (x + bx)) * 4
          r += data[i]
          g += data[i + 1]
          b += data[i + 2]
          a += data[i + 3]
          count++
        }
      }

      r = Math.round(r / count)
      g = Math.round(g / count)
      b = Math.round(b / count)
      a = Math.round(a / count)

      for (let by = 0; by < blockSize && y + by < height; by++) {
        for (let bx = 0; bx < blockSize && x + bx < width; bx++) {
          const i = ((y + by) * width + (x + bx)) * 4
          data[i] = r
          data[i + 1] = g
          data[i + 2] = b
          data[i + 3] = a
        }
      }
    }
  }
}
