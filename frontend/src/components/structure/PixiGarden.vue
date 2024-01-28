<template>
  <GardenShell :path="gardenStore.garden.shape" />
  <Grid v-if="showGrid" />
  <template v-for="(bed, index) in gardenStore.garden.beds" :key="bed.id">
    <PixiBed :bed="bed" :bedId="index" @update:hover="appStore.raiseBedIndex" />
  </template>
</template>

<script setup lang="ts">
import GardenShell from '@/components/graphics/PixiGardenShell.vue'
import Grid from './PixiGrid.vue'
import PixiBed from '@/components/graphics/PixiBed.vue'
import { computed } from 'vue'
import { useGardenStore, useAppStore } from '@/stores'

const gardenStore = useGardenStore()
const appStore = useAppStore()

const showGrid = computed(() => {
  if (appStore.isAddmode) return true
  if (appStore.isEditMode) return true
  return false
})
</script>
