export default (data: ImageDataArray) => {
  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, Math.max(0, data[i] + 30))
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + 10))
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] - 20))
  }
}
