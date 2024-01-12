<template>
  <GardenShell :path="gardenStore.garden.shape" />
  <template v-for="bed in gardenStore.garden.beds" :key="bed.id">
    <PixiBed :bed="bed" @update:hover="raiseBedIndex" @click:bed="bedClicked" />
  </template>
  <PixiBed v-if="gardenStore.clickMode === ClickMode.add" :bed="newBed" @click:bed="addBed" />
</template>

<script setup lang="ts">
import PixiBed from '@/components/graphics/bed/PixiBed.vue'
import GardenShell from '@/components/graphics/PixiGardenShell.vue'
import { ref, computed } from 'vue'
import { type ApplicationInst } from 'vue3-pixi'
import { Container } from 'pixi.js'
import { useGardenStore } from '@/stores'
import { ClickMode } from '@/types'
import { defaultNewBed } from '@/config/shapes'

const app = ref<ApplicationInst>()
const raiseBedIndex = (container: Container) => {
  app.value?.app.stage.sortChildren()
  const highestIndex = (app.value?.app.stage.children.length || 1) - 1
  app.value?.app.stage.setChildIndex(container, highestIndex)
}

const newBed = computed(() => {
  const cursor = gardenStore.gardenCursor

  return { ...defaultNewBed, location: { x: cursor.x, y: cursor.y } }
})

const bedClicked = (container: Container) => {
  console.log('bed Clicked!')
}

const gardenStore = useGardenStore()

const addBed = (container: Container) => {
  gardenStore.garden.beds.push(newBed.value)
  gardenStore.clickMode = ClickMode.select
}
</script>
