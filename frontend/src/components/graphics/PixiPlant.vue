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
  </container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSprites } from '@/composables/useSprites'
import type { Plant } from '@/types'

const props = defineProps<{
  plant: Plant
}>()

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
</script>
