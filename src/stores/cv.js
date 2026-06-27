import { defineStore } from 'pinia'

const STORAGE_KEY = 'cv-generator:data'

// Estado inicial (também usado pelo "Limpar tudo")
function blankState() {
  return {
    template: 'modern',
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
  }
}

// Hidrata a partir do localStorage; faz merge com o estado em branco
// para tolerar versões antigas guardadas sem campos novos.
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return blankState()
    const saved = JSON.parse(raw)
    const base = blankState()
    return {
      ...base,
      ...saved,
      personal: { ...base.personal, ...(saved.personal || {}) },
      experience: Array.isArray(saved.experience) ? saved.experience : [],
      education: Array.isArray(saved.education) ? saved.education : [],
      skills: Array.isArray(saved.skills) ? saved.skills : [],
    }
  } catch {
    return blankState()
  }
}

// id único e estável sem depender de Date.now em loops apertados
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
      s.skills.length === 0,
  },

  actions: {
    setTemplate(name) {
      this.template = name
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

    // ---- Utilitários ----
    reset() {
      this.$patch(blankState())
    },
    loadSample() {
      this.$patch(sampleData())
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
          'Liderei a migração do dashboard principal para Vue 3, reduzindo o tempo de carregamento em 40%. Implementei um design system reutilizado por 5 equipas.',
      },
      {
        id: uid(),
        company: 'Webly',
        role: 'Junior Developer',
        startDate: '2020-06',
        endDate: '2022-02',
        current: false,
        description:
          'Desenvolvi componentes de UI e integrações com APIs REST. Colaborei na adopção de testes automatizados.',
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
  }
}
