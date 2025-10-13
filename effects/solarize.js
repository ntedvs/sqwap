export default (data) => {
  const threshold = 128

  for (let i = 0; i < data.length; i += 4) {
    // Reverse tones above threshold
    if (data[i] > threshold) {
      data[i] = 255 - data[i]
    }
    if (data[i + 1] > threshold) {
      data[i + 1] = 255 - data[i + 1]
    }
    if (data[i + 2] > threshold) {
      data[i + 2] = 255 - data[i + 2]
    }
  }
}
