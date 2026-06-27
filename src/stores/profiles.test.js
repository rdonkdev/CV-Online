import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, describe, it, expect } from 'vitest'
import { useProfilesStore } from './profiles'
import { useCvStore } from './cv'

describe('profiles store', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('começa com um perfil ativo', () => {
    const p = useProfilesStore()
    expect(p.profiles).toHaveLength(1)
    expect(p.activeId).toBe(p.profiles[0].id)
  })

  it('create adiciona e ativa um novo perfil em branco', () => {
    const cv = useCvStore()
    const p = useProfilesStore()
    cv.personal.name = 'Ana'
    p.create('Segundo CV')
    expect(p.profiles).toHaveLength(2)
    expect(p.activeName).toBe('Segundo CV')
    expect(useCvStore().personal.name).toBe('') // novo perfil em branco
  })

  it('switchTo preserva e recarrega os dados de cada perfil', () => {
    const cv = useCvStore()
    const p = useProfilesStore()
    cv.personal.name = 'Ana'
    const first = p.activeId
    p.create('Outro')
    p.switchTo(first)
    expect(useCvStore().personal.name).toBe('Ana')
  })

  it('duplicate copia os dados do perfil ativo', () => {
    const cv = useCvStore()
    const p = useProfilesStore()
    cv.personal.name = 'Original'
    p.duplicate()
    expect(p.profiles).toHaveLength(2)
    expect(useCvStore().personal.name).toBe('Original')
    expect(p.activeName).toContain('cópia')
  })

  it('rename muda o nome do perfil', () => {
    const p = useProfilesStore()
    p.rename(p.activeId, 'CV Backend')
    expect(p.activeName).toBe('CV Backend')
  })

  it('remove mantém sempre pelo menos um perfil', () => {
    const p = useProfilesStore()
    p.remove(p.activeId)
    expect(p.profiles).toHaveLength(1)
  })
})
