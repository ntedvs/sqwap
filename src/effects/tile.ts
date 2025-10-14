export default (data: ImageDataArray, width: number, height: number) => {
  const original = new Uint8ClampedArray(data)
  const halfWidth = Math.floor(width / 2)
  const halfHeight = Math.floor(height / 2)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const sourceX = (x % halfWidth) * 2
      const sourceY = (y % halfHeight) * 2
      const sourceIndex = (sourceY * width + sourceX) * 4
      const targetIndex = (y * width + x) * 4

      data[targetIndex] = original[sourceIndex]
      data[targetIndex + 1] = original[sourceIndex + 1]
      data[targetIndex + 2] = original[sourceIndex + 2]
      data[targetIndex + 3] = original[sourceIndex + 3]
    }
  }
}
