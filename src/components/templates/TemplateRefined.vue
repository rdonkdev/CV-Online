<template>
  <div class="cv-page p-12 font-sans text-sm text-gray-700" :style="{ '--accent': cv.accent }">
    <header class="mb-6 border-b border-gray-200 pb-4">
      <h1 class="text-3xl font-bold text-accent">{{ p.name || 'O teu nome' }}</h1>
      <div class="mt-1 flex flex-wrap items-baseline justify-between gap-x-4">
        <p class="font-medium text-gray-700">{{ p.title }}</p>
        <p v-if="contact.length" class="text-xs text-gray-500">{{ contact.join('  ·  ') }}</p>
      </div>
    </header>

    <section v-if="cv.sections.summary && p.summary" class="mb-5">
      <p class="whitespace-pre-line leading-relaxed text-gray-600">{{ p.summary }}</p>
    </section>

    <div class="grid grid-cols-[2.2fr_1fr] gap-8">
      <!-- Principal -->
      <div>
        <section v-if="cv.sections.experience && cv.experience.length" class="mb-5">
          <h2 class="ref-title">Experiência</h2>
          <div v-for="exp in cv.experience" :key="exp.id" class="mb-4 break-inside-avoid">
            <div class="flex items-baseline justify-between">
              <span class="font-semibold text-gray-900">{{ exp.role }}</span>
              <span class="text-xs text-gray-400">
                {{ fmt(exp.startDate) }} — {{ exp.current ? 'Presente' : fmt(exp.endDate) }}
              </span>
            </div>
            <p class="mb-1 text-xs font-medium text-accent">{{ exp.company }}</p>
            <ul
              v-if="bullets(exp.description).length"
              class="cv-bullets ml-4 list-disc space-y-0.5 text-gray-600"
            >
              <li v-for="(b, bi) in bullets(exp.description)" :key="bi">{{ b }}</li>
            </ul>
          </div>
        </section>

        <section v-if="cv.sections.projects && cv.projects.length">
          <h2 class="ref-title">Projetos</h2>
          <div v-for="pr in cv.projects" :key="pr.id" class="mb-3 break-inside-avoid">
            <div class="flex items-baseline justify-between gap-2">
              <span class="font-semibold text-gray-900">{{ pr.name }}</span>
              <span v-if="pr.link" class="break-all text-xs text-accent">{{ pr.link }}</span>
            </div>
            <ul
              v-if="bullets(pr.description).length"
              class="cv-bullets ml-4 list-disc space-y-0.5 text-gray-600"
            >
              <li v-for="(b, bi) in bullets(pr.description)" :key="bi">{{ b }}</li>
            </ul>
          </div>
        </section>
      </div>

      <!-- Lateral -->
      <div>
        <section v-if="cv.sections.skills && cv.skills.length" class="mb-5">
          <h2 class="ref-title">Competências</h2>
          <div v-for="s in cv.skills" :key="s.id" class="mb-1.5 break-inside-avoid">
            <p class="mb-0.5 text-xs">{{ s.name }}</p>
            <div class="h-1 w-full rounded-full bg-gray-200">
              <div
                class="h-full rounded-full bg-accent"
                :style="{ width: `${(s.level / 5) * 100}%` }"
              />
            </div>
          </div>
        </section>

        <section v-if="cv.sections.education && cv.education.length" class="mb-5">
          <h2 class="ref-title">Educação</h2>
          <div v-for="e in cv.education" :key="e.id" class="mb-2 break-inside-avoid text-xs">
            <p class="font-semibold text-gray-900">{{ e.degree }}</p>
            <p class="text-gray-600">{{ e.field }}</p>
            <p class="text-gray-500">{{ e.institution }}</p>
            <p class="text-gray-400">{{ fmt(e.startDate) }} — {{ fmt(e.endDate) }}</p>
          </div>
        </section>

        <section v-if="cv.sections.languages && cv.languages.length" class="mb-5">
          <h2 class="ref-title">Idiomas</h2>
          <div
            v-for="l in cv.languages"
            :key="l.id"
            class="flex justify-between text-xs text-gray-600"
          >
            <span>{{ l.name }}</span
            ><span class="text-gray-400">{{ l.level }}</span>
          </div>
        </section>

        <section v-if="cv.sections.certifications && cv.certifications.length">
          <h2 class="ref-title">Certificações</h2>
          <div v-for="c in cv.certifications" :key="c.id" class="mb-1.5 break-inside-avoid text-xs">
            <p class="font-medium text-gray-800">{{ c.name }}</p>
            <p class="text-gray-500">{{ c.issuer }} {{ c.year }}</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTemplateData } from '@/composables/useTemplateData'
const { cv, p, fmt, bullets, contact } = useTemplateData()
</script>

<style scoped>
.ref-title {
  @apply mb-2 text-xs font-bold uppercase tracking-[0.18em] text-gray-800;
  color: var(--accent);
}
</style>
