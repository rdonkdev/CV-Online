<template>
  <div class="flex items-center gap-1.5">
    <button
      v-for="t in templates"
      :key="t.value"
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
</template>

<script setup>
import { useCvStore } from '@/stores/cv'

const cv = useCvStore()
const templates = [
  { value: 'modern', label: 'Modern' },
  { value: 'classic', label: 'Classic' },
  { value: 'minimal', label: 'Minimal' },
]
</script>
