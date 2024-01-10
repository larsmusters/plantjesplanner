<template>
  <graphics>
    <slot />
  </graphics>
</template>

<script setup lang="ts">
import type { WorldPosition } from '@/types/index'

const props = defineProps<{
  position: WorldPosition
}>()
</script>
