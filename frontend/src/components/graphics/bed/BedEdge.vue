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
import { worldToGarden } from '@/utils'
import type { Vector } from '@/types/garden'
import { drawPolygonEdge, buildPolygonEdge } from '@/utils/builder'
import { type FederatedPointerEvent, type Graphics, Polygon } from 'pixi.js'
import { computed, ref } from 'vue'
import { useStage } from 'vue3-pixi'
import { TransitionPresets, useElementHover, useTransition } from '@vueuse/core'
import { VectorUtil } from '@/utils/vectorUtil'

const props = defineProps<{
  start: { x: number; y: number; id: number }
  end: { x: number; y: number; id: number }
  bedId: number
}>()

const emit = defineEmits<{
  (e: 'drag', dragLoc: Vector, ids: number[]): void
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

const drawEdge = (g: Graphics, start: Vector, end: Vector) => {
  const styling = {
    lineThickness: thickness.value * scaleAnimated.value,
    lineColour: Colours.black
  }
  drawPolygonEdge(g, start, end, styling)
}

const getEdgeHitArea = (start: Vector, end: Vector) => {
  return new Polygon(buildPolygonEdge(start, end, thickness.value * 2.5))
}

const stage = useStage()
const VUTil = new VectorUtil()

const dragLoc = ref<Vector>()
const onDragStart = (e: FederatedPointerEvent) => {
  const gardenLoc = worldToGarden(e.global)
  dragLoc.value = VUTil.moveOrigin(gardenStore.garden.beds[props.bedId].location, gardenLoc)
  stage.value!.addEventListener('pointermove', onDrag)
}

const onDragEnd = () => {
  stage.value!.removeEventListener('pointermove', onDrag)
}

const onDrag = () => {
  emit('drag', dragLoc.value!, [props.start.id, props.end.id])
}
</script>
