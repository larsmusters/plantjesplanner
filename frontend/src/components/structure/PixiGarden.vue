<template>
  <GardenShell :path="gardenStore.garden.shape" />
  <template v-for="(bed, index) in gardenStore.garden.beds" :key="bed.id">
    <PixiBed
      :bed="bed"
      @update:hover="raiseBedIndex"
      :edit-mode="gardenStore.clickMode === ClickMode.edit"
      @set-to-cursor:bed-vertex="(vertexId: number) => moveBedVertex(vertexId, index)"
      @set-to-cursor:bed-vertices="
        (dragLoc: Point, ids: number[]) => moveBedVertices(dragLoc, index, ids)
      "
      @set-to-cursor:bed="(dragLoc: Point) => moveBedVertices(dragLoc, index)"
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
import {
  relativeToGardenArray,
  vectorSum,
  gardenToRelative,
  moveOriginArray,
  gardenToRelativeArray
} from '@/utils'
import { movePointToGrid, findClosestPair } from '@/utils/grid'
import type { Point } from '@/types/garden'

const app = ref<ApplicationInst>()
const raiseBedIndex = (container: Container) => {
  app.value?.app.stage.sortChildren()
  const highestIndex = (app.value?.app.stage.children.length || 1) - 1
  app.value?.app.stage.setChildIndex(container, highestIndex)
}

const gardenStore = useGardenStore()
const gridStore = useGridStore()

const moveBedVertex = (vertexId: number, bedId: number) => {
  const bed = gardenStore.garden.beds[bedId]
  const snapLocation = movePointToGrid(gardenStore.cursor, gridStore.vertices)
  const newBedPoint = gardenToRelative(bed.location, snapLocation)
  bed.shape[vertexId] = { ...bed.shape[vertexId], ...newBedPoint }
}

const moveBedVertices = (dragLoc: Point, bedId: number, ids?: number[]) => {
  const bed = gardenStore.garden.beds[bedId]
  // if ids is not given, all vertices of the bed are moved.
  let moveIds = ids ? ids : bed.shape.map((_, i) => i)
  let bedVertices: Point[] = moveIds.map((id) => bed.shape[id])
  bedVertices = moveOriginArray(bedVertices, dragLoc)
  bedVertices = relativeToGardenArray(gardenStore.cursor, bedVertices)

  const closestVertices = findClosestPair(bedVertices, gridStore.vertices)
  const matchLocationBed = bed.shape[moveIds[closestVertices.pointId]]
  const matchLocationGrid = gridStore.vertices[closestVertices.vertexId]
  // gridPoint - bedPoint = bed.location
  const newBedLocation = vectorSum(matchLocationGrid, matchLocationBed, 1, -1)

  if (ids) {
    // To move only part of a bed, you have to move the bed ánd move unselected vertices in the opposite direction.
    let unmovedVertices = relativeToGardenArray(bed.location, bed.shape)
    unmovedVertices = gardenToRelativeArray(newBedLocation, unmovedVertices)
    unmovedVertices.forEach((unmovedVertex, i) => {
      if (ids.includes(i)) return
      bed.shape[i] = { ...bed.shape[i], ...unmovedVertex }
    })
  }

  bed.location = newBedLocation
}
</script>
