import type { Bed, Garden } from '@/types/garden'
import { ClickMode } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Colours } from '@/types/colours'
import { useApplication, useStage } from 'vue3-pixi'

const defaultNewBed: Bed = {
  id: 4,
  shape: [
    { x: -30, y: -30, radius: 0 },
    { x: 30, y: -30, radius: 0 },
    { x: 30, y: 30, radius: 0 },
    { x: -30, y: 30, radius: 0 }
  ],
  color: Colours.blue,
  location: { x: 0, y: 0 },
  plant: 'madelief',
  heightOnHover: 1,
  animation: [],
  animationScale: 0.5
}

export const useGardenStore = defineStore('garden', () => {
  const garden = ref<Garden>()
  const clickMode = ref<ClickMode>(ClickMode.add)
  const scale = ref<number>(1)

  const app = useApplication()
  const stage = useStage()

  const addBed = (newBed: Partial<Bed>) => {
    // find new id
    const bed = { ...defaultNewBed, ...newBed }
    garden.value?.beds.push(bed)
    app.value.render()
    stage.value.render
  }
  return { garden, clickMode, addBed }
})
