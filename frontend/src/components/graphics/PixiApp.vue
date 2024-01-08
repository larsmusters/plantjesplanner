<template>
  <Application ref="app" background="white" :width="width" :height="height">
    <PixiGarden />
  </Application>
</template>

<script setup lang="ts">
import { Application } from 'vue3-pixi'
import PixiGarden from './PixiGarden.vue'

defineProps<{
  width: number
  height: number
}>()
</script>
