<template>
  <div class="cv-page p-12 font-mono text-[13px] text-gray-700" :style="{ '--accent': cv.accent }">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">{{ p.name || 'O teu nome' }}</h1>
      <p class="text-accent">// {{ p.title }}</p>
      <p v-if="contact.length" class="mt-2 text-xs text-gray-500">{{ contact.join('  |  ') }}</p>
    </header>

    <section v-if="cv.sections.summary && p.summary" class="mb-5">
      <h2 class="mono-title">perfil</h2>
      <p class="whitespace-pre-line leading-relaxed text-gray-600">{{ p.summary }}</p>
    </section>

    <section v-if="cv.sections.experience && cv.experience.length" class="mb-5">
      <h2 class="mono-title">experiencia</h2>
      <div v-for="exp in cv.experience" :key="exp.id" class="mb-4 break-inside-avoid">
        <div class="flex items-baseline justify-between">
          <span class="font-bold text-gray-900">{{ exp.role }}</span>
          <span class="text-xs text-gray-400">
            {{ fmt(exp.startDate) }}..{{ exp.current ? 'now' : fmt(exp.endDate) }}
          </span>
        </div>
        <p class="text-xs text-accent">@ {{ exp.company }}</p>
        <ul v-if="bullets(exp.description).length" class="mt-1 space-y-0.5 text-gray-600">
          <li v-for="(b, bi) in bullets(exp.description)" :key="bi" class="flex gap-2">
            <span class="text-accent">-</span><span>{{ b }}</span>
          </li>
        </ul>
      </div>
    </section>

    <section v-if="cv.sections.projects && cv.projects.length" class="mb-5">
      <h2 class="mono-title">projetos</h2>
      <div v-for="pr in cv.projects" :key="pr.id" class="mb-3 break-inside-avoid">
        <span class="font-bold text-gray-900">{{ pr.name }}</span>
        <span v-if="pr.link" class="ml-1 break-all text-xs text-accent">{{ pr.link }}</span>
        <ul v-if="bullets(pr.description).length" class="mt-0.5 space-y-0.5 text-gray-600">
          <li v-for="(b, bi) in bullets(pr.description)" :key="bi" class="flex gap-2">
            <span class="text-accent">-</span><span>{{ b }}</span>
          </li>
        </ul>
      </div>
    </section>

    <section v-if="cv.sections.skills && cv.skills.length" class="mb-5">
      <h2 class="mono-title">skills</h2>
      <div class="flex flex-wrap gap-x-3 gap-y-1 text-gray-600">
        <span v-for="s in cv.skills" :key="s.id">[{{ s.name }}]</span>
      </div>
    </section>

    <section v-if="cv.sections.education && cv.education.length" class="mb-5">
      <h2 class="mono-title">educacao</h2>
      <div v-for="e in cv.education" :key="e.id" class="mb-2 break-inside-avoid">
        <div class="flex items-baseline justify-between">
          <span class="font-bold text-gray-900">{{ e.degree }}</span>
          <span class="text-xs text-gray-400">{{ fmt(e.startDate) }}..{{ fmt(e.endDate) }}</span>
        </div>
        <p class="text-gray-600">{{ e.field }} @ {{ e.institution }}</p>
      </div>
    </section>

    <div class="grid grid-cols-2 gap-8">
      <section v-if="cv.sections.languages && cv.languages.length">
        <h2 class="mono-title">idiomas</h2>
        <div v-for="l in cv.languages" :key="l.id" class="text-gray-600">
          {{ l.name }} = {{ l.level }}
        </div>
      </section>
      <section v-if="cv.sections.certifications && cv.certifications.length">
        <h2 class="mono-title">certs</h2>
        <div v-for="c in cv.certifications" :key="c.id" class="break-inside-avoid text-gray-600">
          {{ c.name }} ({{ c.year }})
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useTemplateData } from '@/composables/useTemplateData'
const { cv, p, fmt, bullets, contact } = useTemplateData()
</script>

<style scoped>
.mono-title {
  @apply mb-1.5 text-xs font-bold lowercase tracking-wider;
  color: var(--accent);
}
.mono-title::before {
  content: '# ';
}
</style>
