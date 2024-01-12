import type { Bed, Garden } from '@/types/garden'
import { ClickMode, type Position } from '@/types'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fakeGarden } from '@/assets/garden'
import { defaultNewBed } from '@/assets/bed'

export const useGardenStore = defineStore('garden', () => {
  const garden = ref<Garden>(fakeGarden)
  const position = ref<Position>({ x: 0, y: 0, scale: 1, rotation: 0 })
  const clickMode = ref<ClickMode>(ClickMode.add)

  const newBed = ref<Bed>(defaultNewBed)

  const gardenCursor = ref({ x: 0, y: 0 })
  const updateCursor = (cursor: { x: number; y: number }) => {
    gardenCursor.value = {
      x: (cursor.x - position.value.x) / position.value.scale,
      y: (cursor.y - position.value.y) / position.value.scale
    }
  }

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
  return { garden, clickMode, bounds, position, gardenCursor, newBed, updateCursor }
})
