<template>
  <GardenShell :path="gardenStore.garden.shape" />
  <Grid v-if="showGrid()" />
  <template v-for="(bed, index) in gardenStore.garden.beds" :key="bed.id">
    <PixiBed
      :bed="bed"
      @update:hover="raiseBedIndex"
      @set-to-cursor:bed-vertex="(vertexId: number) => bedMover.moveBedVertex(vertexId, index)"
      @set-to-cursor:bed-vertices="
        (dragLoc: Vector, ids: number[]) => bedMover.moveBedVertices(dragLoc, index, ids)
      "
      @set-to-cursor:bed="(dragLoc: Vector) => bedMover.moveBedVertices(dragLoc, index)"
    />
  </template>
</template>

<script setup lang="ts">
import Grid from './PixiGrid.vue'
import PixiBed from '@/components/graphics/bed/PixiBed.vue'
import GardenShell from '@/components/graphics/PixiGardenShell.vue'
import { ref } from 'vue'
import { type ApplicationInst } from 'vue3-pixi'
import { Container } from 'pixi.js'
import { useGardenStore } from '@/stores/garden'
import { ClickMode } from '@/types'
import type { Vector } from '@/types/garden'
import { useBedMover } from '@/composables/bedMover'

const app = ref<ApplicationInst>()
const raiseBedIndex = (container: Container) => {
  app.value?.app.stage.sortChildren()
  const highestIndex = (app.value?.app.stage.children.length || 1) - 1
  app.value?.app.stage.setChildIndex(container, highestIndex)
}

const gardenStore = useGardenStore()
const bedMover = useBedMover()

const showGrid = () => {
  if (gardenStore.clickMode == ClickMode.add) return true
  if (gardenStore.clickMode == ClickMode.edit) return true
  return false
}
</script>
