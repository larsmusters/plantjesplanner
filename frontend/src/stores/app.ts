import { ClickMode } from '@/types'
import { defineStore } from 'pinia'
import { Application, type Container, type ICanvas } from 'pixi.js'
import { ref, computed } from 'vue'

type ClickModeValues = `${ClickMode}`

export const useAppStore = defineStore('app', () => {
  const app = ref<Application<ICanvas>>()

  const clickMode = ref<ClickMode>(ClickMode.edit)
  const isEditMode = computed(() => clickMode.value === ClickMode.edit)
  const isAddmode = computed(() => clickMode.value === ClickMode.add)
  const isSelectmode = computed(() => clickMode.value === ClickMode.select)
  const setClickMode = (mode: ClickModeValues) => {
    clickMode.value = ClickMode[mode]
  }

  const raiseBedIndex = (container: Container) => {
    app.value?.stage.sortChildren()
    const highestIndex = (app.value?.stage.children.length || 1) - 1
    app.value?.stage.setChildIndex(container, highestIndex)
  }

  return {
    setClickMode,
    raiseBedIndex,
    app,
    clickMode,
    isEditMode,
    isAddmode,
    isSelectmode
  }
})
