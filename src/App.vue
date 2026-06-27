<template>
  <div class="app-root min-h-screen bg-gray-100">
    <!-- Barra superior -->
    <header class="screen-only sticky top-0 z-20 border-b border-gray-200 bg-white/80 backdrop-blur">
      <div class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-y-2 px-4 py-3">
        <div class="flex items-center gap-2">
          <span class="text-xl">📄</span>
          <h1 class="hidden text-lg font-bold text-gray-900 sm:block">Gerador de CV</h1>
          <ProfileSwitcher class="ml-1" />
        </div>

        <div class="flex flex-wrap items-center justify-end gap-2">
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
          <button class="btn-ghost" title="Importar dados de um ficheiro JSON" @click="triggerImport">
            Importar
          </button>
          <button
            class="btn-ghost"
            :disabled="cv.isEmpty"
            title="Guardar os teus dados num ficheiro JSON"
            @click="exportData"
          >
            Guardar
          </button>
          <input
            ref="fileInput"
            type="file"
            accept="application/json,.json"
            class="hidden"
            @change="importData"
          />
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
        <p class="mt-3 px-1 text-center text-xs text-gray-400">
          🔒 Os teus dados ficam apenas neste browser (localStorage) — nada é enviado para servidores.
          Em computador partilhado, usa "Limpar tudo" ao terminar.
        </p>
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
import { useProfilesStore } from '@/stores/profiles'
import { usePdfExport } from '@/composables/usePdfExport'
import FormWizard from '@/components/FormWizard.vue'
import CVPreview from '@/components/CVPreview.vue'
import TemplatePicker from '@/components/TemplatePicker.vue'
import ProfileSwitcher from '@/components/ProfileSwitcher.vue'

const cv = useCvStore()
const profiles = useProfilesStore()
// Carrega o perfil ativo no arranque.
profiles.init()
const { exportPdf, exporting } = usePdfExport()
const mobileView = ref('form')

function onExport() {
  if (cv.isEmpty) return
  const safeName =
    (cv.personal.name || 'cv').trim().toLowerCase().replace(/\s+/g, '-') || 'cv'
  exportPdf(safeName)
}

// ---- Export / Import dos dados em JSON (portabilidade entre dispositivos) ----
const fileInput = ref(null)

function exportData() {
  const blob = new Blob([JSON.stringify(cv.$state, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'cv-dados.json'
  a.click()
  URL.revokeObjectURL(url)
}

function triggerImport() {
  fileInput.value?.click()
}

function importData(event) {
  const file = event.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    try {
      cv.loadFrom(JSON.parse(reader.result))
    } catch {
      alert('Ficheiro inválido — não foi possível importar.')
    }
  }
  reader.readAsText(file)
  event.target.value = '' // permite reimportar o mesmo ficheiro
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

// Persistência automática (com debounce): grava o CV no perfil ativo
// 400ms após a última alteração.
let persistTimer = null
watch(
  () => cv.$state,
  () => {
    clearTimeout(persistTimer)
    persistTimer = setTimeout(() => profiles.saveActive(), 400)
  },
  { deep: true }
)
onBeforeUnmount(() => clearTimeout(persistTimer))
</script>
