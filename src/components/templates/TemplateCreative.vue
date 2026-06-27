<template>
  <div class="cv-page p-12 font-sans text-sm text-gray-700" :style="{ '--accent': cv.accent }">
    <header class="mb-6 flex items-center gap-4">
      <div
        class="bg-accent flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-2xl font-bold text-white"
      >
        {{ initials }}
      </div>
      <div>
        <h1 class="text-3xl font-extrabold text-gray-900">{{ p.name || 'O teu nome' }}</h1>
        <p class="font-medium text-accent">{{ p.title }}</p>
        <p v-if="contact.length" class="mt-1 text-xs text-gray-500">{{ contact.join('  ·  ') }}</p>
      </div>
    </header>

    <section v-if="cv.sections.summary && p.summary" class="bg-accent-soft mb-6 rounded-xl p-4">
      <p class="whitespace-pre-line leading-relaxed text-gray-700">{{ p.summary }}</p>
    </section>

    <section v-if="cv.sections.experience && cv.experience.length" class="mb-6">
      <h2 class="cr-title">Experiência</h2>
      <div v-for="exp in cv.experience" :key="exp.id" class="mb-4 break-inside-avoid">
        <div class="flex items-baseline justify-between">
          <span class="font-bold text-gray-900">{{ exp.role }}</span>
          <span class="bg-accent-soft text-accent-strong rounded-full px-2 py-0.5 text-[11px]">
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

    <section v-if="cv.sections.projects && cv.projects.length" class="mb-6">
      <h2 class="cr-title">Projetos</h2>
      <div v-for="pr in cv.projects" :key="pr.id" class="mb-3 break-inside-avoid">
        <div class="flex items-baseline justify-between gap-2">
          <span class="font-bold text-gray-900">{{ pr.name }}</span>
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

    <div class="grid grid-cols-2 gap-8">
      <section v-if="cv.sections.skills && cv.skills.length">
        <h2 class="cr-title">Competências</h2>
        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="s in cv.skills"
            :key="s.id"
            class="bg-accent rounded-full px-2.5 py-0.5 text-xs text-white"
            >{{ s.name }}</span
          >
        </div>
      </section>
      <section v-if="cv.sections.education && cv.education.length">
        <h2 class="cr-title">Educação</h2>
        <div v-for="e in cv.education" :key="e.id" class="mb-2 break-inside-avoid">
          <p class="font-semibold text-gray-900">{{ e.degree }}</p>
          <p class="text-xs text-gray-500">{{ e.institution }} · {{ fmt(e.endDate) }}</p>
        </div>
      </section>
    </div>

    <div class="mt-6 grid grid-cols-2 gap-8">
      <section v-if="cv.sections.languages && cv.languages.length">
        <h2 class="cr-title">Idiomas</h2>
        <div v-for="l in cv.languages" :key="l.id" class="flex justify-between text-gray-600">
          <span>{{ l.name }}</span
          ><span class="text-gray-400">{{ l.level }}</span>
        </div>
      </section>
      <section v-if="cv.sections.certifications && cv.certifications.length">
        <h2 class="cr-title">Certificações</h2>
        <div v-for="c in cv.certifications" :key="c.id" class="mb-1 break-inside-avoid">
          <span class="font-medium text-gray-900">{{ c.name }}</span>
          <span class="text-xs text-gray-500"> — {{ c.year }}</span>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTemplateData } from '@/composables/useTemplateData'
const { cv, p, fmt, bullets, contact } = useTemplateData()

const initials = computed(() => {
  const parts = (p.value.name || '').trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return 'CV'
  return (parts[0][0] + (parts[parts.length - 1][0] || '')).toUpperCase()
})
</script>

<style scoped>
.cv-page {
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.cr-title {
  @apply mb-2 text-sm font-bold uppercase tracking-wider;
  color: var(--accent);
}
</style>
