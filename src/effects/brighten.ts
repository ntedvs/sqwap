export default (data: ImageDataArray) => {
  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, data[i] + 40)
    data[i + 1] = Math.min(255, data[i + 1] + 40)
    data[i + 2] = Math.min(255, data[i + 2] + 40)
  }
}
