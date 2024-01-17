<template>
  <graphics
    ref="el"
    @render="(g: Graphics) => drawEdge(g, start, end)"
    :hit-area="getEdgeHitArea(start, end)"
    @pointerdown="onDragStart"
    @pointerup="onDragEnd"
    @pointerupoutside="onDragEnd"
  />
</template>
<script setup lang="ts">
import { useGardenStore } from '@/stores/garden'
import { Colours } from '@/types/colours'
import type { Point } from '@/types/garden'
import { gardenToRelative, worldToGarden } from '@/utils'
import { drawPolygonEdge, buildPolygonEdge } from '@/utils/builder'
import type { FederatedPointerEvent } from 'pixi.js'
import type { Graphics } from 'pixi.js'
import { Polygon } from 'pixi.js'
import { computed, ref } from 'vue'
import { useStage } from 'vue3-pixi'
import { TransitionPresets, useElementHover, useTransition } from '@vueuse/core'

const props = defineProps<{
  start: { x: number; y: number; id: number }
  end: { x: number; y: number; id: number }
  bedId: number
}>()

const emit = defineEmits<{
  (e: 'set-to-cursor:vertices', dragLoc: Point, ids: number[]): void
}>()

const gardenStore = useGardenStore()

const el = ref()
const hovering = useElementHover(el)
const scale = computed(() => (hovering.value ? 1.5 : 1))
const scaleAnimated = useTransition(scale, {
  duration: 100,
  transition: TransitionPresets.easeOutQuad
})

const thickness = computed(() => 5 / gardenStore.position.scale)

const drawEdge = (g: Graphics, start: Point, end: Point) => {
  const styling = {
    lineThickness: thickness.value * scaleAnimated.value,
    lineColour: Colours.black
  }
  drawPolygonEdge(g, start, end, styling)
}

const getEdgeHitArea = (start: Point, end: Point) => {
  return new Polygon(buildPolygonEdge(start, end, thickness.value * 2.5))
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
