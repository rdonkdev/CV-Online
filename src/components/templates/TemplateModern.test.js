// @vitest-environment jsdom
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, it, expect } from 'vitest'
import { useCvStore } from '@/stores/cv'
import TemplateModern from './TemplateModern.vue'

describe('TemplateModern', () => {
  let pinia
  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
  })
  const mountIt = () => mount(TemplateModern, { global: { plugins: [pinia] } })

  it('renderiza os dados do store e os bullets', () => {
    const cv = useCvStore()
    cv.personal.name = 'Ana Marques'
    cv.personal.title = 'Frontend Developer'
    cv.addExperience()
    cv.experience[0].role = 'Dev'
    cv.experience[0].description = 'Primeiro tópico\nSegundo tópico'

    const w = mountIt()
    expect(w.text()).toContain('Ana Marques')
    expect(w.text()).toContain('Dev')
    const bullets = w.findAll('.cv-bullets li')
    expect(bullets).toHaveLength(2)
    expect(bullets[0].text()).toBe('Primeiro tópico')
  })

  it('respeita a visibilidade de secções', async () => {
    const cv = useCvStore()
    cv.addExperience()
    cv.experience[0].role = 'Dev'
    cv.experience[0].description = 'algo'

    const w = mountIt()
    expect(w.text()).toContain('Experiência')

    cv.sections.experience = false
    await w.vm.$nextTick()
    expect(w.text()).not.toContain('Experiência')
  })
})
