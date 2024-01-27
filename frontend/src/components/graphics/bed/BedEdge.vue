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
import { Colours } from '@/types/colours'
import { worldToGarden } from '@/utils'
import type { Vector } from '@/types/garden'
import { type FederatedPointerEvent, type Graphics, Polygon } from 'pixi.js'
import { computed, ref } from 'vue'
import { useStage } from 'vue3-pixi'
import { TransitionPresets, useElementHover, useTransition } from '@vueuse/core'
import { VectorUtil } from '@/utils/vectorUtil'
import type { PolygonEdgeStyling } from '@/types/shapes'

const props = defineProps<{
  start: { x: number; y: number; id: number }
  end: { x: number; y: number; id: number }
  bedId: number
  worldScale: number
  com: Vector
}>()

const emit = defineEmits<{
  (e: 'drag', dragLoc: Vector, ids: number[]): void
}>()

const el = ref()
const hovering = useElementHover(el)
const scale = computed(() => (hovering.value ? 1.5 : 1))
const scaleAnimated = useTransition(scale, {
  duration: 100,
  transition: TransitionPresets.easeOutQuad
})

const thickness = computed(() => 5 / props.worldScale)

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

const polygonEdgeDefaultStyling: PolygonEdgeStyling = {
  lineThickness: 0,
  lineColour: Colours.black,
  alpha: 0.75
}

const buildPolygonEdge = (start: Vector, end: Vector, thickness: number): Vector[] => {
  // Build a thick line (so that it is clickable)
  // Step 1: Calculate the length of the line
  const length = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2))

  // Step 2: Calculate the unit vector u
  const u = {
    x: (end.x - start.x) / length,
    y: (end.y - start.y) / length
  }

  // Step 3: Calculate the perpendicular vector v
  const v = {
    x: -u.y,
    y: u.x
  }

  // Step 4: Calculate rectangle vertices
  const halfThickness = thickness / 2
  const rectangle = [
    {
      x: start.x - halfThickness * v.x,
      y: start.y - halfThickness * v.y
    },
    {
      x: start.x + halfThickness * v.x,
      y: start.y + halfThickness * v.y
    },
    {
      x: end.x + halfThickness * v.x,
      y: end.y + halfThickness * v.y
    },
    {
      x: end.x - halfThickness * v.x,
      y: end.y - halfThickness * v.y
    }
  ]
  return rectangle
}

const drawPolygonEdge = (
  g: Graphics,
  start: Vector,
  end: Vector,
  polygonStyling?: Partial<PolygonEdgeStyling>
) => {
  const pes: PolygonEdgeStyling = { ...polygonEdgeDefaultStyling, ...polygonStyling }
  const points = buildPolygonEdge(start, end, pes.lineThickness)

  g.clear()
  g.beginFill(pes.lineColour, pes.alpha)
  g.drawPolygon(points)
  g.endFill()
}

const stage = useStage()
const VUTil = new VectorUtil()

const dragLoc = ref<Vector>()
const onDragStart = (e: FederatedPointerEvent) => {
  const gardenLoc = worldToGarden(e.global)
  dragLoc.value = VUTil.moveOrigin(props.com, gardenLoc)
  stage.value!.addEventListener('pointermove', onDrag)
}

const onDragEnd = () => {
  stage.value!.removeEventListener('pointermove', onDrag)
}

const onDrag = () => {
  emit('drag', dragLoc.value!, [props.start.id, props.end.id])
}
</script>
