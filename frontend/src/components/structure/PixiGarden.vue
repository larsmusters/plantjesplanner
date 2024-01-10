<template>
  <GardenEdge :path="garden.shape" />
  <template v-for="bed in garden.beds" :key="bed.id">
    <PixiBed :bed="bed" @update:hover="raiseBedIndex" @click:bed="bedClicked" />
  </template>
</template>

<script setup lang="ts">
import PixiBed from '@/components/graphics/PixiBed.vue'
import GardenEdge from '@/components/graphics/PixiGardenEdge.vue'
import { ref } from 'vue'
import type { ApplicationInst } from 'vue3-pixi'
import { Container } from 'pixi.js'
import type { Garden } from '@/types/garden'

defineProps<{
  garden: Garden
}>()

const app = ref<ApplicationInst>()
const raiseBedIndex = (container: Container) => {
  app.value?.app.stage.sortChildren()
  const highestIndex = (app.value?.app.stage.children.length || 1) - 1
  app.value?.app.stage.setChildIndex(container, highestIndex)
}

const bedClicked = (container: Container) => {
  console.log('bed Clicked!')
}
</script>
