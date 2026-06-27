// @vitest-environment jsdom
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SectionToggle from './SectionToggle.vue'

describe('SectionToggle', () => {
  it('reflete o estado e emite a alteração', async () => {
    const w = mount(SectionToggle, { props: { modelValue: true } })
    expect(w.text()).toContain('Incluída no CV')

    await w.find('button[role="switch"]').trigger('click')
    expect(w.emitted()['update:modelValue'][0]).toEqual([false])
  })

  it('mostra "Oculta" quando desligada', () => {
    const w = mount(SectionToggle, { props: { modelValue: false } })
    expect(w.text()).toContain('Oculta no CV')
    expect(w.find('button[role="switch"]').attributes('aria-checked')).toBe('false')
  })
})
