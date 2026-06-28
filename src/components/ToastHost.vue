<template>
  <div class="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-2">
    <transition-group name="toast">
      <div
        v-for="t in toasts"
        :key="t.id"
        class="pointer-events-auto flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-white shadow-lg"
        :class="{
          'bg-emerald-600': t.type === 'success',
          'bg-red-600': t.type === 'error',
          'bg-gray-800': t.type === 'info',
        }"
        role="status"
      >
        <Icon :name="iconName(t.type)" class="h-4 w-4 shrink-0" />
        <span>{{ t.message }}</span>
        <button
          class="ml-2 text-white/70 hover:text-white"
          aria-label="Fechar"
          @click="dismiss(t.id)"
        >
          <Icon name="x" class="h-3.5 w-3.5" />
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useToasts } from '@/composables/useToasts'
import Icon from '@/components/Icon.vue'

const { toasts, dismiss } = useToasts()

function iconName(type) {
  return type === 'success' ? 'check' : type === 'error' ? 'alert' : 'info'
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(1rem);
}
</style>
