<template>
  <div class="cv-page bg-white p-12 font-serif text-sm text-gray-800" :style="{ '--accent': cv.accent }">
    <!-- Cabeçalho centrado -->
    <header class="border-b-2 border-accent pb-4 text-center">
      <h1 class="text-3xl font-bold uppercase tracking-wide text-gray-900">
        {{ p.name || 'O teu nome' }}
      </h1>
      <p class="mt-1 text-base italic text-gray-600">{{ p.title }}</p>
      <div v-if="contactLine" class="mt-3 text-xs text-gray-500">
        {{ contactLine }}
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

    <section v-if="cv.projects.length" class="mt-6">
      <h2 class="classic-title">Projetos</h2>
      <div v-for="pr in cv.projects" :key="pr.id" class="mb-3 break-inside-avoid">
        <div class="flex items-baseline justify-between gap-2">
          <span class="font-bold text-gray-900">{{ pr.name }}</span>
          <span v-if="pr.link" class="break-all text-xs text-gray-500">{{ pr.link }}</span>
        </div>
        <p class="mt-1 leading-relaxed text-gray-700">{{ pr.description }}</p>
      </div>
    </section>

    <section v-if="cv.skills.length" class="mt-6">
      <h2 class="classic-title">Competências</h2>
      <div class="grid grid-cols-2 gap-x-8 gap-y-1">
        <div v-for="s in cv.skills" :key="s.id" class="flex items-center justify-between">
          <span class="text-gray-700">{{ s.name }}</span>
          <span class="flex gap-0.5">
            <span
              v-for="n in 5"
              :key="n"
              class="h-1.5 w-1.5 rounded-full"
              :class="n <= s.level ? 'bg-accent' : 'bg-gray-300'"
            />
          </span>
        </div>
      </div>
    </section>

    <section v-if="cv.languages.length" class="mt-6">
      <h2 class="classic-title">Idiomas</h2>
      <p class="text-gray-700">
        {{ cv.languages.map((l) => `${l.name} (${l.level})`).join('  ·  ') }}
      </p>
    </section>

    <section v-if="cv.certifications.length" class="mt-6">
      <h2 class="classic-title">Certificações</h2>
      <div v-for="c in cv.certifications" :key="c.id" class="mb-1 flex items-baseline justify-between break-inside-avoid">
        <span class="text-gray-700"
          ><span class="font-medium text-gray-900">{{ c.name }}</span
          ><span v-if="c.issuer" class="italic"> — {{ c.issuer }}</span></span
        >
        <span class="text-xs text-gray-500">{{ c.year }}</span>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCvStore } from '@/stores/cv'
import { storeToRefs } from 'pinia'
import { formatMonth as fmt } from '@/utils/format'

const cv = useCvStore()
const { personal: p } = storeToRefs(cv)

// Junta só os campos preenchidos — evita separadores órfãos quando algum falta.
const contactLine = computed(() =>
  [p.value.email, p.value.phone, p.value.location, p.value.linkedin, p.value.website]
    .filter(Boolean)
    .join('  ·  ')
)
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
