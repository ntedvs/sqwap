export const blue = (data: ImageDataArray) => {
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 0
    data[i + 1] = 0
  }
}
