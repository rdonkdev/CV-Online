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
      ↑
    </button>
    <button
      type="button"
      class="icon-btn"
      :disabled="!canDown"
      title="Mover para baixo"
      aria-label="Mover para baixo"
      @click="$emit('down')"
    >
      ↓
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
defineProps({
  canUp: Boolean,
  canDown: Boolean,
})
defineEmits(['up', 'down', 'remove'])
</script>
