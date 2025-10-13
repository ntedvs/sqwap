export default (data) => {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    data[i] = Math.min(255, Math.max(0, 0.213 * r + 0.715 * g + 0.072 * b + 0.787 * r - 0.715 * g - 0.072 * b))
    data[i + 1] = Math.min(255, Math.max(0, 0.213 * r + 0.715 * g + 0.072 * b - 0.213 * r + 0.285 * g + 0.928 * b))
    data[i + 2] = Math.min(255, Math.max(0, 0.213 * r + 0.715 * g + 0.072 * b - 0.213 * r - 0.715 * g + 1.072 * b))
  }
}
