// @vitest-environment jsdom
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ItemActions from './ItemActions.vue'

describe('ItemActions', () => {
  it('emite up, down e remove ao clicar', async () => {
    const w = mount(ItemActions, { props: { canUp: true, canDown: true } })
    const btns = w.findAll('button')
    await btns[0].trigger('click')
    await btns[1].trigger('click')
    await btns[2].trigger('click')
    expect(w.emitted().up).toBeTruthy()
    expect(w.emitted().down).toBeTruthy()
    expect(w.emitted().remove).toBeTruthy()
  })

  it('desativa as setas quando está nos limites', () => {
    const w = mount(ItemActions, { props: { canUp: false, canDown: false } })
    const btns = w.findAll('button')
    expect(btns[0].attributes('disabled')).toBeDefined()
    expect(btns[1].attributes('disabled')).toBeDefined()
  })
})
