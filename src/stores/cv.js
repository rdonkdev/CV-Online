import { defineStore } from 'pinia'

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

// id único e estável
let seq = 0
function uid() {
  seq += 1
  return `${seq}-${Math.random().toString(36).slice(2, 8)}`
}

export const useCvStore = defineStore('cv', {
  // Estado inicia em branco; o store de perfis carrega o perfil ativo.
  state: () => blankState(),

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

    // Percentagem de preenchimento (heurística ponderada por checklist).
    completeness: (s) => {
      const checks = [
        !!s.personal.name,
        !!s.personal.title,
        !!s.personal.email,
        !!s.personal.summary,
        s.experience.some((e) => e.role && e.description),
        s.education.length > 0,
        s.skills.length >= 3,
        s.languages.length > 0 || s.certifications.length > 0 || s.projects.length > 0,
      ]
      return Math.round((checks.filter(Boolean).length / checks.length) * 100)
    },
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
      name: 'Aida Mucavele',
      title: 'Gestora de Marketing',
      email: 'aida.mucavele@email.com',
      phone: '+258 84 123 4567',
      location: 'Maputo, Moçambique',
      linkedin: 'linkedin.com/in/aidamucavele',
      website: 'aidamucavele.com',
      summary:
        'Gestora de marketing com 4 anos de experiência em campanhas digitais e gestão de marca. Orientada a resultados e ao crescimento, gosto de transformar dados em decisões e ideias em campanhas com impacto.',
    },
    experience: [
      {
        id: uid(),
        company: 'Vodacom Moçambique',
        role: 'Gestora de Marketing',
        startDate: '2022-03',
        endDate: '',
        current: true,
        description:
          'Liderei campanhas digitais que aumentaram a captação de clientes em 35%.\nGeri o orçamento anual de marketing e uma equipa de 5 pessoas.\nImplementei dashboards de métricas que melhoraram a tomada de decisão.',
      },
      {
        id: uid(),
        company: 'Cervejas de Moçambique (CDM)',
        role: 'Coordenadora de Marketing',
        startDate: '2020-06',
        endDate: '2022-02',
        current: false,
        description:
          'Coordenei o lançamento de 2 novos produtos no mercado nacional.\nGeri parcerias com agências e fornecedores, otimizando custos em 15%.',
      },
    ],
    education: [
      {
        id: uid(),
        institution: 'Universidade Eduardo Mondlane',
        degree: 'Licenciatura',
        field: 'Gestão de Marketing',
        startDate: '2017-09',
        endDate: '2020-07',
      },
    ],
    skills: [
      { id: uid(), name: 'Marketing Digital', level: 5 },
      { id: uid(), name: 'Gestão de Redes Sociais', level: 5 },
      { id: uid(), name: 'Google Analytics', level: 4 },
      { id: uid(), name: 'Copywriting', level: 4 },
      { id: uid(), name: 'Gestão de Campanhas', level: 4 },
    ],
    languages: [
      { id: uid(), name: 'Português', level: 'Nativo' },
      { id: uid(), name: 'Changana', level: 'Nativo' },
      { id: uid(), name: 'Inglês', level: 'Avançado' },
    ],
    certifications: [
      {
        id: uid(),
        name: 'Fundamentals of Digital Marketing',
        issuer: 'Google',
        year: '2023',
      },
    ],
    projects: [
      {
        id: uid(),
        name: 'Campanha #OrgulhoMoçambique',
        link: 'aidamucavele.com/casos',
        description:
          'Campanha digital multicanal de marca.\nAumentou o engagement em 60% e alcançou 1,2M de pessoas.',
      },
    ],
  }
}
