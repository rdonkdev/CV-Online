<template>
  <div class="space-y-4">
    <p v-if="!cv.skills.length" class="rounded-lg bg-gray-50 p-6 text-center text-sm text-gray-400">
      Ainda sem competências. Adiciona a primeira.
    </p>

    <div
      v-for="skill in cv.skills"
      :key="skill.id"
      class="flex items-center gap-3 rounded-lg border border-gray-200 p-3"
    >
      <input
        v-model="skill.name"
        class="input flex-1"
        placeholder="ex.: Vue 3"
        aria-label="Nome da competência"
      />

      <div class="flex items-center gap-1" role="group" :aria-label="`Nível de ${skill.name || 'competência'}`">
        <button
          v-for="n in 5"
          :key="n"
          type="button"
          class="h-5 w-5 rounded-full border transition"
          :class="n <= skill.level ? 'border-blue-600 bg-blue-600' : 'border-gray-300 bg-white'"
          :title="`Nível ${n}`"
          :aria-label="`Nível ${n} de 5`"
          :aria-pressed="n <= skill.level"
          @click="skill.level = n"
        />
      </div>

      <button
        class="text-xs text-red-500 hover:text-red-700"
        @click="cv.removeSkill(skill.id)"
      >
        Remover
      </button>
    </div>

    <button class="btn-ghost w-full justify-center" @click="cv.addSkill()">
      + Adicionar competência
    </button>
  </div>
</template>

<script setup>
import { useCvStore } from '@/stores/cv'
const cv = useCvStore()
</script>
