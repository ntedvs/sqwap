export default (data) => {
  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, Math.max(0, 128 + (data[i] - 128) * 1.3))
    data[i + 1] = Math.min(255, Math.max(0, 128 + (data[i + 1] - 128) * 1.3))
    data[i + 2] = Math.min(255, Math.max(0, 128 + (data[i + 2] - 128) * 1.3))
  }
}
