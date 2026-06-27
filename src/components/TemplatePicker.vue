<template>
  <div class="flex flex-wrap items-center gap-x-3 gap-y-2">
    <!-- Templates -->
    <div class="flex items-center gap-1.5">
      <button
        v-for="t in templates"
        :key="t.value"
        type="button"
        class="rounded-md px-2.5 py-1 text-xs font-medium capitalize transition"
        :class="
          cv.template === t.value
            ? 'bg-blue-600 text-white shadow'
            : 'bg-white text-gray-600 hover:bg-gray-100'
        "
        @click="cv.setTemplate(t.value)"
      >
        {{ t.label }}
      </button>
    </div>

    <!-- Cor de acento -->
    <div class="flex flex-wrap items-center gap-1.5">
      <button
        v-for="c in presets"
        :key="c"
        type="button"
        class="h-5 w-5 rounded-full border transition"
        :class="cv.accent === c ? 'ring-2 ring-offset-1 ring-gray-400' : 'border-gray-200'"
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

const cv = useCvStore()
const templates = [
  { value: 'modern', label: 'Modern' },
  { value: 'classic', label: 'Classic' },
  { value: 'minimal', label: 'Minimal' },
]
const presets = ['#2563eb', '#0d9488', '#7c3aed', '#dc2626', '#ea580c', '#0f172a']
</script>
