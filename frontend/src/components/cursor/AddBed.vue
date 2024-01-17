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
import { relativeToGardenArray, gardenToWorld, vectorSum, worldToGarden } from '@/utils'

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
  // To garden space
  const bedVertices = relativeToGardenArray(gardenStore.cursor, gardenStore.newBed.shape)
  return gridStore.findClosestVertices(bedVertices)
})

// World space
const position = computed(() => {
  // Garden space
  const matchLocationGrid = gridStore.vertices[closestVertices.value.gridId]
  const matchLocationBed = gardenStore.newBed.shape[closestVertices.value.id]
  return gardenToWorld(vectorSum(matchLocationBed, matchLocationGrid, -1, 1))
})
</script>
