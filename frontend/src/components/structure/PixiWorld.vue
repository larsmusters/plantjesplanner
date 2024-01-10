<template>
  <graphics :x="position.x" :y="position.y" :rotation="position.rotation" :scale="position.scale">
    <slot />
  </graphics>
</template>

<script setup lang="ts">
import type { WorldPosition } from '@/types/index'

defineProps<{
  position: WorldPosition
}>()
</script>
