import { describe, it, expect } from 'vitest'
import { formatMonth } from './format'

describe('formatMonth', () => {
  it('formata "YYYY-MM" para "mês ano"', () => {
    expect(formatMonth('2022-03')).toBe('mar 2022')
    expect(formatMonth('2020-12')).toBe('dez 2020')
  })

  it('devolve string vazia para valores falsy', () => {
    expect(formatMonth('')).toBe('')
    expect(formatMonth(undefined)).toBe('')
    expect(formatMonth(null)).toBe('')
  })

  it('mantém texto livre antigo tal como está', () => {
    expect(formatMonth('2022')).toBe('2022')
    expect(formatMonth('Jan 2022')).toBe('Jan 2022')
  })

  it('mês fora do intervalo cai no valor original', () => {
    expect(formatMonth('2022-13')).toBe('2022-13')
    expect(formatMonth('2022-00')).toBe('2022-00')
  })
})
