<template>
  <div
    class="fixed inset-0 z-40 flex flex-col bg-black/60 backdrop-blur-sm"
    role="dialog"
    aria-modal="true"
    aria-label="Pré-visualização de impressão"
    @click.self="$emit('close')"
    @keydown.esc="$emit('close')"
  >
    <!-- Barra de ações -->
    <div class="flex items-center justify-between gap-2 px-4 py-3 text-white">
      <span class="text-sm font-medium">Pré-visualização — A4</span>
      <div class="flex items-center gap-2">
        <button type="button" class="btn-primary" @click="$emit('export')">Exportar PDF</button>
        <button
          type="button"
          class="rounded-lg bg-white/15 px-4 py-2 text-sm font-medium text-white hover:bg-white/25"
          @click="$emit('close')"
        >
          Fechar
        </button>
      </div>
    </div>

    <!-- Folha A4 centrada e com scroll -->
    <div class="flex-1 overflow-auto p-4">
      <div class="mx-auto w-fit shadow-2xl">
        <CVPreview />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import CVPreview from '@/components/CVPreview.vue'

defineEmits(['close', 'export'])

// Bloqueia o scroll do fundo enquanto o modal está aberto.
onMounted(() => {
  document.body.style.overflow = 'hidden'
})
onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>
