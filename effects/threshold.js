export default (data, level = 128) => {
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
    const value = avg >= level ? 255 : 0
    data[i] = data[i + 1] = data[i + 2] = value
  }
}
