<template>
  <!-- eslint-disable-next-line vuejs-accessibility/no-static-element-interactions, vuejs-accessibility/click-events-have-key-events -->
  <div
    class="fixed inset-0 z-40 flex flex-col bg-black/60 backdrop-blur-sm"
    role="dialog"
    aria-modal="true"
    aria-label="Escolher template"
    @click.self="emit('close')"
  >
    <div class="flex items-center justify-between px-4 py-3 text-white">
      <span class="text-sm font-medium">Escolher template</span>
      <button
        type="button"
        class="rounded-lg bg-white/15 px-4 py-2 text-sm font-medium hover:bg-white/25"
        @click="emit('close')"
      >
        Fechar
      </button>
    </div>

    <div class="flex-1 overflow-y-auto px-4 pb-6">
      <div class="mx-auto flex max-w-5xl flex-wrap justify-center gap-4">
        <button
          v-for="t in TEMPLATES"
          :key="t.value"
          type="button"
          class="group flex flex-col items-center gap-1.5"
          :aria-label="`Usar template ${t.label}`"
          :aria-pressed="cv.template === t.value"
          @click="select(t.value)"
        >
          <div
            class="h-[226px] w-40 overflow-hidden rounded-lg border-2 bg-white shadow-md transition group-hover:shadow-xl"
            :class="
              cv.template === t.value
                ? 'border-blue-500 ring-2 ring-blue-500'
                : 'border-transparent'
            "
          >
            <div class="pointer-events-none origin-top-left" :style="{ zoom: THUMB_ZOOM }">
              <component :is="t.component" />
            </div>
          </div>
          <span
            class="text-xs font-medium"
            :class="cv.template === t.value ? 'text-white' : 'text-white/70'"
          >
            {{ t.label }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useCvStore } from '@/stores/cv'
import { TEMPLATES } from '@/components/templates/registry'

const emit = defineEmits(['close'])
const cv = useCvStore()

// Largura do thumbnail (160px) / largura A4 (793.7px) → escala exata.
const THUMB_ZOOM = 160 / 793.7

function select(value) {
  cv.setTemplate(value)
  emit('close')
}

function onKey(e) {
  if (e.key === 'Escape') emit('close')
}
onMounted(() => {
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKey)
})
</script>
