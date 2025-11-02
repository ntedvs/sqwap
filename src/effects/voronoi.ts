export default (data: ImageDataArray, width: number, height: number) => {
  const numCells = 250

  const seeds: Array<{ x: number; y: number }> = []
  for (let i = 0; i < numCells; i++) {
    seeds.push({
      x: Math.random() * width,
      y: Math.random() * height,
    })
  }

  const cellData: Array<{
    r: number
    g: number
    b: number
    a: number
    count: number
  }> = Array(numCells)
    .fill(null)
    .map(() => ({ r: 0, g: 0, b: 0, a: 0, count: 0 }))

  const pixelToCell = new Uint16Array(width * height)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let minDist = Infinity
      let nearestCell = 0

      for (let s = 0; s < numCells; s++) {
        const dx = x - seeds[s].x
        const dy = y - seeds[s].y
        const dist = dx * dx + dy * dy

        if (dist < minDist) {
          minDist = dist
          nearestCell = s
        }
      }

      pixelToCell[y * width + x] = nearestCell
      const i = (y * width + x) * 4

      cellData[nearestCell].r += data[i]
      cellData[nearestCell].g += data[i + 1]
      cellData[nearestCell].b += data[i + 2]
      cellData[nearestCell].a += data[i + 3]
      cellData[nearestCell].count++
    }
  }

  for (let s = 0; s < numCells; s++) {
    const cell = cellData[s]

    if (cell.count > 0) {
      cell.r = Math.round(cell.r / cell.count)
      cell.g = Math.round(cell.g / cell.count)
      cell.b = Math.round(cell.b / cell.count)
      cell.a = Math.round(cell.a / cell.count)
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4
      const cellIndex = pixelToCell[y * width + x]
      const cell = cellData[cellIndex]

      data[i] = cell.r
      data[i + 1] = cell.g
      data[i + 2] = cell.b
      data[i + 3] = cell.a
    }
  }
}
