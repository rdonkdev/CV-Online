import { defineStore } from 'pinia'
import { useCvStore } from './cv'

const PROFILES_KEY = 'cv-generator:profiles'
const LEGACY_KEY = 'cv-generator:data' // formato antigo (1 só CV)

let seq = 0
function pid() {
  seq += 1
  return `p${seq}-${Math.random().toString(36).slice(2, 8)}`
}

// Lê os perfis do localStorage; migra o formato antigo (1 CV) se existir.
function loadProfiles() {
  try {
    const raw = localStorage.getItem(PROFILES_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed && Array.isArray(parsed.profiles) && parsed.profiles.length) {
        const activeId = parsed.profiles.some((p) => p.id === parsed.activeId)
          ? parsed.activeId
          : parsed.profiles[0].id
        return { activeId, profiles: parsed.profiles }
      }
    }
    const legacy = localStorage.getItem(LEGACY_KEY)
    if (legacy) {
      const id = pid()
      return { activeId: id, profiles: [{ id, name: 'O meu CV', data: JSON.parse(legacy) }] }
    }
  } catch {
    /* ignora e cai no default */
  }
  const id = pid()
  return { activeId: id, profiles: [{ id, name: 'O meu CV', data: null }] }
}

export const useProfilesStore = defineStore('profiles', {
  state: () => loadProfiles(),

  getters: {
    active: (s) => s.profiles.find((p) => p.id === s.activeId) || s.profiles[0],
    activeName() {
      return this.active?.name || ''
    },
  },

  actions: {
    persist() {
      try {
        localStorage.setItem(
          PROFILES_KEY,
          JSON.stringify({ activeId: this.activeId, profiles: this.profiles })
        )
      } catch {
        /* localStorage indisponível — ignora */
      }
    },

    // Copia o estado atual do CV para o perfil ativo e grava.
    saveActive() {
      const cv = useCvStore()
      const active = this.active
      if (active) active.data = JSON.parse(JSON.stringify(cv.$state))
      this.persist()
    },

    // Chamado no arranque da app: carrega o perfil ativo no store do CV.
    init() {
      const target = this.active
      if (target) {
        this.activeId = target.id
        useCvStore().loadFrom(target.data)
      }
    },

    switchTo(id) {
      if (id === this.activeId) return
      this.saveActive()
      const target = this.profiles.find((p) => p.id === id)
      if (!target) return
      this.activeId = id
      useCvStore().loadFrom(target.data)
      this.persist()
    },

    create(name = 'Novo CV') {
      this.saveActive()
      const id = pid()
      this.profiles.push({ id, name, data: null })
      this.activeId = id
      useCvStore().reset()
      this.persist()
    },

    duplicate() {
      this.saveActive()
      const active = this.active
      const id = pid()
      const data = active?.data ? JSON.parse(JSON.stringify(active.data)) : null
      this.profiles.push({ id, name: `${active?.name || 'CV'} (cópia)`, data })
      this.activeId = id
      useCvStore().loadFrom(data)
      this.persist()
    },

    rename(id, name) {
      const p = this.profiles.find((x) => x.id === id)
      if (p) p.name = name.trim() || p.name
      this.persist()
    },

    remove(id) {
      const idx = this.profiles.findIndex((p) => p.id === id)
      if (idx === -1) return
      this.profiles.splice(idx, 1)
      if (!this.profiles.length) {
        const nid = pid()
        this.profiles.push({ id: nid, name: 'O meu CV', data: null })
        this.activeId = nid
        useCvStore().reset()
      } else if (this.activeId === id) {
        this.activeId = this.profiles[0].id
        useCvStore().loadFrom(this.profiles[0].data)
      }
      this.persist()
    },
  },
})
