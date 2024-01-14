<template>
  <PixiBed
    v-if="gardenStore.clickMode === ClickMode.add"
    :scale="gardenStore.position.scale"
    :bed="gardenStore.newBed"
    @click:bed="addBed"
  />
</template>

<script setup lang="ts">
import PixiBed from '../graphics/bed/PixiBed.vue'
import { useGardenStore } from '@/stores'
import { ClickMode } from '@/types'

const gardenStore = useGardenStore()

const addBed = () => {
  // Get nested data from new or uniquely referenced data
  const location = gardenStore.gardenCursor
  const shape = JSON.parse(JSON.stringify(gardenStore.newBed.shape))
  const newBed = Object.assign({ ...gardenStore.newBed, location, shape })
  gardenStore.garden.beds.push(newBed)

  gardenStore.clickMode = ClickMode.select
}
</script>
