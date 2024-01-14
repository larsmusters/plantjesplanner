<template>
  <container :position="position">
    <PixiBed
      v-if="gardenStore.clickMode === ClickMode.add"
      :scale="gardenStore.position.scale"
      :bed="gardenStore.newBed"
      @click:bed="addBed"
    />
  </container>
</template>

<script setup lang="ts">
import { useGridStore } from '@/stores/grid'
import PixiBed from '../graphics/bed/PixiBed.vue'
import { useGardenStore } from '@/stores'
import { ClickMode } from '@/types'
import { computed } from 'vue'
import { gardenToWorld, vectorSum, pointsDistance, worldToGarden } from '@/utils'

const gardenStore = useGardenStore()

const addBed = () => {
  // Get nested data from new or uniquely referenced data
  const location = worldToGarden(position.value)
  const shape = JSON.parse(JSON.stringify(gardenStore.newBed.shape))
  const newBed = Object.assign({ ...gardenStore.newBed, location, shape })
  gardenStore.garden.beds.push(newBed)

  gardenStore.clickMode = ClickMode.select
}

const gridStore = useGridStore()

const closestVertices = computed(() => {
  // Garden space
  const newBedVertices = gardenStore.newBed.shape.map((point) => {
    return vectorSum(gardenStore.gardenCursor, point)
  })

  return newBedVertices.reduce(
    (closestMatch, bedVertex, i) => {
      // For one vertex on the bed, find the nearest grid point
      const closestPoint = gridStore.vertices.reduce(
        (closestPoint, v, i) => {
          const dist = pointsDistance(bedVertex, v)
          return dist < closestPoint.dist ? { id: i, dist: dist } : closestPoint
        },
        { id: -1, dist: 1000 }
      )
      // Replace closest match when one bed vertex has a better match than the other
      return closestPoint.dist < closestMatch.dist
        ? { bedId: i, gridId: closestPoint.id, dist: closestPoint.dist }
        : closestMatch
    },
    { bedId: -1, gridId: -1, dist: 1000 }
  )
})

// World space
const position = computed(() => {
  // Garden space
  const matchLocationGrid = gridStore.vertices[closestVertices.value.gridId]
  const matchLocationBed = gardenStore.newBed.shape[closestVertices.value.bedId]
  return gardenToWorld(vectorSum(matchLocationBed, matchLocationGrid, -1, 1))
})
</script>
