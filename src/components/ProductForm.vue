<template>
  <section class="bg-white rounded-2xl shadow-sm border p-6">
    <h2 class="text-lg font-semibold mb-4 text-indigo-700">Producto</h2>

    <form @submit.prevent="onSubmit" class="grid md:grid-cols-2 gap-4">
      <!-- Código (manual/generado) -->
      <div>
        <label class="block text-sm font-medium mb-1">Código de producto</label>
        <div class="flex gap-2">
          <input v-model.trim="form.codigo"
                 class="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                 placeholder="ej. PRD-0001 (vacío = generar)"/>
          <button type="button" @click="generar"
                  class="shrink-0 rounded-lg bg-amber-500 hover:bg-amber-400 text-white px-3 py-2 font-medium transition">
            Generar
          </button>
        </div>
        <p class="text-xs text-gray-500 mt-1">Si lo dejas vacío, se generará automáticamente.</p>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Nombre</label>
        <input v-model.trim="form.nombre" class="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-indigo-500"/>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Stock</label>
        <input v-model.number="form.stock" type="number" min="0" class="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-indigo-500"/>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Precio</label>
        <input v-model.number="form.precio" type="number" step="0.01" min="0" class="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-indigo-500"/>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Fecha de vencimiento</label>
        <input v-model="form.vencimiento" type="date" class="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-indigo-500"/>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Fecha de creación</label>
        <input v-model="form.creacion" type="date" class="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-indigo-500"/>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Proveedor</label>
        <input v-model.trim="form.proveedor" class="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-indigo-500"/>
      </div>

      <div class="md:col-span-2 flex items-center gap-3 pt-2">
        <button class="rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 font-medium transition">
          {{ form._edit ? 'Actualizar' : 'Guardar' }}
        </button>
        <button type="button" @click="limpiar" class="rounded-xl border px-5 py-2.5 font-medium hover:bg-gray-50 transition">
          Limpiar
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import { uid } from 'uid'

const emit = defineEmits(['save'])
const today = new Date().toISOString().slice(0,10)

const form = reactive({
  _edit: false,
  codigo: '',
  nombre: '',
  stock: null,
  precio: null,
  vencimiento: '',
  creacion: today,
  proveedor: ''
})

function generar() {
  form.codigo = `PRD-${uid().slice(0,6).toUpperCase()}`
}
function limpiar() {
  form._edit = false
  form.codigo = ''
  form.nombre = ''
  form.stock = null
  form.precio = null
  form.vencimiento = ''
  form.creacion = today
  form.proveedor = ''
}
function onSubmit() {
  emit('save', { ...form })
  // si fue inserción exitosa, el padre decidirá limpiar
}

defineExpose({ form, limpiar, generar })
</script>
