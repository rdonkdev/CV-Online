<template>
  <div class="cv-page flex font-sans text-sm text-gray-800" :style="{ '--accent': cv.accent }">
    <!-- Coluna lateral (o fundo escuro vem do gradiente de .cv-page,
         para que a banda se mantenha contínua em páginas extra) -->
    <aside class="w-[34%] p-8 text-slate-100">
      <h1 class="text-2xl font-bold leading-tight text-white">
        {{ p.name || 'O teu nome' }}
      </h1>
      <p class="mt-1 text-sm font-medium text-accent-tint">{{ p.title }}</p>

      <div class="mt-8 space-y-2 text-xs text-slate-300">
        <p v-if="p.email" class="flex items-start gap-2 break-all">
          <svg class="mt-px h-3.5 w-3.5 shrink-0 text-accent-tint" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>
          <span>{{ p.email }}</span>
        </p>
        <p v-if="p.phone" class="flex items-start gap-2">
          <svg class="mt-px h-3.5 w-3.5 shrink-0 text-accent-tint" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <span>{{ p.phone }}</span>
        </p>
        <p v-if="p.location" class="flex items-start gap-2">
          <svg class="mt-px h-3.5 w-3.5 shrink-0 text-accent-tint" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>{{ p.location }}</span>
        </p>
        <p v-if="p.linkedin" class="flex items-start gap-2 break-all">
          <svg class="mt-px h-3.5 w-3.5 shrink-0 text-accent-tint" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 17V9.99H6V17h2.34zM7.17 8.95a1.36 1.36 0 1 0 0-2.71 1.36 1.36 0 0 0 0 2.71zM18 17v-3.84c0-2.05-1.1-3-2.56-3-1.18 0-1.71.65-2 1.11V9.99H11.1V17h2.34v-3.91c0-.21.02-.41.08-.56.16-.41.54-.84 1.17-.84.82 0 1.15.62 1.15 1.54V17H18z"/></svg>
          <span>{{ p.linkedin }}</span>
        </p>
        <p v-if="p.website" class="flex items-start gap-2 break-all">
          <svg class="mt-px h-3.5 w-3.5 shrink-0 text-accent-tint" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span>{{ p.website }}</span>
        </p>
      </div>

      <div v-if="cv.sections.skills && cv.skills.length" class="mt-8">
        <h2 class="section-title text-accent-tint">Competências</h2>
        <div class="space-y-3">
          <div v-for="s in cv.skills" :key="s.id" class="break-inside-avoid">
            <p class="mb-1 text-xs">{{ s.name }}</p>
            <div class="h-1.5 w-full rounded-full bg-slate-600">
              <div class="h-full rounded-full bg-accent-tint" :style="{ width: `${(s.level / 5) * 100}%` }" />
            </div>
          </div>
        </div>
      </div>

      <div v-if="cv.sections.languages && cv.languages.length" class="mt-8">
        <h2 class="section-title text-accent-tint">Idiomas</h2>
        <ul class="space-y-1 text-xs">
          <li v-for="l in cv.languages" :key="l.id" class="flex justify-between break-inside-avoid">
            <span>{{ l.name }}</span>
            <span class="text-slate-400">{{ l.level }}</span>
          </li>
        </ul>
      </div>

      <div v-if="cv.sections.education && cv.education.length" class="mt-8">
        <h2 class="section-title text-accent-tint">Educação</h2>
        <div v-for="e in cv.education" :key="e.id" class="mb-4 break-inside-avoid text-xs">
          <p class="font-semibold text-white">{{ e.degree }}</p>
          <p class="text-slate-300">{{ e.field }}</p>
          <p class="text-slate-400">{{ e.institution }}</p>
          <p class="text-slate-500">{{ fmt(e.startDate) }} — {{ fmt(e.endDate) }}</p>
        </div>
      </div>
    </aside>

    <!-- Coluna principal -->
    <main class="flex-1 p-8">
      <section v-if="cv.sections.summary && p.summary" class="mb-6">
        <h2 class="section-title text-slate-800">Perfil</h2>
        <p class="whitespace-pre-line leading-relaxed text-gray-600">{{ p.summary }}</p>
      </section>

      <section v-if="cv.sections.experience && cv.experience.length" class="mb-6">
        <h2 class="section-title text-slate-800">Experiência</h2>
        <div v-for="exp in cv.experience" :key="exp.id" class="relative mb-5 break-inside-avoid border-l-2 border-slate-200 pl-4">
          <span class="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-accent" />
          <div class="flex items-baseline justify-between">
            <span class="font-semibold text-gray-900">{{ exp.role }}</span>
            <span class="text-xs text-gray-400">
              {{ fmt(exp.startDate) }} — {{ exp.current ? 'Presente' : fmt(exp.endDate) }}
            </span>
          </div>
          <p class="mb-1 text-xs font-medium text-accent">{{ exp.company }}</p>
          <ul v-if="bullets(exp.description).length" class="cv-bullets ml-4 list-disc space-y-0.5 leading-relaxed text-gray-600">
            <li v-for="(b, bi) in bullets(exp.description)" :key="bi">{{ b }}</li>
          </ul>
        </div>
      </section>

      <section v-if="cv.sections.projects && cv.projects.length" class="mb-6">
        <h2 class="section-title text-slate-800">Projetos</h2>
        <div v-for="pr in cv.projects" :key="pr.id" class="mb-4 break-inside-avoid">
          <div class="flex items-baseline justify-between gap-2">
            <span class="font-semibold text-gray-900">{{ pr.name }}</span>
            <span v-if="pr.link" class="break-all text-xs text-accent">{{ pr.link }}</span>
          </div>
          <ul v-if="bullets(pr.description).length" class="cv-bullets ml-4 list-disc space-y-0.5 leading-relaxed text-gray-600">
            <li v-for="(b, bi) in bullets(pr.description)" :key="bi">{{ b }}</li>
          </ul>
        </div>
      </section>

      <section v-if="cv.sections.certifications && cv.certifications.length">
        <h2 class="section-title text-slate-800">Certificações</h2>
        <div v-for="c in cv.certifications" :key="c.id" class="mb-2 flex items-baseline justify-between break-inside-avoid">
          <span class="text-gray-700"
            ><span class="font-medium text-gray-900">{{ c.name }}</span
            ><span v-if="c.issuer"> — {{ c.issuer }}</span></span
          >
          <span class="text-xs text-gray-400">{{ c.year }}</span>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { useCvStore } from '@/stores/cv'
import { storeToRefs } from 'pinia'
import { formatMonth as fmt, toBullets as bullets } from '@/utils/format'

const cv = useCvStore()
const { personal: p } = storeToRefs(cv)
</script>

<style scoped>
.cv-page {
  width: 210mm;
  min-height: 297mm;
  /* Banda lateral escura (34%) + área principal branca. Como é o fundo da
     página inteira, repete-se em cada página impressa quando o CV passa de 1. */
  background: linear-gradient(to right, #1e293b 0 34%, #ffffff 34% 100%);
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
</style>
