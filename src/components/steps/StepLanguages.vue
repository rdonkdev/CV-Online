<template>
  <div class="space-y-4">
    <SectionToggle v-model="cv.sections.languages" label="Mostrar ou ocultar os Idiomas no CV" />

    <p v-if="!cv.languages.length" class="rounded-lg bg-gray-50 p-6 text-center text-sm text-gray-400">
      Ainda sem idiomas. Adiciona o primeiro.
    </p>

    <div
      v-for="(lang, i) in cv.languages"
      :key="lang.id"
      class="flex flex-wrap items-center gap-3 rounded-lg border border-gray-200 p-3"
    >
      <input
        v-model="lang.name"
        class="input min-w-[8rem] flex-1"
        placeholder="ex.: Inglês"
        aria-label="Idioma"
      />
      <select v-model="lang.level" class="input w-auto" aria-label="Nível do idioma">
        <option v-for="lvl in LEVELS" :key="lvl" :value="lvl">{{ lvl }}</option>
      </select>

      <ItemActions
        :can-up="i > 0"
        :can-down="i < cv.languages.length - 1"
        @up="cv.move('languages', lang.id, -1)"
        @down="cv.move('languages', lang.id, 1)"
        @remove="cv.removeLanguage(lang.id)"
      />
    </div>

    <button type="button" class="btn-ghost w-full justify-center" @click="cv.addLanguage()">
      + Adicionar idioma
    </button>
  </div>
</template>

<script setup>
import { useCvStore } from '@/stores/cv'
import ItemActions from '@/components/ItemActions.vue'
import SectionToggle from '@/components/SectionToggle.vue'

const cv = useCvStore()
const LEVELS = ['Básico', 'Intermédio', 'Avançado', 'Nativo']
</script>
