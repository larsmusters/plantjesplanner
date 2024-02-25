<template>
  <Polygon :config="gardenShellConfig" />
  <Grid v-if="showGrid" />
  <PixiPlant
    v-for="(plant, index) in garden.plants"
    :key="index"
    :plant="plant"
    @update:location="(location: Vector) => updatePlant(location, index)"
    @clicked="plantClicked"
  />
</template>

<script setup lang="ts">
import Polygon from '../graphics/PixiPolygon.vue'
import Grid from './PixiGrid.vue'
import PixiPlant from '../graphics/PixiPlant.vue'
import { computed } from 'vue'
import { useGardenStore, useAppStore, useViewportStore } from '@/stores'
import { Colours, type Plant, type PolygonConfig, type Vector } from '@/types'

const { garden } = useGardenStore()
const appStore = useAppStore()

const showGrid = computed(() => {
  if (appStore.isAddmode) return true
  if (appStore.isEditMode) return true
  return false
})

const gardenShellConfig = computed((): Partial<PolygonConfig> => {
  return {
    hoverFactor: 1,
    vertices: garden.shape,
    lineThickness: 2,
    lineColour: Colours.edge,
    lineAlpha: 0.5,
    fillColour: Colours.inside
  }
})

const updatePlant = (location: Vector, index: number) => {
  garden.plants[index].location = location
}

const viewportStore = useViewportStore()
const plantClicked = (plant: Plant) => {
  viewportStore.plantInfo = plant
  viewportStore.showInfo()
}
</script>
