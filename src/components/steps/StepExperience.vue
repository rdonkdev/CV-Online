<template>
  <div class="space-y-4">
    <SectionToggle
      v-model="cv.sections.experience"
      label="Mostrar ou ocultar a Experiência no CV"
    />

    <p v-if="!cv.experience.length" class="empty-hint">
      Ainda sem experiência. Adiciona a primeira.
    </p>

    <div v-for="(exp, i) in cv.experience" :key="exp.id" class="field-card p-4">
      <div class="mb-3 flex items-center justify-between">
        <span class="text-xs font-semibold text-gray-400">
          {{ exp.role || 'Nova experiência' }}
        </span>
        <ItemActions
          :can-up="i > 0"
          :can-down="i < cv.experience.length - 1"
          @up="cv.move('experience', exp.id, -1)"
          @down="cv.move('experience', exp.id, 1)"
          @remove="cv.removeExperience(exp.id)"
        />
      </div>

      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label :for="`exp-role-${exp.id}`" class="label">Cargo</label>
          <input
            :id="`exp-role-${exp.id}`"
            v-model="exp.role"
            class="input"
            placeholder="Frontend Developer"
          />
        </div>
        <div>
          <label :for="`exp-company-${exp.id}`" class="label">Empresa</label>
          <input
            :id="`exp-company-${exp.id}`"
            v-model="exp.company"
            class="input"
            placeholder="TechNova"
          />
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

      <p v-if="dateError(exp)" class="mt-1 text-xs text-red-500">
        A data de fim é anterior à de início.
      </p>

      <label
        :for="`exp-current-${exp.id}`"
        class="mt-3 flex items-center gap-2 text-sm text-gray-600"
      >
        <input
          :id="`exp-current-${exp.id}`"
          v-model="exp.current"
          type="checkbox"
          class="rounded border-gray-300"
          @change="exp.current && (exp.endDate = '')"
        />
        Trabalho aqui actualmente
      </label>

      <div class="mt-3">
        <label :for="`exp-desc-${exp.id}`" class="label">Descrição</label>
        <textarea
          :id="`exp-desc-${exp.id}`"
          v-model="exp.description"
          rows="4"
          class="input resize-none"
          placeholder="Uma linha por tópico — cada linha vira um bullet no CV.&#10;Ex.: Liderei a migração para Vue 3, -40% no tempo de carregamento.&#10;Criei um design system reutilizado por 5 equipas."
        />
        <div class="mt-1 flex justify-between text-xs text-gray-400">
          <span>Dica: cada linha vira um tópico (bullet).</span>
          <span>{{ exp.description.length }}</span>
        </div>
      </div>
    </div>

    <button type="button" class="btn-ghost w-full justify-center" @click="cv.addExperience()">
      + Adicionar experiência
    </button>
  </div>
</template>

<script setup>
import { useCvStore } from '@/stores/cv'
import ItemActions from '@/components/ItemActions.vue'
import SectionToggle from '@/components/SectionToggle.vue'

const cv = useCvStore()

// Datas em formato "YYYY-MM" comparam-se lexicograficamente.
function dateError(exp) {
  return !exp.current && exp.startDate && exp.endDate && exp.endDate < exp.startDate
}
</script>
