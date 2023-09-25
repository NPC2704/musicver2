const storage = {
  getItem: function (key: string) {
    const items: string | null = localStorage.getItem(`${key}`)

    if (!items) return false

    return JSON.parse(items)
  },
  setItem: function (key: string, items: object | string) {
    localStorage.setItem(`${key}`, JSON.stringify(items))
  },
  remove: function (key: string) {
    localStorage.removeItem(`${key}`)
  },
}

export default storage
