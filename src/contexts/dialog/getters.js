export function frameList() {
  const list = []
  for (const key in this.collection) {
    const value = this.collection[key]
    if (value) {
      list.push(value)
    }
  }
  return list.sort((a, b) => a.zIndex - b.zIndex)
}