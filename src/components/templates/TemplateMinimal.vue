<template>
  <div class="cv-page bg-white p-12 font-sans text-sm text-gray-700">
    <!-- Cabeçalho -->
    <header class="mb-8">
      <h1 class="text-4xl font-light tracking-tight text-gray-900">
        {{ p.name || 'O teu nome' }}
      </h1>
      <p class="mt-1 text-lg text-gray-400">{{ p.title }}</p>
      <div class="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
        <span v-if="p.email">{{ p.email }}</span>
        <span v-if="p.phone">{{ p.phone }}</span>
        <span v-if="p.location">{{ p.location }}</span>
        <span v-if="p.linkedin">{{ p.linkedin }}</span>
        <span v-if="p.website">{{ p.website }}</span>
      </div>
    </header>

    <section v-if="p.summary" class="mb-8">
      <p class="text-base leading-relaxed text-gray-600">{{ p.summary }}</p>
    </section>

    <section v-if="cv.experience.length" class="mb-8">
      <h2 class="minimal-title">Experiência</h2>
      <div v-for="exp in cv.experience" :key="exp.id" class="mb-5 grid grid-cols-[1fr_3fr] gap-4 break-inside-avoid">
        <div class="text-xs text-gray-400">
          {{ fmt(exp.startDate) }} — {{ exp.current ? 'Presente' : fmt(exp.endDate) }}
        </div>
        <div>
          <p class="font-medium text-gray-900">{{ exp.role }}</p>
          <p class="mb-1 text-xs text-gray-400">{{ exp.company }}</p>
          <p class="leading-relaxed text-gray-600">{{ exp.description }}</p>
        </div>
      </div>
    </section>

    <section v-if="cv.education.length" class="mb-8">
      <h2 class="minimal-title">Educação</h2>
      <div v-for="e in cv.education" :key="e.id" class="mb-3 grid grid-cols-[1fr_3fr] gap-4 break-inside-avoid">
        <div class="text-xs text-gray-400">{{ fmt(e.startDate) }} — {{ fmt(e.endDate) }}</div>
        <div>
          <p class="font-medium text-gray-900">{{ e.degree }}<span v-if="e.field"> · {{ e.field }}</span></p>
          <p class="text-xs text-gray-400">{{ e.institution }}</p>
        </div>
      </div>
    </section>

    <section v-if="cv.skills.length">
      <h2 class="minimal-title">Competências</h2>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="s in cv.skills"
          :key="s.id"
          class="border border-gray-200 px-3 py-1 text-xs text-gray-600"
        >
          {{ s.name }}
        </span>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useCvStore } from '@/stores/cv'
import { storeToRefs } from 'pinia'
import { formatMonth as fmt } from '@/utils/format'

const cv = useCvStore()
const { personal: p } = storeToRefs(cv)
</script>

<style scoped>
.cv-page {
  width: 210mm;
  min-height: 297mm;
}
.minimal-title {
  @apply mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-300;
}
</style>
