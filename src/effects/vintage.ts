export const vintage = (data: ImageDataArray) => {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    const cr = 128 + (r - 128) * 0.85
    const cg = 128 + (g - 128) * 0.85
    const cb = 128 + (b - 128) * 0.85

    const nr = cr * 0.9 + cg * 0.5 + cb * 0.2 + 20
    const ng = cr * 0.8 + cg * 0.6 + cb * 0.2 + 15
    const nb = cr * 0.6 + cg * 0.4 + cb * 0.4

    data[i] = Math.min(255, Math.max(0, nr))
    data[i + 1] = Math.min(255, Math.max(0, ng))
    data[i + 2] = Math.min(255, Math.max(0, nb))
  }
}
