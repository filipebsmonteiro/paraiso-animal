export const SessionStorage = {
  get(key: string) {
    const value: string|null = sessionStorage.getItem(key)
    return value ? JSON.parse(value) : null
  },
  set(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  remove(key: string) {
    sessionStorage.removeItem(key)
  },
  deleteAll() {
    sessionStorage.clear();
  },
}
export const LocalStorage = {
  get(key: string) {
    const value: string|null = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  },
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  remove(key: string) {
    localStorage.removeItem(key)
  },
  deleteAll() {
    localStorage.clear();
  }
}