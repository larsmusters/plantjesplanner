<template>
  <GardenShell :path="gardenStore.garden.shape" />
  <template v-for="(bed, index) in gardenStore.garden.beds" :key="bed.id">
    <PixiBed
      :bed="bed"
      @update:hover="raiseBedIndex"
      :edit-mode="gardenStore.clickMode === ClickMode.edit"
      @set-to-cursor:bed-vertex="(vertexId: number) => moveBedVertex(vertexId, index)"
      @set-to-cursor:bed-edge="(v1Id: number, v2Id: number) => moveBedEdge(v1Id, v2Id, index)"
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
import { bedToGarden, vectorSum, getMidpoint, gardenToBed } from '@/utils'

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

const moveBedEdge = (v1Id: number, v2Id: number, bedId: number) => {
  // Get halfway-point as that is where the cursor should be.
  const bed = gardenStore.garden.beds[bedId]
  const shape = bed.shape

  // Bed space
  const v1 = shape[v1Id]
  const v2 = shape[v2Id]
  const midpoint = getMidpoint(v1, v2)

  // Get pointing vector to the two vertices
  const midpointToV1 = vectorSum(midpoint, v1, -1, 1)
  const midpointToV2 = vectorSum(midpoint, v2, -1, 1)

  // vertices in garden space
  const vertices = [
    vectorSum(gardenStore.gardenCursor, midpointToV1),
    vectorSum(gardenStore.gardenCursor, midpointToV2)
  ]

  const closestVertices = gridStore.findClosestVertices(vertices)

  if (closestVertices.id === 0) {
    const v1New = gridStore.vertices[closestVertices.gridId]
    const v1Bed = gardenToBed([v1New], bed.location)[0]
    gardenStore.garden.beds[bedId].shape[v1Id] = v1Bed

    const v1ToV2 = vectorSum(v1, v2, -1, 1)
    gardenStore.garden.beds[bedId].shape[v2Id] = vectorSum(v1Bed, v1ToV2)
  } else {
    const v2New = gridStore.vertices[closestVertices.gridId]
    const v2Bed = gardenToBed([v2New], bed.location)[0]
    gardenStore.garden.beds[bedId].shape[v2Id] = v2Bed

    const v2ToV1 = vectorSum(v2, v1, -1, 1)
    gardenStore.garden.beds[bedId].shape[v1Id] = vectorSum(v2Bed, v2ToV1)
  }
}

const moveBed = (bedId: number) => {
  const bedVertices = bedToGarden(gardenStore.garden.beds[bedId].shape, gardenStore.gardenCursor)
  const closestVertices = gridStore.findClosestVertices(bedVertices)

  const matchLocationBed = gardenStore.garden.beds[bedId].shape[closestVertices.id]
  const matchLocationGrid = gridStore.vertices[closestVertices.gridId]
  gardenStore.garden.beds[bedId].location = vectorSum(matchLocationBed, matchLocationGrid, -1)
}
</script>
