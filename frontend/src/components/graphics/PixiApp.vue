<template>
  <Application background="white" :width="width" :height="height">
    <PixiGarden />
    <ToolTip />
  </Application>
</template>

<script setup lang="ts">
import ToolTip from '@/components/graphics/PixiToolTip.vue'
import { Application } from 'vue3-pixi'
import PixiGarden from './PixiGarden.vue'

defineProps<{
  width: number
  height: number
}>()
</script>
