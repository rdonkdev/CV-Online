<template>
  <div class="cv-page p-12 font-serif text-sm text-gray-700" :style="{ '--accent': cv.accent }">
    <header class="text-center">
      <div class="mx-auto mb-3 h-px w-16 bg-accent" />
      <h1 class="text-3xl font-semibold tracking-wide text-gray-900">
        {{ p.name || 'O teu nome' }}
      </h1>
      <p class="mt-1 text-accent">{{ p.title }}</p>
      <p v-if="contact.length" class="mt-2 text-xs text-gray-500">{{ contact.join('  ·  ') }}</p>
      <div class="mx-auto mt-3 h-px w-16 bg-accent" />
    </header>

    <section v-if="cv.sections.summary && p.summary" class="mt-6">
      <p class="whitespace-pre-line text-center leading-relaxed text-gray-600">{{ p.summary }}</p>
    </section>

    <section v-if="cv.sections.experience && cv.experience.length" class="mt-6">
      <h2 class="elegant-title">Experiência</h2>
      <div v-for="exp in cv.experience" :key="exp.id" class="mb-4 break-inside-avoid">
        <div class="flex items-baseline justify-between">
          <span class="font-semibold text-gray-900">{{ exp.role }}</span>
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

    <section v-if="cv.sections.projects && cv.projects.length" class="mt-6">
      <h2 class="elegant-title">Projetos</h2>
      <div v-for="pr in cv.projects" :key="pr.id" class="mb-3 break-inside-avoid">
        <div class="flex items-baseline justify-between gap-2">
          <span class="font-semibold text-gray-900">{{ pr.name }}</span>
          <span v-if="pr.link" class="break-all text-xs text-gray-500">{{ pr.link }}</span>
        </div>
        <ul
          v-if="bullets(pr.description).length"
          class="cv-bullets ml-4 mt-1 list-disc space-y-0.5 text-gray-600"
        >
          <li v-for="(b, bi) in bullets(pr.description)" :key="bi">{{ b }}</li>
        </ul>
      </div>
    </section>

    <section v-if="cv.sections.education && cv.education.length" class="mt-6">
      <h2 class="elegant-title">Educação</h2>
      <div v-for="e in cv.education" :key="e.id" class="mb-2 break-inside-avoid">
        <div class="flex items-baseline justify-between">
          <span class="font-semibold text-gray-900"
            >{{ e.degree }}<span v-if="e.field">, {{ e.field }}</span></span
          >
          <span class="text-xs text-gray-500">{{ fmt(e.startDate) }} — {{ fmt(e.endDate) }}</span>
        </div>
        <p class="italic text-gray-600">{{ e.institution }}</p>
      </div>
    </section>

    <div class="mt-6 grid grid-cols-2 gap-8">
      <section v-if="cv.sections.skills && cv.skills.length">
        <h2 class="elegant-title">Competências</h2>
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
      </section>

      <section v-if="cv.sections.languages && cv.languages.length">
        <h2 class="elegant-title">Idiomas</h2>
        <div v-for="l in cv.languages" :key="l.id" class="flex justify-between text-gray-700">
          <span>{{ l.name }}</span>
          <span class="text-gray-500">{{ l.level }}</span>
        </div>
      </section>
    </div>

    <section v-if="cv.sections.certifications && cv.certifications.length" class="mt-6">
      <h2 class="elegant-title">Certificações</h2>
      <div
        v-for="c in cv.certifications"
        :key="c.id"
        class="mb-1 flex items-baseline justify-between break-inside-avoid"
      >
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
import { useTemplateData } from '@/composables/useTemplateData'
const { cv, p, fmt, bullets, contact } = useTemplateData()
</script>

<style scoped>
.elegant-title {
  @apply mb-2 text-center text-xs font-bold uppercase tracking-[0.25em] text-gray-800;
  color: var(--accent);
}
</style>
