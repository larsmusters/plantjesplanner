<template>
  <GardenShell :path="gardenStore.garden.shape" />
  <template v-for="bed in gardenStore.garden.beds" :key="bed.id">
    <PixiBed :bed="bed" @update:hover="raiseBedIndex" />
  </template>
  <PixiBed
    v-if="gardenStore.clickMode === ClickMode.add"
    :bed="gardenStore.newBed"
    @click:bed="addBed"
  />
</template>

<script setup lang="ts">
import PixiBed from '@/components/graphics/bed/PixiBed.vue'
import GardenShell from '@/components/graphics/PixiGardenShell.vue'
import { ref } from 'vue'
import { type ApplicationInst } from 'vue3-pixi'
import { Container } from 'pixi.js'
import { useGardenStore } from '@/stores'
import { ClickMode } from '@/types'

const app = ref<ApplicationInst>()
const raiseBedIndex = (container: Container) => {
  app.value?.app.stage.sortChildren()
  const highestIndex = (app.value?.app.stage.children.length || 1) - 1
  app.value?.app.stage.setChildIndex(container, highestIndex)
}

const gardenStore = useGardenStore()
const addBed = () => {
  gardenStore.garden.beds.push({ ...gardenStore.newBed })
  gardenStore.clickMode = ClickMode.select
}
</script>
