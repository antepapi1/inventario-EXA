<template>
  <div v-if="msg"
       :class="type==='error'
         ? 'bg-red-50 text-red-700 border-red-200'
         : 'bg-emerald-50 text-emerald-700 border-emerald-200'"
       class="border rounded-xl p-3 text-sm shadow-sm">
    {{ msg }}
  </div>
</template>

<script setup>
defineProps({
  type: { type: String, default: '' }, // 'ok' | 'error'
  msg:  { type: String, default: '' },
})
</script>
