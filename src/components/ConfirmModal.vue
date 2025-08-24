<template>
  <transition name="fade">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- Fondo -->
      <div class="absolute inset-0 bg-black/40" @click="$emit('cancel')"></div>

      <!-- Modal -->
      <div class="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-xl border">
        <div class="px-6 py-4 border-b">
          <h3 class="text-lg font-semibold">{{ title }}</h3>
        </div>

        <div class="px-6 py-5">
          <p class="text-gray-700">{{ message }}</p>
          <slot />
        </div>

        <div class="px-6 py-4 flex justify-end gap-3 border-t">
          <button
            class="rounded-lg border px-4 py-2 font-medium hover:bg-gray-50"
            @click="$emit('cancel')"
          >
            {{ cancelText }}
          </button>
          <button
            :class="okClass"
            class="rounded-lg px-4 py-2 font-medium text-white"
            @click="$emit('confirm')"
          >
            {{ okText }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: 'Confirmar' },
  message: { type: String, default: '' },
  okText: { type: String, default: 'Aceptar' },
  cancelText: { type: String, default: 'Cancelar' },
  intent: { type: String, default: 'primary' }, // primary | danger | warn
})

const okClassMap = {
  primary: 'bg-indigo-600 hover:bg-indigo-500',
  danger:  'bg-rose-600 hover:bg-rose-500',
  warn:    'bg-amber-600 hover:bg-amber-500',
}
const okClass = computed(() => okClassMap[props.intent] ?? okClassMap.primary)
</script>

<style>
.fade-enter-active,.fade-leave-active{ transition: opacity .15s }
.fade-enter-from,.fade-leave-to{ opacity: 0 }
</style>