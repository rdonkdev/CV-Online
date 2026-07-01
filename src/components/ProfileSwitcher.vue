<template>
  <div ref="root" class="relative">
    <div class="flex items-center gap-1">
      <select
        class="max-w-[10rem] rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
        :value="profiles.activeId"
        aria-label="CV ativo"
        @change="profiles.switchTo($event.target.value)"
      >
        <option v-for="p in profiles.profiles" :key="p.id" :value="p.id">{{ p.name }}</option>
      </select>
      <button
        ref="trigger"
        type="button"
        class="icon-btn"
        :aria-expanded="open"
        aria-haspopup="dialog"
        aria-controls="profile-panel"
        title="Gerir CVs"
        @click="toggle"
      >
        ⋯
      </button>
    </div>

    <!-- Painel de gestão -->
    <div
      v-if="open"
      id="profile-panel"
      ref="panel"
      class="absolute left-0 z-30 mt-1 w-64 rounded-lg border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-800"
      role="dialog"
      aria-label="Gerir CVs"
    >
      <label for="profile-name" class="label">Nome deste CV</label>
      <div class="flex gap-2">
        <input
          id="profile-name"
          ref="nameInput"
          v-model="nameDraft"
          class="input"
          @keyup.enter="applyRename"
        />
        <button type="button" class="btn-ghost" @click="applyRename">Guardar</button>
      </div>

      <div class="mt-3 grid grid-cols-2 gap-2">
        <button type="button" class="btn-ghost justify-center" @click="onNew">+ Novo</button>
        <button type="button" class="btn-ghost justify-center" @click="onDuplicate">
          Duplicar
        </button>
      </div>

      <div class="mt-2 border-t border-gray-100 pt-2">
        <template v-if="confirmingDelete">
          <p class="mb-2 text-xs text-gray-500">Eliminar “{{ profiles.activeName }}”?</p>
          <div class="flex gap-2">
            <button
              type="button"
              class="btn-ghost justify-center text-red-600 hover:bg-red-50"
              @click="onDelete"
            >
              Eliminar
            </button>
            <button
              type="button"
              class="btn-ghost justify-center"
              @click="confirmingDelete = false"
            >
              Cancelar
            </button>
          </div>
        </template>
        <button
          v-else
          type="button"
          class="btn-ghost w-full justify-center text-red-600 hover:bg-red-50"
          :disabled="profiles.profiles.length <= 1"
          :title="profiles.profiles.length <= 1 ? 'Tem de existir pelo menos um CV' : ''"
          @click="confirmingDelete = true"
        >
          Eliminar este CV
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useProfilesStore } from '@/stores/profiles'

const profiles = useProfilesStore()
const root = ref(null)
const trigger = ref(null)
const nameInput = ref(null)
const open = ref(false)
const confirmingDelete = ref(false)
const nameDraft = ref(profiles.activeName)

// Mantém o input de nome em sincronia com o perfil ativo.
watch(
  () => profiles.activeId,
  () => {
    nameDraft.value = profiles.activeName
    confirmingDelete.value = false
  }
)

function openPanel() {
  nameDraft.value = profiles.activeName
  open.value = true
  nextTick(() => nameInput.value?.focus())
}

function closePanel(restoreFocus = false) {
  open.value = false
  confirmingDelete.value = false
  if (restoreFocus) trigger.value?.focus()
}

function toggle() {
  if (open.value) closePanel()
  else openPanel()
}

function onPointerDown(event) {
  if (!open.value || root.value?.contains(event.target)) return
  closePanel()
}

function onKeyDown(event) {
  if (!open.value || event.key !== 'Escape') return
  event.preventDefault()
  closePanel(true)
}

function applyRename() {
  profiles.rename(profiles.activeId, nameDraft.value)
}
function onNew() {
  profiles.create()
  nameDraft.value = profiles.activeName
}
function onDuplicate() {
  profiles.duplicate()
  nameDraft.value = profiles.activeName
}
function onDelete() {
  profiles.remove(profiles.activeId)
  confirmingDelete.value = false
}

onMounted(() => {
  document.addEventListener('pointerdown', onPointerDown)
  document.addEventListener('keydown', onKeyDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onPointerDown)
  document.removeEventListener('keydown', onKeyDown)
})
</script>
