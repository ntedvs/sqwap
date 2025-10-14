export default (data: ImageDataArray) => {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    data[i] = g
    data[i + 1] = b
    data[i + 2] = r
  }
}
