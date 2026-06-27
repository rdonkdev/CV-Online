<template>
  <div class="cv-page p-14 font-serif text-sm text-gray-700" :style="{ '--accent': cv.accent }">
    <header class="mb-6 text-center">
      <h1 class="text-4xl font-bold uppercase tracking-[0.15em] text-gray-900">
        {{ p.name || 'O teu nome' }}
      </h1>
      <p class="mt-2 text-base tracking-widest text-accent">{{ p.title }}</p>
      <p v-if="contact.length" class="mt-2 text-xs text-gray-500">{{ contact.join('   |   ') }}</p>
    </header>

    <section v-if="cv.sections.summary && p.summary" class="mb-6">
      <p class="whitespace-pre-line text-center leading-relaxed text-gray-600">{{ p.summary }}</p>
    </section>

    <section v-if="cv.sections.experience && cv.experience.length" class="mb-6">
      <h2 class="exec-title">Experiência Profissional</h2>
      <div v-for="exp in cv.experience" :key="exp.id" class="mb-4 break-inside-avoid">
        <div class="flex items-baseline justify-between">
          <span class="font-bold text-gray-900">{{ exp.role }}</span>
          <span class="text-xs text-gray-500">
            {{ fmt(exp.startDate) }} — {{ exp.current ? 'Presente' : fmt(exp.endDate) }}
          </span>
        </div>
        <p class="italic text-accent">{{ exp.company }}</p>
        <ul
          v-if="bullets(exp.description).length"
          class="cv-bullets ml-4 mt-1 list-disc space-y-0.5 text-gray-600"
        >
          <li v-for="(b, bi) in bullets(exp.description)" :key="bi">{{ b }}</li>
        </ul>
      </div>
    </section>

    <section v-if="cv.sections.education && cv.education.length" class="mb-6">
      <h2 class="exec-title">Educação</h2>
      <div v-for="e in cv.education" :key="e.id" class="mb-2 break-inside-avoid">
        <div class="flex items-baseline justify-between">
          <span class="font-bold text-gray-900"
            >{{ e.degree }}<span v-if="e.field">, {{ e.field }}</span></span
          >
          <span class="text-xs text-gray-500">{{ fmt(e.startDate) }} — {{ fmt(e.endDate) }}</span>
        </div>
        <p class="italic text-gray-600">{{ e.institution }}</p>
      </div>
    </section>

    <section v-if="cv.sections.projects && cv.projects.length" class="mb-6">
      <h2 class="exec-title">Projetos</h2>
      <div v-for="pr in cv.projects" :key="pr.id" class="mb-3 break-inside-avoid">
        <span class="font-bold text-gray-900">{{ pr.name }}</span>
        <span v-if="pr.link" class="ml-1 break-all text-xs text-gray-500">{{ pr.link }}</span>
        <ul
          v-if="bullets(pr.description).length"
          class="cv-bullets ml-4 list-disc space-y-0.5 text-gray-600"
        >
          <li v-for="(b, bi) in bullets(pr.description)" :key="bi">{{ b }}</li>
        </ul>
      </div>
    </section>

    <div class="grid grid-cols-2 gap-10">
      <section v-if="cv.sections.skills && cv.skills.length">
        <h2 class="exec-title">Competências</h2>
        <p class="text-gray-700">
          {{
            cv.skills
              .map((s) => s.name)
              .filter(Boolean)
              .join(' · ')
          }}
        </p>
      </section>
      <section v-if="cv.sections.languages && cv.languages.length">
        <h2 class="exec-title">Idiomas</h2>
        <p class="text-gray-700">
          {{ cv.languages.map((l) => `${l.name} (${l.level})`).join(' · ') }}
        </p>
      </section>
    </div>

    <section v-if="cv.sections.certifications && cv.certifications.length" class="mt-6">
      <h2 class="exec-title">Certificações</h2>
      <div v-for="c in cv.certifications" :key="c.id" class="mb-1 break-inside-avoid text-center">
        <span class="font-medium text-gray-900">{{ c.name }}</span>
        <span class="text-xs text-gray-500"> — {{ c.issuer }} {{ c.year }}</span>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useTemplateData } from '@/composables/useTemplateData'
const { cv, p, fmt, bullets, contact } = useTemplateData()
</script>

<style scoped>
.exec-title {
  @apply mb-3 border-y border-gray-300 py-1 text-center text-xs font-bold uppercase tracking-[0.3em] text-gray-800;
}
</style>
