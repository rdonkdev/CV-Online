<template>
  <div class="space-y-4">
    <SectionToggle v-model="cv.sections.skills" label="Mostrar ou ocultar as Competências no CV" />

    <p v-if="!cv.skills.length" class="empty-hint">
      Ainda sem competências. Adiciona a primeira.
    </p>

    <div
      v-for="(skill, i) in cv.skills"
      :key="skill.id"
      class="field-card flex flex-wrap items-center gap-3 p-3"
    >
      <input
        v-model="skill.name"
        class="input min-w-[8rem] flex-1"
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

      <ItemActions
        :can-up="i > 0"
        :can-down="i < cv.skills.length - 1"
        @up="cv.move('skills', skill.id, -1)"
        @down="cv.move('skills', skill.id, 1)"
        @remove="cv.removeSkill(skill.id)"
      />
    </div>

    <button type="button" class="btn-ghost w-full justify-center" @click="cv.addSkill()">
      + Adicionar competência
    </button>
  </div>
</template>

<script setup>
import { useCvStore } from '@/stores/cv'
import ItemActions from '@/components/ItemActions.vue'
import SectionToggle from '@/components/SectionToggle.vue'

const cv = useCvStore()
</script>
