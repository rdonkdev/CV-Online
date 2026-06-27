const MONTHS_PT = [
  'jan',
  'fev',
  'mar',
  'abr',
  'mai',
  'jun',
  'jul',
  'ago',
  'set',
  'out',
  'nov',
  'dez',
]

/**
 * Formata um valor de <input type="month"> ("2022-03") para "mar 2022".
 * Tolera valores antigos em texto livre (ex.: "2022" ou "Jan 2022"),
 * devolvendo-os tal como estão.
 */
export function formatMonth(value) {
  if (!value) return ''
  const match = /^(\d{4})-(\d{2})$/.exec(value)
  if (!match) return value
  const [, year, month] = match
  const name = MONTHS_PT[parseInt(month, 10) - 1]
  return name ? `${name} ${year}` : value
}

/**
 * Converte uma descrição multi-linha em tópicos (bullets).
 * Cada linha não-vazia é um tópico; marcadores iniciais ("-", "*", "•")
 * que o utilizador escreva são removidos para não duplicar com o bullet do CSS.
 */
export function toBullets(text) {
  if (!text) return []
  return text
    .split('\n')
    .map((line) => line.replace(/^\s*[-*•]\s*/, '').trim())
    .filter(Boolean)
}
