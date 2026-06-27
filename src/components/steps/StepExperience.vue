<template>
  <div class="space-y-4">
    <p v-if="!cv.experience.length" class="rounded-lg bg-gray-50 p-6 text-center text-sm text-gray-400">
      Ainda sem experiência. Adiciona a primeira.
    </p>

    <div
      v-for="exp in cv.experience"
      :key="exp.id"
      class="rounded-lg border border-gray-200 p-4"
    >
      <div class="mb-3 flex items-center justify-between">
        <span class="text-xs font-semibold text-gray-400">
          {{ exp.role || 'Nova experiência' }}
        </span>
        <button
          class="text-xs text-red-500 hover:text-red-700"
          @click="cv.removeExperience(exp.id)"
        >
          Remover
        </button>
      </div>

      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label :for="`exp-role-${exp.id}`" class="label">Cargo</label>
          <input :id="`exp-role-${exp.id}`" v-model="exp.role" class="input" placeholder="Frontend Developer" />
        </div>
        <div>
          <label :for="`exp-company-${exp.id}`" class="label">Empresa</label>
          <input :id="`exp-company-${exp.id}`" v-model="exp.company" class="input" placeholder="TechNova" />
        </div>
      </div>

      <div class="mt-3 grid grid-cols-2 gap-3">
        <div>
          <label :for="`exp-start-${exp.id}`" class="label">Início</label>
          <input :id="`exp-start-${exp.id}`" v-model="exp.startDate" type="month" class="input" />
        </div>
        <div>
          <label :for="`exp-end-${exp.id}`" class="label">Fim</label>
          <input
            :id="`exp-end-${exp.id}`"
            v-model="exp.endDate"
            type="month"
            class="input"
            :disabled="exp.current"
          />
        </div>
      </div>

      <label :for="`exp-current-${exp.id}`" class="mt-3 flex items-center gap-2 text-sm text-gray-600">
        <input :id="`exp-current-${exp.id}`" v-model="exp.current" type="checkbox" class="rounded border-gray-300" />
        Trabalho aqui actualmente
      </label>

      <div class="mt-3">
        <label :for="`exp-desc-${exp.id}`" class="label">Descrição</label>
        <textarea
          :id="`exp-desc-${exp.id}`"
          v-model="exp.description"
          rows="3"
          class="input resize-none"
          placeholder="Principais responsabilidades e conquistas."
        />
      </div>
    </div>

    <button class="btn-ghost w-full justify-center" @click="cv.addExperience()">
      + Adicionar experiência
    </button>
  </div>
</template>

<script setup>
import { useCvStore } from '@/stores/cv'
const cv = useCvStore()
</script>
