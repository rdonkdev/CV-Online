<template>
  <div class="flex flex-wrap items-center gap-x-3 gap-y-2">
    <!-- Template (dropdown) -->
    <label class="sr-only" for="template-select">Template</label>
    <select
      id="template-select"
      class="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
      :value="cv.template"
      @change="cv.setTemplate($event.target.value)"
    >
      <option v-for="t in TEMPLATES" :key="t.value" :value="t.value">{{ t.label }}</option>
    </select>

    <!-- Cor de acento -->
    <div class="flex flex-wrap items-center gap-1.5">
      <button
        v-for="c in presets"
        :key="c"
        type="button"
        class="h-5 w-5 rounded-full border transition"
        :class="cv.accent === c ? 'ring-2 ring-gray-400 ring-offset-1' : 'border-gray-200'"
        :style="{ backgroundColor: c }"
        :title="`Acento ${c}`"
        :aria-label="`Cor de acento ${c}`"
        :aria-pressed="cv.accent === c"
        @click="cv.setAccent(c)"
      />
      <label class="relative h-5 w-5 cursor-pointer" title="Cor personalizada">
        <input
          type="color"
          class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          :value="cv.accent"
          aria-label="Escolher cor de acento personalizada"
          @input="cv.setAccent($event.target.value)"
        />
        <span
          class="block h-5 w-5 rounded-full border border-gray-300 bg-gradient-to-br from-pink-500 via-yellow-400 to-blue-500"
        />
      </label>
    </div>
  </div>
</template>

<script setup>
import { useCvStore } from '@/stores/cv'
import { TEMPLATES } from '@/components/templates/registry'

const cv = useCvStore()
const presets = ['#2563eb', '#0d9488', '#7c3aed', '#dc2626', '#ea580c', '#0f172a']
</script>
