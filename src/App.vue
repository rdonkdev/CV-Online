<template>
  <div class="app-root min-h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Barra superior -->
    <header
      class="screen-only sticky top-0 z-20 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-700 dark:bg-gray-800/80"
    >
      <div class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-y-2 px-4 py-3">
        <div class="flex items-center gap-2">
          <span class="text-xl">📄</span>
          <h1 class="hidden text-lg font-bold text-gray-900 dark:text-gray-100 sm:block">
            CV - Online
          </h1>
          <ProfileSwitcher class="ml-1" />
        </div>

        <div class="flex flex-wrap items-center justify-end gap-2">
          <!-- Indicador de gravação -->
          <span class="hidden text-xs text-gray-400 sm:inline">
            {{ saveState === 'saving' ? 'A guardar…' : 'Guardado ✓' }}
          </span>

          <!-- Undo / Redo -->
          <button
            class="icon-btn"
            :disabled="!canUndo"
            title="Anular (Ctrl+Z)"
            aria-label="Anular"
            @click="undo"
          >
            ↶
          </button>
          <button
            class="icon-btn"
            :disabled="!canRedo"
            title="Refazer (Ctrl+Y)"
            aria-label="Refazer"
            @click="redo"
          >
            ↷
          </button>

          <!-- Modo escuro -->
          <button
            class="icon-btn"
            :title="dark ? 'Modo claro' : 'Modo escuro'"
            :aria-label="dark ? 'Modo claro' : 'Modo escuro'"
            @click="toggleDark"
          >
            {{ dark ? '☀' : '🌙' }}
          </button>

          <!-- Toggle mobile: formulário / preview -->
          <div class="flex rounded-lg border border-gray-300 p-0.5 dark:border-gray-600 lg:hidden">
            <button
              class="rounded-md px-3 py-1 text-xs font-medium transition"
              :class="
                mobileView === 'form'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300'
              "
              @click="mobileView = 'form'"
            >
              Formulário
            </button>
            <button
              class="rounded-md px-3 py-1 text-xs font-medium transition"
              :class="
                mobileView === 'preview'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300'
              "
              @click="mobileView = 'preview'"
            >
              Preview
            </button>
          </div>

          <button class="btn-ghost" @click="cv.loadSample()">Exemplo</button>
          <button
            class="btn-ghost"
            title="Importar dados de um ficheiro JSON"
            @click="triggerImport"
          >
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
            aria-label="Importar dados de um ficheiro JSON"
            @change="importData"
          />
          <button class="btn-ghost" :disabled="cv.isEmpty" @click="showPreview = true">
            Pré-visualizar
          </button>
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
      <section class="w-full lg:w-[45%]" :class="{ 'hidden lg:block': mobileView !== 'form' }">
        <!-- Onboarding / empty-state -->
        <div
          v-if="cv.isEmpty"
          class="mb-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm dark:border-blue-900 dark:bg-blue-950"
        >
          <p class="font-medium text-blue-800 dark:text-blue-200">👋 Bem-vindo!</p>
          <p class="mt-1 text-blue-700 dark:text-blue-300">
            Preenche os campos abaixo e vê o teu CV a montar-se ao lado em tempo real. Sem ideias?
            Carrega um exemplo para experimentares.
          </p>
          <button class="btn-primary mt-3" @click="cv.loadSample()">Carregar exemplo</button>
        </div>

        <!-- Medidor de completude -->
        <div v-else class="mb-3 rounded-xl bg-white p-3 shadow-sm dark:bg-gray-800">
          <div class="mb-1 flex items-center justify-between text-xs">
            <span class="font-medium text-gray-600 dark:text-gray-300"
              >CV {{ cv.completeness }}% completo</span
            >
            <span class="text-gray-400">{{ completenessHint }}</span>
          </div>
          <div class="h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              class="h-full rounded-full bg-blue-600 transition-all duration-500"
              :style="{ width: `${cv.completeness}%` }"
            />
          </div>
        </div>

        <FormWizard />
        <p class="mt-3 px-1 text-center text-xs text-gray-400 dark:text-gray-500">
          🔒 Os teus dados ficam apenas neste browser (localStorage) — nada é enviado para
          servidores. Em computador partilhado, usa "Limpar tudo" ao terminar.
        </p>
      </section>

      <!-- Painel direito: preview -->
      <section class="w-full lg:w-[55%]" :class="{ 'hidden lg:block': mobileView !== 'preview' }">
        <div class="sticky top-20">
          <div class="mb-3 flex items-center justify-between">
            <span class="text-xs font-medium uppercase tracking-wider text-gray-400"
              >Pré-visualização</span
            >
            <TemplatePicker />
          </div>

          <!-- Wrapper com scroll. Usa `zoom` (não `transform: scale`) para que
               o CV encolha refluindo o layout, sem deixar espaço vazio em baixo. -->
          <div
            ref="previewBox"
            class="overflow-auto rounded-xl bg-gray-300 p-4 shadow-inner dark:bg-gray-700"
          >
            <div class="mx-auto w-fit" :style="{ zoom: previewZoom }">
              <CVPreview id="cv-preview" />
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Modal de pré-visualização de impressão -->
    <PrintPreviewModal v-if="showPreview" @close="showPreview = false" @export="onExport" />

    <!-- Toasts -->
    <ToastHost />

    <!-- Cópia exclusiva para impressão: A4 a tamanho real, texto vetorial,
         paginação nativa. Invisível no ecrã (.print-area), visível só no print. -->
    <div class="print-area">
      <CVPreview />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useCvStore } from '@/stores/cv'
