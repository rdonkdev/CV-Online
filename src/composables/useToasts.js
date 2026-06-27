import { reactive } from 'vue'

// Estado partilhado (singleton) entre todos os componentes.
const state = reactive({ items: [] })
let nextId = 0

export function useToasts() {
  function push(message, type = 'info', timeout = 3200) {
    const id = ++nextId
    state.items.push({ id, message, type })
    if (timeout) setTimeout(() => dismiss(id), timeout)
    return id
  }
  function dismiss(id) {
    const i = state.items.findIndex((t) => t.id === id)
    if (i !== -1) state.items.splice(i, 1)
  }

  return {
    toasts: state.items,
    push,
    dismiss,
    success: (m) => push(m, 'success'),
    error: (m) => push(m, 'error'),
    info: (m) => push(m, 'info'),
  }
}
