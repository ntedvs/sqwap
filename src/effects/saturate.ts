export default (data: ImageDataArray) => {
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
    data[i] = Math.min(255, Math.max(0, avg + (data[i] - avg) * 1.5))
    data[i + 1] = Math.min(255, Math.max(0, avg + (data[i + 1] - avg) * 1.5))
    data[i + 2] = Math.min(255, Math.max(0, avg + (data[i + 2] - avg) * 1.5))
  }
}
