<template>
  <section class="bg-white rounded-2xl shadow-sm border p-6">
    <div class="flex items-center gap-3 mb-4">
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-fuchsia-500"
        placeholder="Buscar por nombre, proveedor o código..."
      />
      <span class="text-xs text-gray-500">Total: <b>{{ rows.length }}</b></span>
    </div>

    <div class="overflow-x-auto rounded-lg">
      <table class="w-full text-sm">
        <thead>
          <tr class="bg-indigo-50 text-left text-indigo-900">
            <th class="p-3 font-semibold">Código</th>
            <th class="p-3 font-semibold">Nombre</th>
            <th class="p-3 font-semibold">Stock</th>
            <th class="p-3 font-semibold">Precio</th>
            <th class="p-3 font-semibold">Vence</th>
            <th class="p-3 font-semibold">Creación</th>
            <th class="p-3 font-semibold">Proveedor</th>
            <th class="p-3 font-semibold text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="rows.length===0">
            <td colspan="8" class="p-3 text-center text-gray-500">Sin productos</td>
          </tr>
          <tr
            v-for="(p, i) in rows"
            :key="p.codigo"
            :class="i % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
            class="hover:bg-violet-50/60 transition"
          >
            <td class="p-3 font-mono text-xs">
              <span
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-fuchsia-100 text-fuchsia-800 border border-fuchsia-200"
              >
                {{ p.codigo }}
              </span>
            </td>
            <td class="p-3">{{ p.nombre }}</td>
            <td class="p-3">
              <span
                :class="p.stock > 0 ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-red-100 text-red-800 border-red-200'"
                class="inline-flex items-center px-2 py-0.5 rounded-full text-xs border"
              >
                {{ p.stock }}
              </span>
            </td>
            <td class="p-3">L. {{ Number(p.precio).toFixed(2) }}</td>
            <td class="p-3">{{ p.vencimiento }}</td>
            <td class="p-3">{{ p.creacion }}</td>
            <td class="p-3">{{ p.proveedor }}</td>
            <td class="p-3 text-center">
              <button
                class="text-indigo-600 hover:underline mr-3"
                @click="$emit('edit', p.codigo)"
              >
                Editar
              </button>
              <button
                class="text-rose-600 hover:underline"
                @click="$emit('delete', p.codigo)"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
defineProps({
  rows: { type: Array, default: () => [] },
  modelValue: { type: String, default: '' }
})
defineEmits(['update:modelValue','edit','delete'])
</script>
