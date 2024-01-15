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
import { drawPolygonVertex } from '@/utils/builder'
import type { Graphics } from 'pixi.js'
import { Circle } from 'pixi.js'
import { computed } from 'vue'
import { useStage } from 'vue3-pixi'

defineProps<{
  edge: BedEdge
}>()

const emit = defineEmits<{
  (e: 'set-to-cursor:point'): void
}>()

const gardenStore = useGardenStore()

const radius = computed(() => 10 / gardenStore.position.scale)

const drawEditPoint = (g: Graphics, e: BedEdge) => {
  const styling = {
    lineThickness: 2,
    fillColour: Colours.green,
    location: p,
    radius: radius.value
  }
  drawPolygonVertex(g, styling)
}

const getEditPointHitArea = (e: BedEdge) => {
  return new Circle(p.x, p.y, radius.value)
}

const stage = useStage()

const onDragStart = () => {
  stage.value!.addEventListener('pointermove', onDrag)
}

const onDragEnd = () => {
  stage.value!.removeEventListener('pointermove', onDrag)
}

const onDrag = () => {
  emit('set-to-cursor:point')
}
</script>
