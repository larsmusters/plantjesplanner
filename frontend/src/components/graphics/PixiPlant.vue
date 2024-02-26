<template>
  <container :position="plant.location">
    <Circle
      v-if="appStore.isEditMode || appStore.isSelectmode"
      :config="selectionCircleConfig"
      @click="emit('clicked', props.plant)"
      @drag="dragging"
    />
    <template v-if="plant.iconId[period]">
      <sprite :texture="fruitSprite!" :scale="plant.iconScale[period]" />
    </template>
  </container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSprites } from '@/composables/useSprites'
import type { CircleConfig, Plant, Vector } from '@/types'
import Circle from './PixiCircle.vue'
import { useAppStore, useGardenStore, useGridStore, useViewportStore } from '@/stores'
import { VectorUtil } from '@/utils/vectorUtil'

const props = defineProps<{
  plant: Plant
}>()

const appStore = useAppStore()

const { getSprite } = useSprites()
const fruitSprite = computed(() => getSprite(props.plant.iconId[period.value]))

const viewportStore = useViewportStore()
const period = computed(() => viewportStore.month)

const emit = defineEmits<{
  (e: 'update:location', location: Vector): void
  (e: 'clicked', plant: Plant): void
}>()

const VUtil = new VectorUtil()
const gardenStore = useGardenStore()
const { vertices: snapOptions } = useGridStore()
const dragging = (dragLoc: Vector) => {
  if (!appStore.isEditMode) return
  // Location of plant relative to cursor dragging location
  const plantLoc = VUtil.sub(gardenStore.cursor, dragLoc)
  const SuggestedLocation = VUtil.moveToGrid(plantLoc, snapOptions, 100)
  emit('update:location', SuggestedLocation)
}

const selectionCircleConfig = computed((): Partial<CircleConfig> => {
  return {
    radius: 180,
    hoverFactor: 1,
    fillAlpha: 0.5,
    lineColour: props.plant.colour[period.value],
    fillColour: props.plant.colour[period.value],
    lineThickness: 10,
    lineAlpha: 1
  }
})
</script>
