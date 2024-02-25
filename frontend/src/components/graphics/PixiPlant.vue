<template>
  <container :position="plant.location">
    <template v-if="plant.leaf">
      <sprite
        v-for="(leaf, index) in getLeafPattern(7, 120)"
        :key="index"
        :cache-as-bitmap="true"
        :x="leaf.x"
        :y="leaf.y"
        :rotation="leaf.angle"
        :texture="leafSprite!"
        :scale="plant.leaf.spriteScale"
      />
    </template>
    <sprite v-if="plant.flower" :texture="flowerSprite!" :scale="plant.flower.spriteScale" />
    <Circle
      v-if="appStore.isEditMode || appStore.isSelectmode"
      :config="selectionCircleConfig"
      @click="clicked"
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
const leafSprite = computed(() => getSprite(props.plant.leaf?.spriteId))
const flowerSprite = computed(() => getSprite(props.plant.flower?.spriteId))

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
const clicked = () => {
  viewportStore.plantInfo = props.plant
  viewportStore.showInfo()
}

const emit = defineEmits<{ (e: 'update:location', location: Vector): void }>()

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