import { useProfilesStore } from '@/stores/profiles'
import { usePdfExport } from '@/composables/usePdfExport'
import { useHistory } from '@/composables/useHistory'
import { useToasts } from '@/composables/useToasts'
import FormWizard from '@/components/FormWizard.vue'
import CVPreview from '@/components/CVPreview.vue'
import TemplatePicker from '@/components/TemplatePicker.vue'
import ProfileSwitcher from '@/components/ProfileSwitcher.vue'
import PrintPreviewModal from '@/components/PrintPreviewModal.vue'
import ToastHost from '@/components/ToastHost.vue'

const cv = useCvStore()
const profiles = useProfilesStore()
profiles.init() // carrega o perfil ativo no arranque

const { exportPdf, exporting } = usePdfExport()
const toasts = useToasts()
const mobileView = ref('form')
const showPreview = ref(false)

// ---- Indicador de gravação + histórico (undo/redo) ----
const saveState = ref('saved')
watch(
  () => cv.$state,
  () => {
    saveState.value = 'saving'
  },
  { deep: true }
)

const {
  undo,
  redo,
  canUndo,
  canRedo,
  reset: resetHistory,
} = useHistory(cv, {
  onCommit: () => {
    profiles.saveActive()
    saveState.value = 'saved'
  },
})

// Trocar de perfil limpa o histórico (cada CV tem o seu).
watch(
  () => profiles.activeId,
  () => {
    resetHistory()
    saveState.value = 'saved'
  }
)

const completenessHint = computed(() => {
  const c = cv.completeness
  if (c >= 100) return 'Excelente!'
  if (c >= 75) return 'Quase lá'
  if (c >= 40) return 'Continua'
  return 'A começar'
})

// ---- Atalhos de teclado ----
function onKey(e) {
  const meta = e.ctrlKey || e.metaKey
  if (!meta) return
  if (e.key === 'z' && !e.shiftKey) {
    e.preventDefault()
    undo()
  } else if (e.key === 'y' || (e.key === 'z' && e.shiftKey)) {
    e.preventDefault()
    redo()
  }
}

// ---- Modo escuro (apenas o editor; o CV mantém-se branco) ----
const THEME_KEY = 'cv-generator:theme'
const dark = ref(false)
function applyDark(v) {
  document.documentElement.classList.toggle('dark', v)
}
function toggleDark() {
  dark.value = !dark.value
  applyDark(dark.value)
  try {
    localStorage.setItem(THEME_KEY, dark.value ? 'dark' : 'light')
  } catch {
    /* localStorage indisponível — ignora */
  }
}

// ---- Export PDF ----
function onExport() {
  if (cv.isEmpty) return
  const safeName = (cv.personal.name || 'cv').trim().toLowerCase().replace(/\s+/g, '-') || 'cv'
  exportPdf(safeName)
}

// ---- Export / Import dos dados em JSON ----
const fileInput = ref(null)

function exportData() {
  const blob = new Blob([JSON.stringify(cv.$state, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'cv-dados.json'
  a.click()
  URL.revokeObjectURL(url)
  toasts.success('Dados exportados.')
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
      toasts.success('CV importado com sucesso.')
    } catch {
      toasts.error('Ficheiro inválido — não foi possível importar.')
    }
  }
  reader.readAsText(file)
  event.target.value = '' // permite reimportar o mesmo ficheiro
}

// ---- Ajuste automático do zoom do preview à largura disponível ----
const A4_WIDTH_PX = 793.7 // 210mm a 96dpi
const previewBox = ref(null)
const previewZoom = ref(0.7)
let resizeObserver = null

function updateZoom() {
  const el = previewBox.value
  if (!el || el.clientWidth === 0) return
  const available = el.clientWidth - 32 // padding p-4
  previewZoom.value = Math.min(1, Math.max(0.3, available / A4_WIDTH_PX))
}

onMounted(() => {
  // Tema inicial: preferência guardada ou a do sistema.
  try {
    const stored = localStorage.getItem(THEME_KEY)
    dark.value = stored ? stored === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches
  } catch {
    dark.value = false
  }
  applyDark(dark.value)

  updateZoom()
  resizeObserver = new ResizeObserver(updateZoom)
  resizeObserver.observe(previewBox.value)
  window.addEventListener('keydown', onKey)
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  window.removeEventListener('keydown', onKey)
})

watch(mobileView, () => nextTick(updateZoom))
</script>
