<template>
  <div class="space-y-4">
    <SectionToggle v-model="cv.sections.education" label="Mostrar ou ocultar a Educação no CV" />

    <p v-if="!cv.education.length" class="empty-hint">
      Ainda sem formação. Adiciona a primeira.
    </p>

    <div
      v-for="(edu, i) in cv.education"
      :key="edu.id"
      class="field-card p-4"
    >
      <div class="mb-3 flex items-center justify-between">
        <span class="text-xs font-semibold text-gray-400">
          {{ edu.degree || 'Nova formação' }}
        </span>
        <ItemActions
          :can-up="i > 0"
          :can-down="i < cv.education.length - 1"
          @up="cv.move('education', edu.id, -1)"
          @down="cv.move('education', edu.id, 1)"
          @remove="cv.removeEducation(edu.id)"
        />
      </div>

      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label :for="`edu-inst-${edu.id}`" class="label">Instituição</label>
          <input :id="`edu-inst-${edu.id}`" v-model="edu.institution" class="input" placeholder="Universidade de Lisboa" />
        </div>
        <div>
          <label :for="`edu-degree-${edu.id}`" class="label">Grau</label>
          <input :id="`edu-degree-${edu.id}`" v-model="edu.degree" class="input" placeholder="Licenciatura" />
        </div>
      </div>

      <div class="mt-3">
        <label :for="`edu-field-${edu.id}`" class="label">Área de estudo</label>
        <input :id="`edu-field-${edu.id}`" v-model="edu.field" class="input" placeholder="Engenharia Informática" />
      </div>

      <div class="mt-3 grid grid-cols-2 gap-3">
        <div>
          <label :for="`edu-start-${edu.id}`" class="label">Início</label>
          <input :id="`edu-start-${edu.id}`" v-model="edu.startDate" type="month" class="input" />
        </div>
        <div>
          <label :for="`edu-end-${edu.id}`" class="label">Fim</label>
          <input :id="`edu-end-${edu.id}`" v-model="edu.endDate" type="month" class="input" />
        </div>
      </div>

      <p v-if="edu.startDate && edu.endDate && edu.endDate < edu.startDate" class="mt-1 text-xs text-red-500">
        A data de fim é anterior à de início.
      </p>
    </div>

    <button type="button" class="btn-ghost w-full justify-center" @click="cv.addEducation()">
      + Adicionar formação
    </button>
  </div>
</template>

<script setup>
import { useCvStore } from '@/stores/cv'
import ItemActions from '@/components/ItemActions.vue'
import SectionToggle from '@/components/SectionToggle.vue'

const cv = useCvStore()
</script>
