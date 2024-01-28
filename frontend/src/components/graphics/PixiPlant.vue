<template>
  <template v-if="animation.length">
    <animated-sprite
      v-for="(loc, index) in animationLocations"
      :key="index"
      :textures="animation"
      playing
      :animation-speed="0.04"
      :x="loc.x"
      :y="loc.y"
      :scale="bed.plant.animationScale"
    />
  </template>
</template>

<script setup lang="ts">
import { useGardenStore } from '@/stores/garden'
import { useGridStore } from '@/stores/grid'
import type { Bed } from '@/types/garden'
import { VectorUtil } from '@/utils/vectorUtil'
import { computed } from 'vue'

const props = defineProps<{
  bed: Bed
}>()

const VUtil = new VectorUtil()
const gardenStore = useGardenStore()
const gridStore = useGridStore()

const animation = computed(
  () => gardenStore.spritesheet?.animations[props.bed.plant.animationId] || []
)

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
</script>
