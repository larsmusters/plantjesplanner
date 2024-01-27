<template>
  <container :position="position">
    <PixiBed
      v-if="appStore.isAddmode"
      :scale="gardenStore.position.scale"
      :bed="gardenStore.newBed"
      @click:bed="addBed"
    />
  </container>
</template>

<script setup lang="ts">
import { useGridStore } from '@/stores/grid'
import PixiBed from '../graphics/bed/PixiBed.vue'
import { useGardenStore } from '@/stores/garden'
import { computed } from 'vue'
import { gardenToWorld, worldToGarden } from '@/utils'
import { VectorUtil } from '@/utils/vectorUtil'
import { useAppStore } from '@/stores/app'

const gardenStore = useGardenStore()
const appStore = useAppStore()

const addBed = () => {
  // Get nested data from new or uniquely referenced data
  const location = worldToGarden(position.value)
  const shape = JSON.parse(JSON.stringify(gardenStore.newBed.shape))
  const newBed = Object.assign({ ...gardenStore.newBed, location, shape })
  gardenStore.garden.beds.push(newBed)

  appStore.setClickMode('edit')
}

const gridStore = useGridStore()
const VUtil = new VectorUtil()

const closestVertices = computed(() => {
  // To garden space
  const bedVertices = VUtil.moveOrigins(VUtil.inverse(gardenStore.cursor), gardenStore.newBed.shape)
  return VUtil.findClosestPair(bedVertices, gridStore.vertices)
})

// World space
const position = computed(() => {
  // Garden space
  const matchLocationGrid = gridStore.vertices[closestVertices.value.candidateId]
  const matchLocationBed = gardenStore.newBed.shape[closestVertices.value.pointId]
  return gardenToWorld(VUtil.sub(matchLocationGrid, matchLocationBed))
})
</script>
