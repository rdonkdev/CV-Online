<template>
  <div class="flex items-center justify-between gap-2 rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-700/40">
    <span class="text-xs font-medium text-gray-500 dark:text-gray-400">
      {{ modelValue ? 'Incluída no CV' : 'Oculta no CV' }}
    </span>
    <button
      type="button"
      role="switch"
      :aria-checked="modelValue"
      :aria-label="label"
      class="relative inline-flex h-5 w-9 items-center rounded-full transition"
      :class="modelValue ? 'bg-blue-600' : 'bg-gray-300'"
      @click="$emit('update:modelValue', !modelValue)"
    >
      <span
        class="inline-block h-4 w-4 transform rounded-full bg-white shadow transition"
        :class="modelValue ? 'translate-x-4' : 'translate-x-0.5'"
      />
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: Boolean, default: true },
  label: { type: String, default: 'Mostrar/ocultar secção no CV' },
})
defineEmits(['update:modelValue'])
</script>
