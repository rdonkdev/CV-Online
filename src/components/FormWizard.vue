<template>
  <div class="rounded-xl bg-white p-6 shadow-sm">
    <!-- Barra de progresso -->
    <div class="mb-6">
      <div class="mb-2 flex items-center justify-between">
        <span class="text-sm font-semibold text-gray-900">
          {{ steps[current].label }}
        </span>
        <span class="text-xs text-gray-400">
          Passo {{ current + 1 }} de {{ steps.length }}
        </span>
      </div>

      <div class="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          class="h-full rounded-full bg-blue-600 transition-all duration-300"
          :style="{ width: `${((current + 1) / steps.length) * 100}%` }"
        />
      </div>

      <!-- Indicadores clicáveis -->
      <nav class="mt-4 flex justify-between">
        <button
          v-for="(s, i) in steps"
          :key="s.key"
          class="flex flex-1 flex-col items-center gap-1 text-xs"
          @click="current = i"
        >
          <span
            class="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition"
            :class="
              i === current
                ? 'bg-blue-600 text-white'
                : i < current
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-400'
            "
          >
            {{ i < current ? '✓' : i + 1 }}
          </span>
          <span :class="i === current ? 'text-blue-600' : 'text-gray-400'">
            {{ s.short }}
          </span>
        </button>
      </nav>
    </div>

    <!-- Conteúdo do passo -->
    <div class="min-h-[320px]">
      <component :is="steps[current].component" />
    </div>

    <!-- Navegação -->
    <div class="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
      <button class="btn-ghost" :disabled="current === 0" @click="prev">
        ← Anterior
      </button>

      <button v-if="current < steps.length - 1" class="btn-primary" @click="next">
        Seguinte →
      </button>

      <!-- Confirmação inline (substitui o confirm() nativo) -->
      <div v-else class="flex items-center gap-2">
        <template v-if="confirming">
          <span class="text-xs text-gray-500">Apagar tudo?</span>
          <button class="btn-ghost text-red-600 hover:bg-red-50" @click="doReset">Sim</button>
          <button class="btn-ghost" @click="confirming = false">Cancelar</button>
        </template>
        <button v-else class="btn-ghost text-red-600 hover:bg-red-50" @click="confirming = true">
          Limpar tudo
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCvStore } from '@/stores/cv'
import StepPersonal from '@/components/steps/StepPersonal.vue'
import StepExperience from '@/components/steps/StepExperience.vue'
import StepEducation from '@/components/steps/StepEducation.vue'
import StepSkills from '@/components/steps/StepSkills.vue'

const cv = useCvStore()
const current = ref(0)

const steps = [
  { key: 'personal', label: 'Dados pessoais', short: 'Pessoal', component: StepPersonal },
  { key: 'experience', label: 'Experiência profissional', short: 'Exp.', component: StepExperience },
  { key: 'education', label: 'Educação', short: 'Educação', component: StepEducation },
  { key: 'skills', label: 'Competências', short: 'Skills', component: StepSkills },
]

function next() {
  if (current.value < steps.length - 1) current.value += 1
}
function prev() {
  if (current.value > 0) current.value -= 1
}
const confirming = ref(false)
function doReset() {
  cv.reset()
  current.value = 0
  confirming.value = false
}
</script>
