import { defineStore } from 'pinia'

const STORAGE_KEY = 'cv-generator:data'
const DEFAULT_ACCENT = '#2563eb' // blue-600

// Estado inicial (também usado pelo "Limpar tudo")
function blankState() {
  return {
    template: 'modern',
    accent: DEFAULT_ACCENT,
    // Visibilidade de cada secção no CV (não apaga dados, só esconde no output)
    sections: {
      summary: true,
      experience: true,
      education: true,
      skills: true,
      languages: true,
      certifications: true,
      projects: true,
    },
    personal: {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: '',
      summary: '',
    },
    experience: [],
    education: [],
    skills: [],
    languages: [],
    certifications: [],
    projects: [],
  }
}

// Normaliza qualquer objeto guardado/importado, fazendo merge com o estado em
// branco para tolerar versões antigas sem campos novos. Usado na hidratação
// (localStorage) e no import de JSON.
function mergeState(saved) {
  const base = blankState()
  if (!saved || typeof saved !== 'object') return base
  const arr = (v) => (Array.isArray(v) ? v : [])
  return {
    ...base,
    ...saved,
    accent: typeof saved.accent === 'string' ? saved.accent : base.accent,
    sections: { ...base.sections, ...(saved.sections || {}) },
    personal: { ...base.personal, ...(saved.personal || {}) },
    experience: arr(saved.experience),
    education: arr(saved.education),
    skills: arr(saved.skills),
    languages: arr(saved.languages),
    certifications: arr(saved.certifications),
    projects: arr(saved.projects),
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? mergeState(JSON.parse(raw)) : blankState()
  } catch {
    return blankState()
  }
}

// id único e estável
let seq = 0
function uid() {
  seq += 1
  return `${seq}-${Math.random().toString(36).slice(2, 8)}`
}

export const useCvStore = defineStore('cv', {
  state: () => loadState(),

  getters: {
    isEmpty: (s) =>
      !s.personal.name &&
      !s.personal.summary &&
      s.experience.length === 0 &&
      s.education.length === 0 &&
      s.skills.length === 0 &&
      s.languages.length === 0 &&
      s.certifications.length === 0 &&
      s.projects.length === 0,
  },

  actions: {
    setTemplate(name) {
      this.template = name
    },
    setAccent(color) {
      this.accent = color
    },

    // ---- Experiência ----
    addExperience() {
      this.experience.push({
        id: uid(),
        company: '',
        role: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
      })
    },
    removeExperience(id) {
      this.experience = this.experience.filter((e) => e.id !== id)
    },

    // ---- Educação ----
    addEducation() {
      this.education.push({
        id: uid(),
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
      })
    },
    removeEducation(id) {
      this.education = this.education.filter((e) => e.id !== id)
    },

    // ---- Skills ----
    addSkill() {
      this.skills.push({ id: uid(), name: '', level: 3 })
    },
    removeSkill(id) {
      this.skills = this.skills.filter((s) => s.id !== id)
    },

    // ---- Idiomas ----
    addLanguage() {
      this.languages.push({ id: uid(), name: '', level: 'Intermédio' })
    },
    removeLanguage(id) {
      this.languages = this.languages.filter((l) => l.id !== id)
    },

    // ---- Certificações ----
    addCertification() {
      this.certifications.push({ id: uid(), name: '', issuer: '', year: '' })
    },
    removeCertification(id) {
      this.certifications = this.certifications.filter((c) => c.id !== id)
    },

    // ---- Projetos ----
    addProject() {
      this.projects.push({ id: uid(), name: '', link: '', description: '' })
    },
    removeProject(id) {
      this.projects = this.projects.filter((p) => p.id !== id)
    },

    // ---- Reordenar (genérico) ----
    // collection: nome da array no state; dir: -1 (cima) ou +1 (baixo)
    move(collection, id, dir) {
      const arr = this[collection]
      if (!Array.isArray(arr)) return
      const i = arr.findIndex((x) => x.id === id)
      const j = i + dir
      if (i < 0 || j < 0 || j >= arr.length) return
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    },

    // ---- Utilitários ----
    reset() {
      this.$patch(blankState())
    },
    loadSample() {
      this.$patch(sampleData())
    },
    loadFrom(saved) {
      this.$patch(mergeState(saved))
    },
    persist() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.$state))
      } catch {
        /* localStorage cheio ou indisponível — ignora silenciosamente */
      }
    },
  },
})

// Dados de exemplo para o utilizador ver o resultado num clique
function sampleData() {
  return {
    template: 'modern',
    accent: DEFAULT_ACCENT,
    sections: {
      summary: true,
      experience: true,
      education: true,
      skills: true,
      languages: true,
      certifications: true,
      projects: true,
    },
    personal: {
      name: 'Ana Marques',
      title: 'Frontend Developer',
      email: 'ana.marques@email.com',
      phone: '+351 912 345 678',
      location: 'Lisboa, Portugal',
      linkedin: 'linkedin.com/in/anamarques',
      website: 'anamarques.dev',
      summary:
        'Developer frontend com 4 anos de experiência em Vue e React, focada em interfaces acessíveis e performance. Gosto de transformar problemas complexos em produtos simples de usar.',
    },
    experience: [
      {
        id: uid(),
        company: 'TechNova',
        role: 'Frontend Developer',
        startDate: '2022-03',
        endDate: '',
        current: true,
        description:
          'Liderei a migração do dashboard principal para Vue 3, reduzindo o tempo de carregamento em 40%.\nImplementei um design system reutilizado por 5 equipas.\nMentorei 2 developers júnior em boas práticas de frontend.',
      },
      {
        id: uid(),
        company: 'Webly',
        role: 'Junior Developer',
        startDate: '2020-06',
        endDate: '2022-02',
        current: false,
        description:
          'Desenvolvi componentes de UI reutilizáveis e integrações com APIs REST.\nColaborei na adopção de testes automatizados no time.',
      },
    ],
    education: [
      {
        id: uid(),
        institution: 'Universidade de Lisboa',
        degree: 'Licenciatura',
        field: 'Engenharia Informática',
        startDate: '2017-09',
        endDate: '2020-07',
      },
    ],
    skills: [
      { id: uid(), name: 'Vue 3', level: 5 },
      { id: uid(), name: 'JavaScript', level: 5 },
      { id: uid(), name: 'TypeScript', level: 4 },
      { id: uid(), name: 'Tailwind CSS', level: 4 },
      { id: uid(), name: 'Node.js', level: 3 },
    ],
    languages: [
      { id: uid(), name: 'Português', level: 'Nativo' },
      { id: uid(), name: 'Inglês', level: 'Avançado' },
      { id: uid(), name: 'Espanhol', level: 'Intermédio' },
    ],
    certifications: [
      { id: uid(), name: 'Professional Scrum Master I', issuer: 'Scrum.org', year: '2023' },
    ],
    projects: [
      {
        id: uid(),
        name: 'Gerador de CV',
        link: 'github.com/anamarques/cv',
        description: 'App Vue 3 para criar CVs com export para PDF e múltiplos templates.',
      },
    ],
  }
}
