<template>
  <Application class="pixi_app" background="white" :width="width" :height="height">
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

<style scoped lang="scss">
.pixi_app {
  border: 1px solid rgb(200, 200, 200);
}
</style>
