export const gamma = (data: ImageDataArray) => {
  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, Math.pow(data[i] / 255, 1 / 1.5) * 255)
    data[i + 1] = Math.min(255, Math.pow(data[i + 1] / 255, 1 / 1.5) * 255)
    data[i + 2] = Math.min(255, Math.pow(data[i + 2] / 255, 1 / 1.5) * 255)
  }
}
