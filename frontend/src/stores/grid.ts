import { defineStore } from 'pinia'
import { computed, ref, type ComputedRef } from 'vue'
import { useGardenStore } from '.'
import type { PolygonPoint } from '@/types/garden'

export const useGridStore = defineStore('grid', () => {
  const nLines = ref({ columns: 11, rows: 11 })

  const columns = computed(() => {
    const gardenStore = useGardenStore()

    const array = new Array(nLines.value.columns).fill(1)
    const resolution = gardenStore.bounds.width / (nLines.value.columns - 1)
    return array.map((_, i) => i * resolution + gardenStore.bounds.x)
  })

  const rows = computed(() => {
    const gardenStore = useGardenStore()

    const array = new Array(nLines.value.rows).fill(1)
    const resolution = gardenStore.bounds.height / (nLines.value.rows - 1)
    return array.map((_, i) => i * resolution + gardenStore.bounds.y)
  })

  const vertices: ComputedRef<PolygonPoint[]> = computed(() => {
    // current grid is very simple: all points on intersections between rows and columns
    const v: PolygonPoint[] = []

    columns.value.forEach((x) => {
      rows.value.forEach((y) => {
        v.push({ x, y })
      })
    })
    return v
  })

  return { columns, rows, vertices }
})
