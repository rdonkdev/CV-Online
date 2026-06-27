import { ref, watch } from 'vue'

/**
 * Histórico de undo/redo para o estado do CV.
 *
 * Observa o estado (com debounce). Cada alteração do utilizador empilha um
 * snapshot; undo/redo reaplicam snapshots sem voltar a gravar como nova entrada
 * (via flag `applying`). `onCommit` é chamado sempre que o estado estabiliza —
 * usado para persistir e atualizar o indicador "Guardado".
 */
export function useHistory(cv, { onCommit, debounce = 400, limit = 100 } = {}) {
  const canUndo = ref(false)
  const canRedo = ref(false)

  const past = []
  const future = []
  let last = snapshot()
  let applying = false
  let timer = null

  function snapshot() {
    return JSON.stringify(cv.$state)
  }
  function sync() {
    canUndo.value = past.length > 0
    canRedo.value = future.length > 0
  }

  watch(
    () => cv.$state,
    () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        const now = snapshot()
        if (applying) {
          applying = false
          last = now
          if (onCommit) onCommit()
          return
        }
        if (now === last) return
        past.push(last)
        if (past.length > limit) past.shift()
        future.length = 0
        last = now
        sync()
        if (onCommit) onCommit()
      }, debounce)
    },
    { deep: true }
  )

  function apply(snap) {
    applying = true
    cv.loadFrom(JSON.parse(snap))
  }

  function undo() {
    if (!past.length) return
    future.push(last)
    apply(past.pop())
    sync()
  }
  function redo() {
    if (!future.length) return
    past.push(last)
    apply(future.pop())
    sync()
  }
  // Esquece o histórico (ex.: ao trocar de perfil) e fixa o estado atual.
  function reset() {
    past.length = 0
    future.length = 0
    last = snapshot()
    sync()
  }

  return { undo, redo, canUndo, canRedo, reset }
}
