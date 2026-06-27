<template>
  <div
    class="cv-page p-10 font-sans text-[13px] leading-snug text-gray-700"
    :style="{ '--accent': cv.accent }"
  >
    <header class="border-b-2 border-accent pb-2">
      <h1 class="text-2xl font-bold text-gray-900">{{ p.name || 'O teu nome' }}</h1>
      <div class="flex flex-wrap items-baseline justify-between gap-x-4">
        <p class="font-medium text-accent">{{ p.title }}</p>
        <p v-if="contact.length" class="text-xs text-gray-500">{{ contact.join(' · ') }}</p>
      </div>
    </header>

    <section v-if="cv.sections.summary && p.summary" class="mt-3">
      <p class="whitespace-pre-line text-gray-600">{{ p.summary }}</p>
    </section>

    <div class="mt-3 grid grid-cols-[2fr_1fr] gap-6">
      <!-- Coluna principal -->
      <div>
        <section v-if="cv.sections.experience && cv.experience.length">
          <h2 class="compact-title">Experiência</h2>
          <div v-for="exp in cv.experience" :key="exp.id" class="mb-2.5 break-inside-avoid">
            <div class="flex items-baseline justify-between">
              <span class="font-semibold text-gray-900">{{ exp.role }}</span>
              <span class="text-[11px] text-gray-500">
                {{ fmt(exp.startDate) }} — {{ exp.current ? 'Presente' : fmt(exp.endDate) }}
              </span>
            </div>
            <p class="text-xs font-medium text-accent">{{ exp.company }}</p>
            <ul
              v-if="bullets(exp.description).length"
              class="cv-bullets ml-4 list-disc text-gray-600"
            >
              <li v-for="(b, bi) in bullets(exp.description)" :key="bi">{{ b }}</li>
            </ul>
          </div>
        </section>

        <section v-if="cv.sections.projects && cv.projects.length" class="mt-3">
          <h2 class="compact-title">Projetos</h2>
          <div v-for="pr in cv.projects" :key="pr.id" class="mb-2 break-inside-avoid">
            <span class="font-semibold text-gray-900">{{ pr.name }}</span>
            <span v-if="pr.link" class="ml-1 break-all text-[11px] text-gray-500">{{
              pr.link
            }}</span>
            <ul
              v-if="bullets(pr.description).length"
              class="cv-bullets ml-4 list-disc text-gray-600"
            >
              <li v-for="(b, bi) in bullets(pr.description)" :key="bi">{{ b }}</li>
            </ul>
          </div>
        </section>
      </div>

      <!-- Coluna lateral -->
      <div>
        <section v-if="cv.sections.skills && cv.skills.length">
          <h2 class="compact-title">Competências</h2>
          <p class="text-gray-600">
            {{
              cv.skills
                .map((s) => s.name)
                .filter(Boolean)
                .join(', ')
            }}
          </p>
        </section>

        <section v-if="cv.sections.education && cv.education.length" class="mt-3">
          <h2 class="compact-title">Educação</h2>
          <div v-for="e in cv.education" :key="e.id" class="mb-2 break-inside-avoid">
            <p class="font-semibold text-gray-900">{{ e.degree }}</p>
            <p class="text-xs text-gray-600">{{ e.field }}</p>
            <p class="text-xs text-gray-500">{{ e.institution }}</p>
            <p class="text-[11px] text-gray-400">{{ fmt(e.startDate) }} — {{ fmt(e.endDate) }}</p>
          </div>
        </section>

        <section v-if="cv.sections.languages && cv.languages.length" class="mt-3">
          <h2 class="compact-title">Idiomas</h2>
          <div v-for="l in cv.languages" :key="l.id" class="flex justify-between text-gray-600">
            <span>{{ l.name }}</span
            ><span class="text-gray-400">{{ l.level }}</span>
          </div>
        </section>

        <section v-if="cv.sections.certifications && cv.certifications.length" class="mt-3">
          <h2 class="compact-title">Certificações</h2>
          <div v-for="c in cv.certifications" :key="c.id" class="mb-1 break-inside-avoid">
            <p class="font-medium text-gray-800">{{ c.name }}</p>
            <p class="text-[11px] text-gray-500">{{ c.issuer }} {{ c.year }}</p>
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
.compact-title {
  @apply mb-1 text-[11px] font-bold uppercase tracking-wider;
  color: var(--accent);
}
</style>
