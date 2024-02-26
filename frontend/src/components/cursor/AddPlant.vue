<template>
  <container v-if="appStore.isAddmode" :position="position" :scale="gardenStore.position.scale">
    <Plant :plant="gardenStore.newPlant" />
    <PixiCircle :config="{ radius: 100 }" invisible @click="addBed" />
  </container>
</template>

<script setup lang="ts">
import Plant from '../graphics/PixiPlant.vue'
import { useGridStore, useGardenStore, useAppStore } from '@/stores'
import { computed } from 'vue'
import { gardenToWorld, worldToGarden } from '@/utils'
import { VectorUtil } from '@/utils/vectorUtil'
import PixiCircle from '../graphics/PixiCircle.vue'

const gardenStore = useGardenStore()
const appStore = useAppStore()

const addBed = () => {
  // Get nested data from new or uniquely referenced data
  const location = worldToGarden(position.value)
  const newPlant = Object.assign({ ...gardenStore.newPlant, location })
  gardenStore.garden.plants.push(newPlant)

  appStore.setClickMode('edit')
}

const gridStore = useGridStore()
const VUtil = new VectorUtil()

const position = computed(() => {
  // To garden space
  const SuggestedLocation = VUtil.moveToGrid(gardenStore.cursor, gridStore.vertices, 100)
  return gardenToWorld(VUtil.sub(SuggestedLocation, gardenStore.newPlant.location))
})
</script>
