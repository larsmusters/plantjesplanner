<template>
  <GardenShell :path="gardenStore.garden.shape" />
  <template v-for="(bed, index) in gardenStore.garden.beds" :key="bed.id">
    <PixiBed
      :bed="bed"
      @update:hover="raiseBedIndex"
      :edit-mode="gardenStore.clickMode === ClickMode.edit"
      @set-to-cursor:bed-vertex="(vertexId: number) => moveBedVertex(vertexId, index)"
      @set-to-cursor:bed="moveBed(index)"
    />
  </template>
</template>

<script setup lang="ts">
import PixiBed from '@/components/graphics/bed/PixiBed.vue'
import GardenShell from '@/components/graphics/PixiGardenShell.vue'
import { ref } from 'vue'
import { type ApplicationInst } from 'vue3-pixi'
import { Container } from 'pixi.js'
import { useGardenStore } from '@/stores'
import { ClickMode } from '@/types'
import { useGridStore } from '@/stores/grid'
import { bedToGarden, vectorSum } from '@/utils'

const app = ref<ApplicationInst>()
const raiseBedIndex = (container: Container) => {
  app.value?.app.stage.sortChildren()
  const highestIndex = (app.value?.app.stage.children.length || 1) - 1
  app.value?.app.stage.setChildIndex(container, highestIndex)
}

const gardenStore = useGardenStore()
const gridStore = useGridStore()

const moveBedVertex = (vertexId: number, bedId: number) => {
  const snapLocation = gridStore.getSnappingVertex([gardenStore.gardenCursor])

  const newPoint = vectorSum(gardenStore.garden.beds[bedId].location, snapLocation, -1)
  gardenStore.garden.beds[bedId].shape[vertexId] = newPoint
}

const moveBed = (bedId: number) => {
  const bedVertices = bedToGarden(gardenStore.garden.beds[bedId].shape, gardenStore.gardenCursor)
  const closestVertices = gridStore.findClosestVertices(bedVertices)

  const matchLocationBed = gardenStore.newBed.shape[closestVertices.id]
  const matchLocationGrid = gridStore.vertices[closestVertices.gridId]
  gardenStore.garden.beds[bedId].location = vectorSum(matchLocationBed, matchLocationGrid, -1, 1)
}
</script>
