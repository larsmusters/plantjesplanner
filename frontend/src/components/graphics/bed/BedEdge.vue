<template>
  <graphics
    @render="(g: Graphics) => drawEdge(g, edge)"
    :hit-area="getEdgeHitArea(edge)"
    @pointerdown="onDragStart"
    @pointerup="onDragEnd"
    @pointerupoutside="onDragEnd"
  />
</template>
<script setup lang="ts">
import { useGardenStore } from '@/stores'
import { Colours } from '@/types/colours'
import type { BedEdge } from '@/types/garden'
import { drawPolygonEdge, buildPolygonEdge } from '@/utils/builder'
import type { Graphics } from 'pixi.js'
import { Polygon } from 'pixi.js'
import { computed } from 'vue'
import { useStage } from 'vue3-pixi'

const props = defineProps<{
  edge: BedEdge
}>()

const emit = defineEmits<{
  (e: 'set-to-cursor:edge', v1Id: number, v2Id: number): void
}>()

const gardenStore = useGardenStore()

const thickness = computed(() => 8 / gardenStore.position.scale)

const drawEdge = (g: Graphics, e: BedEdge) => {
  const styling = {
    lineThickness: thickness.value,
    fillColour: Colours.green
  }
  drawPolygonEdge(g, e, styling)
}

const getEdgeHitArea = (e: BedEdge) => {
  return new Polygon(buildPolygonEdge(e, thickness.value))
}

const stage = useStage()

const onDragStart = () => {
  stage.value!.addEventListener('pointermove', onDrag)
}

const onDragEnd = () => {
  stage.value!.removeEventListener('pointermove', onDrag)
}

const onDrag = () => {
  emit('set-to-cursor:edge', props.edge.p0.id, props.edge.p1.id)
}
</script>
