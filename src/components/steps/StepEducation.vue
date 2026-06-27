<template>
  <div class="space-y-4">
    <p v-if="!cv.education.length" class="rounded-lg bg-gray-50 p-6 text-center text-sm text-gray-400">
      Ainda sem formação. Adiciona a primeira.
    </p>

    <div
      v-for="edu in cv.education"
      :key="edu.id"
      class="rounded-lg border border-gray-200 p-4"
    >
      <div class="mb-3 flex items-center justify-between">
        <span class="text-xs font-semibold text-gray-400">
          {{ edu.degree || 'Nova formação' }}
        </span>
        <button
          class="text-xs text-red-500 hover:text-red-700"
          @click="cv.removeEducation(edu.id)"
        >
          Remover
        </button>
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
    </div>

    <button class="btn-ghost w-full justify-center" @click="cv.addEducation()">
      + Adicionar formação
    </button>
  </div>
</template>

<script setup>
import { useCvStore } from '@/stores/cv'
const cv = useCvStore()
</script>
