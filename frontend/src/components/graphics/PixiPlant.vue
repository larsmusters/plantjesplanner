<template>
  <container v-for="(loc, index) in spriteLocations" :x="loc.x" :y="loc.y" :key="index">
    <template v-if="bed.plant.leaf">
      <sprite
        v-for="(leaf, index) in getLeafPattern(7, 120)"
        :key="index"
        :cache-as-bitmap="true"
        :x="leaf.x"
        :y="leaf.y"
        :rotation="leaf.angle"
        :texture="leafSprite!"
        :scale="bed.plant.leaf.spriteScale"
      />
    </template>
    <sprite
      v-if="bed.plant.flower"
      :texture="flowerSprite!"
      playing
      :animation-speed="0.04"
      :scale="bed.plant.flower.spriteScale"
    />
  </container>
</template>

<script setup lang="ts">
import { useGardenStore, useGridStore } from '@/stores'
import type { Bed } from '@/types'
import { VectorUtil } from '@/utils/vectorUtil'
import { computed } from 'vue'
import { useSprites } from '@/composables/useSprites'

const props = defineProps<{
  bed: Bed
}>()

const VUtil = new VectorUtil()
const gardenStore = useGardenStore()
const gridStore = useGridStore()

const { getSprite } = useSprites()
const leafSprite = computed(() => getSprite(props.bed.plant.leaf?.spriteId))
const flowerSprite = computed(() => getSprite(props.bed.plant.flower?.spriteId))

const spriteLocations = computed(() => {
  const bounds = gardenStore.getBounds(props.bed)
  const points = VUtil.moveOrigins(props.bed.location, gridStore.vertices)
  const filteredPoints = points.filter((point) => {
    if (point.x <= bounds.x) return false
    if (point.x >= bounds.x + bounds.width) return false
    if (point.y <= bounds.y) return false
    if (point.y >= bounds.y + bounds.height) return false
    return true
  })
  return filteredPoints
})

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
</script>
