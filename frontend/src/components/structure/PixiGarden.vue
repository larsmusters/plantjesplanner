<template>
  <Polygon :config="gardenShellConfig" />
  <Grid v-if="showGrid" />
  <Plant v-for="(plant, index) in gardenStore.garden.plants" :key="index" :plant="plant" />
</template>

<script setup lang="ts">
import Polygon from '../graphics/PixiPolygon.vue'
import Grid from './PixiGrid.vue'
import Plant from '../graphics/PixiPlant.vue'
import { computed } from 'vue'
import { useGardenStore, useAppStore } from '@/stores'
import { Colours, type PolygonConfig } from '@/types'

const gardenStore = useGardenStore()
const appStore = useAppStore()

const showGrid = computed(() => {
  if (appStore.isAddmode) return true
  if (appStore.isEditMode) return true
  return false
})

const gardenShellConfig = computed((): Partial<PolygonConfig> => {
  return {
    hoverFactor: 1,
    vertices: gardenStore.garden.shape,
    lineThickness: 2,
    lineColour: Colours.edge,
    lineAlpha: 0.5,
    fillColour: Colours.inside
  }
})
</script>
