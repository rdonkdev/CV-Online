<template>
  <!-- O id é propagado para o elemento A4 real (capturado na impressão) -->
  <component :is="activeTemplate" :id="$attrs.id" />
</template>

<script setup>
import { computed } from 'vue'
import { useCvStore } from '@/stores/cv'
import { templateMap } from '@/components/templates/registry'

defineOptions({ inheritAttrs: false })

const cv = useCvStore()
const activeTemplate = computed(() => templateMap[cv.template] || templateMap.modern)
</script>
