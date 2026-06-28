<template>
  <div class="flex items-center gap-1">
    <button
      type="button"
      class="icon-btn"
      :disabled="!canUp"
      title="Mover para cima"
      aria-label="Mover para cima"
      @click="$emit('up')"
    >
      <Icon name="chevron-up" class="h-3.5 w-3.5" />
    </button>
    <button
      type="button"
      class="icon-btn"
      :disabled="!canDown"
      title="Mover para baixo"
      aria-label="Mover para baixo"
      @click="$emit('down')"
    >
      <Icon name="chevron-down" class="h-3.5 w-3.5" />
    </button>
    <button
      type="button"
      class="ml-1 text-xs text-red-500 hover:text-red-700"
      @click="$emit('remove')"
    >
      Remover
    </button>
  </div>
</template>

<script setup>
import Icon from '@/components/Icon.vue'

defineProps({
  canUp: Boolean,
  canDown: Boolean,
})
defineEmits(['up', 'down', 'remove'])
</script>
