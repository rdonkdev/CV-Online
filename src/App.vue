<template>
  <div class="app-root min-h-screen bg-gray-100">
    <!-- Barra superior -->
    <header class="screen-only sticky top-0 z-20 border-b border-gray-200 bg-white/80 backdrop-blur">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div class="flex items-center gap-2">
          <span class="text-xl">📄</span>
          <h1 class="text-lg font-bold text-gray-900">Gerador de CV</h1>
        </div>

        <div class="flex items-center gap-2">
          <!-- Toggle mobile: formulário / preview -->
          <div class="flex rounded-lg border border-gray-300 p-0.5 lg:hidden">
            <button
              class="rounded-md px-3 py-1 text-xs font-medium transition"
              :class="mobileView === 'form' ? 'bg-blue-600 text-white' : 'text-gray-600'"
              @click="mobileView = 'form'"
            >
              Formulário
            </button>
            <button
              class="rounded-md px-3 py-1 text-xs font-medium transition"
              :class="mobileView === 'preview' ? 'bg-blue-600 text-white' : 'text-gray-600'"
              @click="mobileView = 'preview'"
            >
              Preview
            </button>
          </div>

          <button class="btn-ghost" @click="cv.loadSample()">Exemplo</button>
          <button
            class="btn-primary"
            :disabled="exporting || cv.isEmpty"
            :title="cv.isEmpty ? 'Preenche o CV antes de exportar' : 'Exportar para PDF'"
            @click="onExport"
          >
            <span v-if="exporting">A gerar…</span>
            <span v-else>Exportar PDF</span>
          </button>
        </div>
      </div>
    </header>

    <main class="screen-only mx-auto flex max-w-7xl gap-6 p-4">
      <!-- Painel esquerdo: formulário -->
      <section
        class="w-full lg:w-[45%]"
        :class="{ 'hidden lg:block': mobileView !== 'form' }"
      >
        <FormWizard />
      </section>

      <!-- Painel direito: preview -->
      <section
        class="w-full lg:w-[55%]"
        :class="{ 'hidden lg:block': mobileView !== 'preview' }"
      >
        <div class="sticky top-20">
          <div class="mb-3 flex items-center justify-between">
            <span class="text-xs font-medium uppercase tracking-wider text-gray-400">
              Pré-visualização
            </span>
            <TemplatePicker />
          </div>

          <!-- Wrapper com scroll. Usa `zoom` (não `transform: scale`) para que
               o CV encolha refluindo o layout, sem deixar espaço vazio em baixo. -->
          <div
            ref="previewBox"
            class="overflow-auto rounded-xl bg-gray-300 p-4 shadow-inner"
          >
            <div class="mx-auto w-fit" :style="{ zoom: previewZoom }">
              <CVPreview id="cv-preview" />
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Cópia exclusiva para impressão: A4 a tamanho real, texto vetorial,
         paginação nativa. Invisível no ecrã (.print-area), visível só no print. -->
    <div class="print-area">
      <CVPreview />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useCvStore } from '@/stores/cv'
import { usePdfExport } from '@/composables/usePdfExport'
import FormWizard from '@/components/FormWizard.vue'
import CVPreview from '@/components/CVPreview.vue'
import TemplatePicker from '@/components/TemplatePicker.vue'

const cv = useCvStore()
const { exportPdf, exporting } = usePdfExport()
const mobileView = ref('form')

function onExport() {
  if (cv.isEmpty) return
  const safeName =
    (cv.personal.name || 'cv').trim().toLowerCase().replace(/\s+/g, '-') || 'cv'
  exportPdf(safeName)
}

// ---- Ajuste automático do zoom do preview à largura disponível ----
// Largura de uma folha A4 em px a 96dpi (210mm).
const A4_WIDTH_PX = 793.7
const previewBox = ref(null)
const previewZoom = ref(0.7)
let resizeObserver = null

function updateZoom() {
  const el = previewBox.value
  if (!el || el.clientWidth === 0) return
  const available = el.clientWidth - 32 // padding p-4 (16px de cada lado)
  previewZoom.value = Math.min(1, Math.max(0.3, available / A4_WIDTH_PX))
}

onMounted(() => {
  updateZoom()
  resizeObserver = new ResizeObserver(updateZoom)
  resizeObserver.observe(previewBox.value)
})

onBeforeUnmount(() => resizeObserver?.disconnect())

// Ao alternar para o preview no mobile, recalcula assim que fica visível.
watch(mobileView, () => nextTick(updateZoom))

// Persistência automática (com debounce): evita serializar o estado inteiro
// a cada tecla — grava 400ms após a última alteração.
let persistTimer = null
watch(
  () => cv.$state,
  () => {
    clearTimeout(persistTimer)
    persistTimer = setTimeout(() => cv.persist(), 400)
  },
  { deep: true }
)
onBeforeUnmount(() => clearTimeout(persistTimer))
</script>
