<template>
  <container :position="plant.location">
    <template v-if="plant.leaf && plant.leaf[period]">
      <sprite
        v-for="(leaf, index) in getLeafPattern(7, plant.leaf[period].radius)"
        :key="index"
        :x="leaf.x"
        :y="leaf.y"
        :rotation="leaf.angle"
        :texture="leafSprite!"
        :scale="plant.leaf[period].spriteScale"
      />
    </template>
    <template v-if="plant.flower && plant.flower[period]">
      <sprite :texture="flowerSprite!" :scale="plant.flower[period].spriteScale" />
    </template>
    <template v-if="plant.fruit && plant.fruit[period]">
      <sprite :texture="fruitSprite!" :scale="plant.fruit[period].spriteScale" />
    </template>
    <Circle
      v-if="appStore.isEditMode || appStore.isSelectmode"
      :config="selectionCircleConfig"
      @click="emit('clicked', props.plant)"
      @drag="dragging"
    />
  </container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSprites } from '@/composables/useSprites'
import { Colours, type CircleConfig, type Plant, type Vector } from '@/types'
import Circle from './PixiCircle.vue'
import { useAppStore, useGardenStore, useGridStore, useViewportStore } from '@/stores'
import { VectorUtil } from '@/utils/vectorUtil'

const props = defineProps<{
  plant: Plant
}>()

const appStore = useAppStore()

const { getSprite } = useSprites()
const leafSprite = computed(() => getSprite(props.plant.leaf[period.value].spriteId))
const flowerSprite = computed(() => getSprite(props.plant.flower[period.value].spriteId))
const fruitSprite = computed(() => getSprite(props.plant.fruit[period.value].spriteId))

const getLeafPattern = (n: number, radius: number) => {
  // Generates a circle of coordinates centered around 0,0
  const angleIncrement = (2 * Math.PI) / n
  const points: { x: number; y: number; angle: number }[] = []

  for (var i = 0; i < n; ++i) {
    const angle = i * angleIncrement
    const x = radius * Math.cos(angle)
    const y = radius * Math.sin(angle)
    points.push({ x, y, angle: angle + 0.5 * Math.PI })
  }
  return points
}

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

const selectionCircleConfig: Partial<CircleConfig> = {
  radius: 180,
  hoverFactor: 1,
  fillAlpha: 0,
  lineColour: Colours.blue,
  lineThickness: 10,
  lineAlpha: 1
}
</script>
