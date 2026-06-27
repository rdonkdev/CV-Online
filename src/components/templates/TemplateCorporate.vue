<template>
  <div class="cv-page p-12 font-sans text-sm text-gray-700" :style="{ '--accent': cv.accent }">
    <header class="mb-6 flex items-end justify-between border-b border-gray-300 pb-3">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">{{ p.name || 'O teu nome' }}</h1>
        <p class="text-accent">{{ p.title }}</p>
      </div>
      <ul class="text-right text-xs text-gray-500">
        <li v-for="(c, i) in contact" :key="i" class="break-all">{{ c }}</li>
      </ul>
    </header>

    <section v-if="cv.sections.summary && p.summary" class="corp-sec">
      <h2 class="corp-title">Perfil</h2>
      <p class="whitespace-pre-line leading-relaxed text-gray-600">{{ p.summary }}</p>
    </section>

    <section v-if="cv.sections.experience && cv.experience.length" class="corp-sec">
      <h2 class="corp-title">Experiência</h2>
      <div v-for="exp in cv.experience" :key="exp.id" class="mb-4 break-inside-avoid">
        <div class="flex items-baseline justify-between">
          <span class="font-semibold text-gray-900">{{ exp.role }} · {{ exp.company }}</span>
          <span class="text-xs text-gray-400">
            {{ fmt(exp.startDate) }} — {{ exp.current ? 'Presente' : fmt(exp.endDate) }}
          </span>
        </div>
        <ul
          v-if="bullets(exp.description).length"
          class="cv-bullets ml-4 mt-1 list-disc space-y-0.5 text-gray-600"
        >
          <li v-for="(b, bi) in bullets(exp.description)" :key="bi">{{ b }}</li>
        </ul>
      </div>
    </section>

    <section v-if="cv.sections.projects && cv.projects.length" class="corp-sec">
      <h2 class="corp-title">Projetos</h2>
      <div v-for="pr in cv.projects" :key="pr.id" class="mb-3 break-inside-avoid">
        <span class="font-semibold text-gray-900">{{ pr.name }}</span>
        <span v-if="pr.link" class="ml-1 break-all text-xs text-accent">{{ pr.link }}</span>
        <ul
          v-if="bullets(pr.description).length"
          class="cv-bullets ml-4 list-disc space-y-0.5 text-gray-600"
        >
          <li v-for="(b, bi) in bullets(pr.description)" :key="bi">{{ b }}</li>
        </ul>
      </div>
    </section>

    <section v-if="cv.sections.education && cv.education.length" class="corp-sec">
      <h2 class="corp-title">Educação</h2>
      <div v-for="e in cv.education" :key="e.id" class="mb-2 break-inside-avoid">
        <div class="flex items-baseline justify-between">
          <span class="font-semibold text-gray-900"
            >{{ e.degree }}<span v-if="e.field">, {{ e.field }}</span></span
          >
          <span class="text-xs text-gray-400">{{ fmt(e.startDate) }} — {{ fmt(e.endDate) }}</span>
        </div>
        <p class="text-gray-600">{{ e.institution }}</p>
      </div>
    </section>

    <div class="grid grid-cols-2 gap-8">
      <section v-if="cv.sections.skills && cv.skills.length" class="corp-sec">
        <h2 class="corp-title">Competências</h2>
        <p class="text-gray-600">
          {{
            cv.skills
              .map((s) => s.name)
              .filter(Boolean)
              .join(', ')
          }}
        </p>
      </section>
      <section v-if="cv.sections.languages && cv.languages.length" class="corp-sec">
        <h2 class="corp-title">Idiomas</h2>
        <div v-for="l in cv.languages" :key="l.id" class="flex justify-between text-gray-600">
          <span>{{ l.name }}</span
          ><span class="text-gray-400">{{ l.level }}</span>
        </div>
      </section>
    </div>

    <section v-if="cv.sections.certifications && cv.certifications.length" class="corp-sec">
      <h2 class="corp-title">Certificações</h2>
      <div v-for="c in cv.certifications" :key="c.id" class="mb-1 break-inside-avoid">
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
.corp-sec {
  @apply mb-5 border-l-2 pl-4;
  border-color: var(--accent);
}
.corp-title {
  @apply mb-1 text-sm font-bold uppercase tracking-wider text-gray-800;
}
</style>
