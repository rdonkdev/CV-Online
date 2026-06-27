// @vitest-environment jsdom
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, it, expect } from 'vitest'
import FormWizard from './FormWizard.vue'

describe('FormWizard', () => {
  let pinia
  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
  })
  const mountIt = () => mount(FormWizard, { global: { plugins: [pinia] } })
  const byText = (w, text) => w.findAll('button').find((b) => b.text().includes(text))

  it('mostra o primeiro passo', () => {
    const w = mountIt()
    expect(w.text()).toContain('Dados pessoais')
    expect(w.text()).toContain('Passo 1 de 7')
  })

  it('avança para o passo seguinte', async () => {
    const w = mountIt()
    await byText(w, 'Seguinte').trigger('click')
    expect(w.text()).toContain('Experiência profissional')
    expect(w.text()).toContain('Passo 2 de 7')
  })

  it('recua para o passo anterior', async () => {
    const w = mountIt()
    await byText(w, 'Seguinte').trigger('click')
    await byText(w, 'Anterior').trigger('click')
    expect(w.text()).toContain('Passo 1 de 7')
  })
})
