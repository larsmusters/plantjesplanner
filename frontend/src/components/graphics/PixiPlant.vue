<template>
  <template v-if="animation.length">
    <container v-for="(loc, index) in animationLocations" :x="loc.x" :y="loc.y" :key="index">
      <animated-sprite
        :textures="animation"
        playing
        :animation-speed="0.04"
        :scale="bed.plant.animationScale"
      />
      <template v-if="bed.plant.leaf">
        <animated-sprite
          v-for="(leaf, index) in getLeafPattern(7, bed.plant.leaf.radius)"
          :key="index"
          :cache-as-bitmap="true"
          :position="leaf"
          :textures="leafAnimation"
          :scale="bed.plant.leaf.scale"
        />
      </template>
    </container>
  </template>
</template>

<script setup lang="ts">
import { useGardenStore, useGridStore } from '@/stores'
import type { Bed } from '@/types'
import { VectorUtil } from '@/utils/vectorUtil'
import { computed } from 'vue'
import type { Vector } from '@/types'
import { useSprites } from '@/composables/useSprites'

const props = defineProps<{
  bed: Bed
}>()

const VUtil = new VectorUtil()
const gardenStore = useGardenStore()
const gridStore = useGridStore()

const animation = computed(() => getAnimation(props.bed.plant.animationId) || [])

const { getAnimation } = useSprites()
const leafAnimation = computed(() => {
  if (!props.bed.plant.leaf) return []
  return getAnimation(props.bed.plant.leaf?.animationId) || []
})

const animationLocations = computed(() => {
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
  const points: Vector[] = []

  for (var i = 0; i < n; ++i) {
    const angle = i * angleIncrement
    const x = radius * Math.cos(angle)
    const y = radius * Math.sin(angle)
    points.push({ x, y })
  }
  return points
}
</script>
