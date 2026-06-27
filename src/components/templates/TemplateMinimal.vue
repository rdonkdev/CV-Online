<template>
  <div class="cv-page bg-white p-12 font-sans text-sm text-gray-700" :style="{ '--accent': cv.accent }">
    <!-- Cabeçalho -->
    <header class="mb-8">
      <h1 class="text-4xl font-light tracking-tight text-gray-900">
        {{ p.name || 'O teu nome' }}
      </h1>
      <p class="mt-1 text-lg text-accent">{{ p.title }}</p>
      <div v-if="contactItems.length" class="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
        <span v-for="(item, i) in contactItems" :key="i">{{ item }}</span>
      </div>
    </header>

    <section v-if="p.summary" class="mb-8">
      <p class="whitespace-pre-line text-base leading-relaxed text-gray-600">{{ p.summary }}</p>
    </section>

    <section v-if="cv.experience.length" class="mb-8">
      <h2 class="minimal-title">Experiência</h2>
      <div v-for="exp in cv.experience" :key="exp.id" class="mb-5 grid grid-cols-[1fr_3fr] gap-4 break-inside-avoid">
        <div class="text-xs text-gray-400">
          {{ fmt(exp.startDate) }} — {{ exp.current ? 'Presente' : fmt(exp.endDate) }}
        </div>
        <div>
          <p class="font-medium text-gray-900">{{ exp.role }}</p>
          <p class="mb-1 text-xs text-gray-400">{{ exp.company }}</p>
          <ul v-if="bullets(exp.description).length" class="cv-bullets ml-4 list-disc space-y-0.5 leading-relaxed text-gray-600">
            <li v-for="(b, bi) in bullets(exp.description)" :key="bi">{{ b }}</li>
          </ul>
        </div>
      </div>
    </section>

    <section v-if="cv.projects.length" class="mb-8">
      <h2 class="minimal-title">Projetos</h2>
      <div v-for="pr in cv.projects" :key="pr.id" class="mb-4 grid grid-cols-[1fr_3fr] gap-4 break-inside-avoid">
        <div class="break-all text-xs text-gray-400">{{ pr.link }}</div>
        <div>
          <p class="font-medium text-gray-900">{{ pr.name }}</p>
          <ul v-if="bullets(pr.description).length" class="cv-bullets ml-4 list-disc space-y-0.5 leading-relaxed text-gray-600">
            <li v-for="(b, bi) in bullets(pr.description)" :key="bi">{{ b }}</li>
          </ul>
        </div>
      </div>
    </section>

    <section v-if="cv.education.length" class="mb-8">
      <h2 class="minimal-title">Educação</h2>
      <div v-for="e in cv.education" :key="e.id" class="mb-3 grid grid-cols-[1fr_3fr] gap-4 break-inside-avoid">
        <div class="text-xs text-gray-400">{{ fmt(e.startDate) }} — {{ fmt(e.endDate) }}</div>
        <div>
          <p class="font-medium text-gray-900">{{ e.degree }}<span v-if="e.field"> · {{ e.field }}</span></p>
          <p class="text-xs text-gray-400">{{ e.institution }}</p>
        </div>
      </div>
    </section>

    <section v-if="cv.certifications.length" class="mb-8">
      <h2 class="minimal-title">Certificações</h2>
      <div v-for="c in cv.certifications" :key="c.id" class="mb-2 grid grid-cols-[1fr_3fr] gap-4 break-inside-avoid">
        <div class="text-xs text-gray-400">{{ c.year }}</div>
        <div>
          <p class="font-medium text-gray-900">{{ c.name }}</p>
          <p v-if="c.issuer" class="text-xs text-gray-400">{{ c.issuer }}</p>
        </div>
      </div>
    </section>

    <section v-if="cv.skills.length" class="mb-8">
      <h2 class="minimal-title">Competências</h2>
      <div class="grid grid-cols-2 gap-x-8 gap-y-1.5">
        <div v-for="s in cv.skills" :key="s.id" class="flex items-center justify-between">
          <span class="text-gray-600">{{ s.name }}</span>
          <span class="flex gap-0.5">
            <span
              v-for="n in 5"
              :key="n"
              class="h-1.5 w-1.5 rounded-full"
              :class="n <= s.level ? 'bg-accent' : 'bg-gray-200'"
            />
          </span>
        </div>
      </div>
    </section>

    <section v-if="cv.languages.length">
      <h2 class="minimal-title">Idiomas</h2>
      <div class="flex flex-wrap gap-2">
        <span v-for="l in cv.languages" :key="l.id" class="border border-gray-200 px-3 py-1 text-xs text-gray-600">
          {{ l.name }} · {{ l.level }}
        </span>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCvStore } from '@/stores/cv'
import { storeToRefs } from 'pinia'
import { formatMonth as fmt, toBullets as bullets } from '@/utils/format'

const cv = useCvStore()
const { personal: p } = storeToRefs(cv)

const contactItems = computed(() =>
  [p.value.email, p.value.phone, p.value.location, p.value.linkedin, p.value.website].filter(
    Boolean
  )
)
</script>

<style scoped>
.cv-page {
  width: 210mm;
  min-height: 297mm;
}
.minimal-title {
  @apply mb-3 text-xs font-semibold uppercase tracking-[0.2em];
  color: var(--accent);
}
</style>
