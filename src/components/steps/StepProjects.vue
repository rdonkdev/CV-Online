<template>
  <div class="space-y-4">
    <SectionToggle v-model="cv.sections.projects" label="Mostrar ou ocultar os Projetos no CV" />

    <p v-if="!cv.projects.length" class="empty-hint">Ainda sem projetos. Adiciona o primeiro.</p>

    <div v-for="(proj, i) in cv.projects" :key="proj.id" class="field-card p-4">
      <div class="mb-3 flex items-center justify-between">
        <span class="text-xs font-semibold text-gray-400">
          {{ proj.name || 'Novo projeto' }}
        </span>
        <ItemActions
          :can-up="i > 0"
          :can-down="i < cv.projects.length - 1"
          @up="cv.move('projects', proj.id, -1)"
          @down="cv.move('projects', proj.id, 1)"
          @remove="cv.removeProject(proj.id)"
        />
      </div>

      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label :for="`proj-name-${proj.id}`" class="label">Nome</label>
          <input
            :id="`proj-name-${proj.id}`"
            v-model="proj.name"
            class="input"
            placeholder="Gerador de CV"
          />
        </div>
        <div>
          <label :for="`proj-link-${proj.id}`" class="label">Link</label>
          <input
            :id="`proj-link-${proj.id}`"
            v-model="proj.link"
            class="input"
            placeholder="github.com/user/projeto"
          />
        </div>
      </div>

      <div class="mt-3">
        <label :for="`proj-desc-${proj.id}`" class="label">Descrição</label>
        <textarea
          :id="`proj-desc-${proj.id}`"
          v-model="proj.description"
          rows="3"
          class="input resize-none"
          placeholder="Uma linha por tópico — cada linha vira um bullet no CV."
        />
        <div class="mt-1 flex justify-between text-xs text-gray-400">
          <span>Dica: cada linha vira um tópico (bullet).</span>
          <span>{{ proj.description.length }}</span>
        </div>
      </div>
    </div>

    <button type="button" class="btn-ghost w-full justify-center" @click="cv.addProject()">
      + Adicionar projeto
    </button>
  </div>
</template>

<script setup>
import { useCvStore } from '@/stores/cv'
import ItemActions from '@/components/ItemActions.vue'
import SectionToggle from '@/components/SectionToggle.vue'

const cv = useCvStore()
</script>
