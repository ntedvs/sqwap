export default (data: ImageDataArray) => {
  const level = 4

  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
    const value = avg >= level ? 255 : 0
    data[i] = data[i + 1] = data[i + 2] = value
  }
}
