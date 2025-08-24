import { ref, computed, watch } from 'vue'
import { uid } from 'uid'

const LS_KEY = 'productos_bodega_min_colores'

export function useInventario() {
  const productos = ref([])
  const q = ref('')
  const alert = ref({ type: '', msg: '' })

  function setAlert(type, msg) {
    alert.value = { type, msg }
    setTimeout(() => (alert.value = { type: '', msg: '' }), 3000)
  }

  function cargar() {
    try { productos.value = JSON.parse(localStorage.getItem(LS_KEY)) || [] }
    catch { productos.value = [] }
  }
  function guardarLS() {
    localStorage.setItem(LS_KEY, JSON.stringify(productos.value))
  }
  watch(productos, guardarLS, { deep: true })
  cargar()

  function upsert(form) {
    // validación básica
    if (!form.nombre || form.stock===null || form.precio===null ||
        !form.vencimiento || !form.creacion || !form.proveedor) {
      setAlert('error', 'todos los campos son obligatorios')
      return false
    }
    if (Number(form.stock) < 0 || Number(form.precio) < 0) {
      setAlert('error', 'stock y precio no pueden ser negativos')
      return false
    }

    // código final (manual o generado)
    const finalCode = (form.codigo?.trim() || `PRD-${uid().slice(0,6).toUpperCase()}`)

    if (form._edit) {
      const i = productos.value.findIndex(x => x.codigo === form.codigo)
      if (i >= 0) {
        productos.value[i] = { ...form, codigo: finalCode, _edit: undefined }
        setAlert('ok', 'producto actualizado correctamente')
      }
    } else {
      if (form.codigo && productos.value.some(p => p.codigo === form.codigo)) {
        setAlert('error', 'el código de producto ya existe')
        return false
      }
      productos.value.push({ ...form, codigo: finalCode, _edit: undefined })
      setAlert('ok', 'producto almacenado correctamente')
    }
    return true
  }

  function eliminar(id) {
    const p = productos.value.find(x => x.codigo === id)
    if (!p) return
    if (!confirm(`¿Seguro que desea eliminar el producto:\n${p.nombre}?`)) return
    productos.value = productos.value.filter(x => x.codigo !== id)
    setAlert('ok', 'producto eliminado correctamente')
  }

  const filtrados = computed(() => {
    const s = q.value.trim().toLowerCase()
    if (!s) return productos.value
    return productos.value.filter(p =>
      p.nombre.toLowerCase().includes(s) ||
      p.proveedor.toLowerCase().includes(s) ||
      p.codigo.toLowerCase().includes(s)
    )
  })

  return { productos, filtrados, q, alert, setAlert, upsert, eliminar }
}
