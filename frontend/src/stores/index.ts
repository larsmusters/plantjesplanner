import type { Bed, Garden } from '@/types/garden'
import { ClickMode, type Position } from '@/types'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fakeGarden } from '@/config'

export const useGardenStore = defineStore('garden', () => {
  const garden = ref<Garden>(fakeGarden)
  const clickMode = ref<ClickMode>(ClickMode.add)
  const globalCursor = ref({ x: 0, y: 0 })

  const position = ref<Position>({ x: 0, y: 0, scale: 1, rotation: 0 })

  const gardenCursor = computed(() => {
    const x = (globalCursor.value.x - position.value.x) / position.value.scale
    const y = (globalCursor.value.y - position.value.y) / position.value.scale
    return { x, y }
  })

  const bounds = computed(() => {
    let [xMin, xMax, yMin, yMax] = [1e6, -1e6, 1e6, -1e6]
    garden.value.shape.forEach((point) => {
      xMin = xMin > point.x ? point.x : xMin
      xMax = xMax < point.x ? point.x : xMax
      yMin = yMin > point.y ? point.y : yMin
      yMax = yMax < point.y ? point.y : yMax
    })
    return { xMin, xMax, yMin, yMax }
  })
  return { garden, clickMode, globalCursor, bounds, position, gardenCursor }
})
