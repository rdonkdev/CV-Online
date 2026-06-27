<template>
  <!-- O id é propagado para o elemento A4 real, que é o que o html2pdf captura -->
  <component :is="activeTemplate" :id="$attrs.id" />
</template>

<script setup>
import { computed } from 'vue'
import { useCvStore } from '@/stores/cv'
import TemplateModern from '@/components/templates/TemplateModern.vue'
import TemplateClassic from '@/components/templates/TemplateClassic.vue'
import TemplateMinimal from '@/components/templates/TemplateMinimal.vue'

defineOptions({ inheritAttrs: false })

const cv = useCvStore()

const templates = {
  modern: TemplateModern,
  classic: TemplateClassic,
  minimal: TemplateMinimal,
}

const activeTemplate = computed(() => templates[cv.template] || TemplateModern)
</script>
