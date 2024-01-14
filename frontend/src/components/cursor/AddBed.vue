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

const gardenStore = useGardenStore()

const addBed = () => {
  // Get nested data from new or uniquely referenced data
  const location = { ...gridStore.vertices[closestVertex.value] }
  const shape = JSON.parse(JSON.stringify(gardenStore.newBed.shape))
  const newBed = Object.assign({ ...gardenStore.newBed, location, shape })
  gardenStore.garden.beds.push(newBed)

  gardenStore.clickMode = ClickMode.select
}

const gridStore = useGridStore()

const closestVertex = computed(() => {
  // vertices in gardenspace
  const dists = gridStore.vertices.map((v) => {
    const xDist = gardenStore.gardenCursor.x - v.x
    const yDist = gardenStore.gardenCursor.y - v.y
    return Math.sqrt(xDist * xDist + yDist * yDist)
  })
  const minValue = Math.min(...dists)
  const minIndex = dists.indexOf(minValue)

  return minIndex
})

const position = computed(() => {
  // these are in world space, as the cursor is outside the World component
  const x =
    gridStore.vertices[closestVertex.value].x * gardenStore.position.scale + gardenStore.position.x
  const y =
    gridStore.vertices[closestVertex.value].y * gardenStore.position.scale + gardenStore.position.y
  return { x, y }
})
</script>
