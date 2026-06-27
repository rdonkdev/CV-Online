<template>
  <div class="relative">
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
        type="button"
        class="icon-btn"
        :aria-expanded="open"
        title="Gerir CVs"
        @click="toggle"
      >
        ⋯
      </button>
    </div>

    <!-- Painel de gestão -->
    <div
      v-if="open"
      class="absolute left-0 z-30 mt-1 w-64 rounded-lg border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-800"
    >
      <label class="label">Nome deste CV</label>
      <div class="flex gap-2">
        <input v-model="nameDraft" class="input" @keyup.enter="applyRename" />
        <button type="button" class="btn-ghost" @click="applyRename">Guardar</button>
      </div>

      <div class="mt-3 grid grid-cols-2 gap-2">
        <button type="button" class="btn-ghost justify-center" @click="onNew">+ Novo</button>
        <button type="button" class="btn-ghost justify-center" @click="onDuplicate">Duplicar</button>
      </div>

      <div class="mt-2 border-t border-gray-100 pt-2">
        <template v-if="confirmingDelete">
          <p class="mb-2 text-xs text-gray-500">Eliminar “{{ profiles.activeName }}”?</p>
          <div class="flex gap-2">
            <button type="button" class="btn-ghost justify-center text-red-600 hover:bg-red-50" @click="onDelete">
              Eliminar
            </button>
            <button type="button" class="btn-ghost justify-center" @click="confirmingDelete = false">
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
import { ref, watch } from 'vue'
import { useProfilesStore } from '@/stores/profiles'

const profiles = useProfilesStore()
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

function toggle() {
  open.value = !open.value
  if (open.value) nameDraft.value = profiles.activeName
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
</script>
