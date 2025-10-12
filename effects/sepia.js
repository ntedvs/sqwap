export default (data) => {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    data[i] = Math.min(255, 0.393 * r + 0.769 * g + 0.189 * b)
    data[i + 1] = Math.min(255, 0.349 * r + 0.686 * g + 0.168 * b)
    data[i + 2] = Math.min(255, 0.272 * r + 0.534 * g + 0.131 * b)
  }
}
