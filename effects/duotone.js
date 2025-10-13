export default (data) => {
  // Dark blue for shadows
  const shadowR = 25
  const shadowG = 42
  const shadowB = 86

  // Orange for highlights
  const highlightR = 255
  const highlightG = 140
  const highlightB = 50

  for (let i = 0; i < data.length; i += 4) {
    // Calculate luminance
    const lum =
      (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) / 255

    // Interpolate between shadow and highlight colors
    data[i] = Math.round(shadowR + (highlightR - shadowR) * lum)
    data[i + 1] = Math.round(shadowG + (highlightG - shadowG) * lum)
    data[i + 2] = Math.round(shadowB + (highlightB - shadowB) * lum)
  }
}
