import type { Bed, Garden, Vector } from '@/types/garden'
import { type Position } from '@/types'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fakeGarden } from '@/assets/garden'
import { bedLibrary } from '@/config/bedLibrary'
import { worldToGarden } from '@/utils'

export const useGardenStore = defineStore('garden', () => {
  const garden = ref<Garden>(fakeGarden)
  const newBed = ref<Bed>(bedLibrary[0])
  const position = ref<Position>({ x: 0, y: 0, scale: 1, rotation: 0 })
  const cursor = ref<Vector>({ x: 0, y: 0 })

  const updateCursor = (newCursor: Vector) => (cursor.value = worldToGarden(newCursor))

  const bounds = computed(() => {
    let [xMin, xMax, yMin, yMax] = [1e6, -1e6, 1e6, -1e6]
    garden.value.shape.forEach((point) => {
      xMin = xMin > point.x ? point.x : xMin
      xMax = xMax < point.x ? point.x : xMax
      yMin = yMin > point.y ? point.y : yMin
      yMax = yMax < point.y ? point.y : yMax
    })
    return { x: xMin, y: yMin, width: xMax - xMin, height: yMax - yMin }
  })

  const getBounds = (bed: Bed) => {
    let [xMin, xMax, yMin, yMax] = [1e6, -1e6, 1e6, -1e6]
    bed.shape.forEach((point) => {
      xMin = xMin > point.x ? point.x : xMin
      xMax = xMax < point.x ? point.x : xMax
      yMin = yMin > point.y ? point.y : yMin
      yMax = yMax < point.y ? point.y : yMax
    })
    return { x: xMin, y: yMin, width: xMax - xMin, height: yMax - yMin }
  }

  return {
    garden,
    bounds,
    position,
    cursor,
    newBed,
    updateCursor,
    getBounds
  }
})
