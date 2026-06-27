<template>
  <div class="cv-page flex font-sans text-sm text-gray-700" :style="{ '--accent': cv.accent }">
    <!-- Sidebar com gradiente de acento -->
    <aside class="grad-side w-[34%] p-7 text-white">
      <h1 class="text-2xl font-bold leading-tight">{{ p.name || 'O teu nome' }}</h1>
      <p class="mt-1 text-sm opacity-90">{{ p.title }}</p>

      <div class="mt-6">
        <h2 class="gs-title">Contacto</h2>
        <ul class="space-y-1 text-xs opacity-90">
          <li v-for="(c, i) in contact" :key="i" class="break-all">{{ c }}</li>
        </ul>
      </div>

      <div v-if="cv.sections.skills && cv.skills.length" class="mt-6">
        <h2 class="gs-title">Competências</h2>
        <div v-for="s in cv.skills" :key="s.id" class="mb-2 break-inside-avoid">
          <p class="mb-0.5 text-xs">{{ s.name }}</p>
          <div class="h-1.5 w-full rounded-full bg-white/30">
            <div
              class="h-full rounded-full bg-white"
              :style="{ width: `${(s.level / 5) * 100}%` }"
            />
          </div>
        </div>
      </div>

      <div v-if="cv.sections.languages && cv.languages.length" class="mt-6">
        <h2 class="gs-title">Idiomas</h2>
        <div v-for="l in cv.languages" :key="l.id" class="flex justify-between text-xs opacity-90">
          <span>{{ l.name }}</span
          ><span class="opacity-75">{{ l.level }}</span>
        </div>
      </div>
    </aside>

    <!-- Conteúdo -->
    <main class="flex-1 p-8">
      <section v-if="cv.sections.summary && p.summary" class="mb-5">
        <h2 class="gm-title">Perfil</h2>
        <p class="whitespace-pre-line leading-relaxed text-gray-600">{{ p.summary }}</p>
      </section>

      <section v-if="cv.sections.experience && cv.experience.length" class="mb-5">
        <h2 class="gm-title">Experiência</h2>
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

      <section v-if="cv.sections.projects && cv.projects.length" class="mb-5">
        <h2 class="gm-title">Projetos</h2>
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

      <section v-if="cv.sections.education && cv.education.length" class="mb-5">
        <h2 class="gm-title">Educação</h2>
        <div v-for="e in cv.education" :key="e.id" class="mb-2 break-inside-avoid">
          <p class="font-semibold text-gray-900">
            {{ e.degree }}<span v-if="e.field">, {{ e.field }}</span>
          </p>
          <p class="text-xs text-gray-500">
            {{ e.institution }} · {{ fmt(e.startDate) }} — {{ fmt(e.endDate) }}
          </p>
        </div>
      </section>

      <section v-if="cv.sections.certifications && cv.certifications.length">
        <h2 class="gm-title">Certificações</h2>
        <div v-for="c in cv.certifications" :key="c.id" class="mb-1 break-inside-avoid">
          <span class="font-medium text-gray-900">{{ c.name }}</span>
          <span class="text-xs text-gray-500"> — {{ c.issuer }} {{ c.year }}</span>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { useTemplateData } from '@/composables/useTemplateData'
const { cv, p, fmt, bullets, contact } = useTemplateData()
</script>

<style scoped>
.cv-page {
  /* Banda de acento contínua em páginas extra (a sidebar diagonal fica por cima). */
  background: linear-gradient(to right, var(--accent) 0 34%, #ffffff 34% 100%);
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.grad-side {
  background: linear-gradient(160deg, var(--accent), color-mix(in srgb, var(--accent) 60%, #000));
}
.gs-title {
  @apply mb-2 text-xs font-bold uppercase tracking-wider text-white/80;
}
.gm-title {
  @apply mb-2 text-sm font-bold uppercase tracking-wider;
  color: var(--accent);
}
</style>
