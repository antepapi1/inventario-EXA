<template>
  <div class="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white text-gray-800">
    <header class="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white shadow">
      <div class="max-w-5xl mx-auto px-4 py-5 flex items-center justify-between">
        <h1 class="text-2xl font-bold tracking-tight">CONTROL DE INVETARIO</h1>
        <span class="text-sm opacity-90">EXAMEN 1 VANGUARDIA</span>
      </div>
    </header>

    <main class="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <Alert :type="alert.type" :msg="alert.msg" />

      <ProductForm ref="formRef" @save="handleSave" />

      <ProductTable
        :rows="filtrados"
        :model-value="q"
        @update:modelValue="val => q = val"
        @edit="onEdit"
        @delete="eliminar"
      />
    </main>

    <footer class="text-center text-xs text-gray-500 py-8">
      &copy; {{ year }} COMPANIA. Todos los derechos reservados EXAMEN 1 31941324.
    </footer>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import Alert from './components/Alert.vue'
import ProductForm from './components/ProductForm.vue'
import ProductTable from './components/ProductTable.vue'
import { useInventario } from './composables/useInventario'

const { productos, filtrados, q, alert, setAlert, upsert, eliminar } = useInventario()
const formRef = ref(null)
const year = new Date().getFullYear()

function handleSave(payload) {
  const ok = upsert(payload)
  if (ok) {
    // si fue inserción, limpiar; si fue edición exitosa, también limpiamos
    formRef.value?.limpiar()
  }
}

function onEdit(id) {
  const p = productos.value.find(x => x.codigo === id)
  if (!p) return
  nextTick(() => {
    const f = formRef.value?.form
    if (!f) return
    f._edit = true
    f.codigo = p.codigo
    f.nombre = p.nombre
    f.stock = p.stock
    f.precio = p.precio
    f.vencimiento = p.vencimiento
    f.creacion = p.creacion
    f.proveedor = p.proveedor
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}
</script>
