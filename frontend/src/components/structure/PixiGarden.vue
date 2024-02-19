<template>
  <Polygon :config="gardenShellConfig" />
  <Grid v-if="showGrid" />
  <template v-for="(bed, index) in gardenStore.garden.beds" :key="bed.id">
    <PixiBed :bed="bed" :bedId="index" @update:hover="appStore.raiseBedIndex" />
  </template>
</template>

<script setup lang="ts">
import Polygon from '../graphics/PixiPolygon.vue'
import Grid from './PixiGrid.vue'
import PixiBed from '@/components/graphics/PixiBed.vue'
import { computed } from 'vue'
import { useGardenStore, useAppStore } from '@/stores'
import { Colours, type PolygonConfig } from '@/types'

const gardenStore = useGardenStore()
const appStore = useAppStore()

const showGrid = computed(() => {
  if (appStore.isAddmode) return true
  if (appStore.isEditMode) return true
  return false
})

const gardenShellConfig = computed((): Partial<PolygonConfig> => {
  return {
    hoverFactor: 1,
    vertices: gardenStore.garden.shape,
    lineThickness: 2,
    lineColour: Colours.edge,
    lineAlpha: 0.5,
    fillColour: Colours.inside
  }
})
</script>
