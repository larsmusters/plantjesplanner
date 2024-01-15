import type { Bed, Garden, Point } from '@/types/garden'
import { ClickMode, type Position } from '@/types'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fakeGarden } from '@/assets/garden'
import { defaultNewBed } from '@/assets/bed'
import { Spritesheet } from 'pixi.js'

export const useGardenStore = defineStore('garden', () => {
  const garden = ref<Garden>(fakeGarden)
  const gardenRef = ref()

  const position = ref<Position>({ x: 0, y: 0, scale: 1, rotation: 0 })
  const clickMode = ref<ClickMode>(ClickMode.edit)

  const newBed = ref<Bed>(defaultNewBed)
  const spritesheet = ref<Spritesheet>()

  const gardenCursor = ref({ x: 0, y: 0 })
  const updateCursor = (cursor: Point) => {
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
    return { x: xMin, y: yMin, width: xMax - xMin, height: yMax - yMin }
  })

  return {
    garden,
    clickMode,
    bounds,
    position,
    gardenCursor,
    newBed,
    updateCursor,
    spritesheet,
    gardenRef
  }
})
