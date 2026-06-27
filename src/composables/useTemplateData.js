import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCvStore } from '@/stores/cv'
import { formatMonth, toBullets } from '@/utils/format'

/**
 * Dados e helpers partilhados por todos os templates de CV.
 * Evita repetir o mesmo boilerplate em cada SFC de template.
 */
export function useTemplateData() {
  const cv = useCvStore()
  const { personal } = storeToRefs(cv)

  const contact = computed(() =>
    [
      personal.value.email,
      personal.value.phone,
      personal.value.location,
      personal.value.linkedin,
      personal.value.website,
    ].filter(Boolean)
  )

  return { cv, p: personal, fmt: formatMonth, bullets: toBullets, contact }
}
