<template>
  <graphics
    @render="(g: Graphics) => drawEdge(g, start, end)"
    :hit-area="getEdgeHitArea(start, end)"
    @pointerdown="onDragStart"
    @pointerup="onDragEnd"
    @pointerupoutside="onDragEnd"
  />
</template>
<script setup lang="ts">
import { useGardenStore } from '@/stores'
import { Colours } from '@/types/colours'
import type { Point } from '@/types/garden'
import { gardenToRelative, worldToGarden } from '@/utils'
import { drawPolygonEdge, buildPolygonEdge } from '@/utils/builder'
import type { FederatedPointerEvent } from 'pixi.js'
import type { Graphics } from 'pixi.js'
import { Polygon } from 'pixi.js'
import { computed, ref } from 'vue'
import { useStage } from 'vue3-pixi'

const props = defineProps<{
  start: { x: number; y: number; id: number }
  end: { x: number; y: number; id: number }
  bedId: number
}>()

const emit = defineEmits<{
  (e: 'set-to-cursor:vertices', dragLoc: Point, ids: number[]): void
}>()

const gardenStore = useGardenStore()

const thickness = computed(() => 8 / gardenStore.position.scale)

const drawEdge = (g: Graphics, start: Point, end: Point) => {
  const styling = {
    lineThickness: thickness.value,
    lineColour: Colours.blue
  }
  drawPolygonEdge(g, start, end, styling)
}

const getEdgeHitArea = (start: Point, end: Point) => {
  return new Polygon(buildPolygonEdge(start, end, thickness.value))
}

const stage = useStage()

const dragLoc = ref<Point>()
const onDragStart = (e: FederatedPointerEvent) => {
  const gardenLoc = worldToGarden(e.global)
  dragLoc.value = gardenToRelative(gardenStore.garden.beds[props.bedId].location, gardenLoc)
  stage.value!.addEventListener('pointermove', onDrag)
}

const onDragEnd = () => {
  stage.value!.removeEventListener('pointermove', onDrag)
}

const onDrag = () => {
  emit('set-to-cursor:vertices', dragLoc.value!, [props.start.id, props.end.id])
}
</script>
