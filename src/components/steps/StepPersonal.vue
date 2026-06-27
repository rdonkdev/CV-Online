<template>
  <div class="space-y-4">
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label for="p-name" class="label">Nome completo</label>
        <input id="p-name" v-model="p.name" class="input" placeholder="Ana Marques" />
      </div>
      <div>
        <label for="p-title" class="label">Título profissional</label>
        <input id="p-title" v-model="p.title" class="input" placeholder="Frontend Developer" />
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label for="p-email" class="label">Email</label>
        <input
          id="p-email"
          v-model="p.email"
          type="email"
          class="input"
          :class="{ 'border-red-400 focus:border-red-500 focus:ring-red-500': !emailValid }"
          :aria-invalid="!emailValid"
          aria-describedby="p-email-error"
          placeholder="ana@email.com"
        />
        <p v-if="!emailValid" id="p-email-error" class="mt-1 text-xs text-red-500">
          Introduz um email válido.
        </p>
      </div>
      <div>
        <label for="p-phone" class="label">Telefone</label>
        <input id="p-phone" v-model="p.phone" class="input" placeholder="+351 912 345 678" />
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label for="p-location" class="label">Localização</label>
        <input id="p-location" v-model="p.location" class="input" placeholder="Lisboa, Portugal" />
      </div>
      <div>
        <label for="p-linkedin" class="label">LinkedIn</label>
        <input id="p-linkedin" v-model="p.linkedin" class="input" placeholder="linkedin.com/in/ana" />
      </div>
    </div>

    <div>
      <label for="p-website" class="label">Website / Portfolio</label>
      <input id="p-website" v-model="p.website" class="input" placeholder="anamarques.dev" />
    </div>

    <div>
      <div class="mb-1 flex items-center justify-between">
        <label for="p-summary" class="label mb-0">Resumo / Perfil</label>
        <SectionToggle v-model="cv.sections.summary" label="Mostrar ou ocultar o Resumo no CV" class="!bg-transparent !px-0 !py-0" />
      </div>
      <textarea
        id="p-summary"
        v-model="p.summary"
        rows="4"
        class="input resize-none"
        placeholder="Breve descrição sobre ti, a tua experiência e objectivos."
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCvStore } from '@/stores/cv'
import { storeToRefs } from 'pinia'
import SectionToggle from '@/components/SectionToggle.vue'

const cv = useCvStore()
const { personal: p } = storeToRefs(cv)

// Vazio é considerado válido (campo opcional); só assinala formato errado.
const emailValid = computed(
  () => !p.value.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.value.email)
)
</script>
