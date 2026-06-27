<template>
  <div class="space-y-4">
    <p v-if="!cv.certifications.length" class="rounded-lg bg-gray-50 p-6 text-center text-sm text-gray-400">
      Ainda sem certificações. Adiciona a primeira.
    </p>

    <div
      v-for="(cert, i) in cv.certifications"
      :key="cert.id"
      class="rounded-lg border border-gray-200 p-4"
    >
      <div class="mb-3 flex items-center justify-between">
        <span class="text-xs font-semibold text-gray-400">
          {{ cert.name || 'Nova certificação' }}
        </span>
        <ItemActions
          :can-up="i > 0"
          :can-down="i < cv.certifications.length - 1"
          @up="cv.move('certifications', cert.id, -1)"
          @down="cv.move('certifications', cert.id, 1)"
          @remove="cv.removeCertification(cert.id)"
        />
      </div>

      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label :for="`cert-name-${cert.id}`" class="label">Certificação</label>
          <input :id="`cert-name-${cert.id}`" v-model="cert.name" class="input" placeholder="Professional Scrum Master I" />
        </div>
        <div>
          <label :for="`cert-issuer-${cert.id}`" class="label">Emissor</label>
          <input :id="`cert-issuer-${cert.id}`" v-model="cert.issuer" class="input" placeholder="Scrum.org" />
        </div>
      </div>

      <div class="mt-3 w-32">
        <label :for="`cert-year-${cert.id}`" class="label">Ano</label>
        <input :id="`cert-year-${cert.id}`" v-model="cert.year" class="input" placeholder="2023" inputmode="numeric" />
      </div>
    </div>

    <button type="button" class="btn-ghost w-full justify-center" @click="cv.addCertification()">
      + Adicionar certificação
    </button>
  </div>
</template>

<script setup>
import { useCvStore } from '@/stores/cv'
import ItemActions from '@/components/ItemActions.vue'

const cv = useCvStore()
</script>
