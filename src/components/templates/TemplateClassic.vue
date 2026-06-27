<template>
  <div class="cv-page bg-white p-12 font-serif text-sm text-gray-800">
    <!-- Cabeçalho centrado -->
    <header class="border-b-2 border-gray-800 pb-4 text-center">
      <h1 class="text-3xl font-bold uppercase tracking-wide text-gray-900">
        {{ p.name || 'O teu nome' }}
      </h1>
      <p class="mt-1 text-base italic text-gray-600">{{ p.title }}</p>
      <div class="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-500">
        <span v-if="p.email">{{ p.email }}</span>
        <span v-if="p.phone">· {{ p.phone }}</span>
        <span v-if="p.location">· {{ p.location }}</span>
        <span v-if="p.linkedin">· {{ p.linkedin }}</span>
        <span v-if="p.website">· {{ p.website }}</span>
      </div>
    </header>

    <section v-if="p.summary" class="mt-6">
      <h2 class="classic-title">Perfil</h2>
      <p class="leading-relaxed text-gray-700">{{ p.summary }}</p>
    </section>

    <section v-if="cv.experience.length" class="mt-6">
      <h2 class="classic-title">Experiência Profissional</h2>
      <div v-for="exp in cv.experience" :key="exp.id" class="mb-4 break-inside-avoid">
        <div class="flex items-baseline justify-between">
          <span class="font-bold text-gray-900">{{ exp.role }}</span>
          <span class="text-xs text-gray-500">
            {{ fmt(exp.startDate) }} — {{ exp.current ? 'Presente' : fmt(exp.endDate) }}
          </span>
        </div>
        <p class="text-sm italic text-gray-600">{{ exp.company }}</p>
        <p class="mt-1 leading-relaxed text-gray-700">{{ exp.description }}</p>
      </div>
    </section>

    <section v-if="cv.education.length" class="mt-6">
      <h2 class="classic-title">Educação</h2>
      <div v-for="e in cv.education" :key="e.id" class="mb-3 break-inside-avoid">
        <div class="flex items-baseline justify-between">
          <span class="font-bold text-gray-900">{{ e.degree }}<span v-if="e.field">, {{ e.field }}</span></span>
          <span class="text-xs text-gray-500">{{ fmt(e.startDate) }} — {{ fmt(e.endDate) }}</span>
        </div>
        <p class="text-sm italic text-gray-600">{{ e.institution }}</p>
      </div>
    </section>

    <section v-if="cv.skills.length" class="mt-6">
      <h2 class="classic-title">Competências</h2>
      <p class="text-gray-700">
        {{ cv.skills.map((s) => s.name).filter(Boolean).join('  ·  ') }}
      </p>
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
.classic-title {
  @apply mb-2 border-b border-gray-300 pb-1 text-sm font-bold uppercase tracking-widest text-gray-800;
}
</style>
