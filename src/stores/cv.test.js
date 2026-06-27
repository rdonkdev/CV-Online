import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, describe, it, expect } from 'vitest'
import { useCvStore } from './cv'

describe('cv store', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('começa vazio', () => {
    const cv = useCvStore()
    expect(cv.isEmpty).toBe(true)
  })

  it('adiciona e remove experiência', () => {
    const cv = useCvStore()
    cv.addExperience()
    expect(cv.experience).toHaveLength(1)
    cv.removeExperience(cv.experience[0].id)
    expect(cv.experience).toHaveLength(0)
  })

  it('move() reordena itens', () => {
    const cv = useCvStore()
    cv.addSkill()
    cv.addSkill()
    cv.skills[0].name = 'A'
    cv.skills[1].name = 'B'
    cv.move('skills', cv.skills[0].id, 1)
    expect(cv.skills.map((s) => s.name)).toEqual(['B', 'A'])
  })

  it('move() ignora movimentos fora dos limites', () => {
    const cv = useCvStore()
    cv.addSkill()
    cv.move('skills', cv.skills[0].id, -1) // já no topo, não deve falhar
    expect(cv.skills).toHaveLength(1)
  })

  it('loadFrom() normaliza tipos inválidos e funde defaults', () => {
    const cv = useCvStore()
    cv.loadFrom({ personal: { name: 'X' }, skills: 'isto-não-é-array' })
    expect(cv.personal.name).toBe('X')
    expect(Array.isArray(cv.skills)).toBe(true)
    expect(cv.skills).toHaveLength(0)
    expect(cv.accent).toBe('#2563eb')
  })

  it('secções estão visíveis por defeito e merge preserva defaults', () => {
    const cv = useCvStore()
    expect(cv.sections.experience).toBe(true)
    expect(cv.sections.projects).toBe(true)
    cv.loadFrom({ sections: { experience: false } })
    expect(cv.sections.experience).toBe(false) // valor importado
    expect(cv.sections.skills).toBe(true) // default preservado
  })

  it('loadSample() preenche todas as secções', () => {
    const cv = useCvStore()
    cv.loadSample()
    expect(cv.isEmpty).toBe(false)
    expect(cv.languages.length).toBeGreaterThan(0)
    expect(cv.certifications.length).toBeGreaterThan(0)
    expect(cv.projects.length).toBeGreaterThan(0)
  })

  it('reset() volta ao estado vazio', () => {
    const cv = useCvStore()
    cv.loadSample()
    cv.reset()
    expect(cv.isEmpty).toBe(true)
  })
})
