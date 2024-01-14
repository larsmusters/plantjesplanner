<template>
  <graphics
    @render="(g: Graphics) => drawEditPoint(g, point)"
    :hit-area="getEditPointHitArea(point)"
    @pointerdown="onDragStart"
    @pointerup="onDragEnd"
    @pointerupoutside="onDragEnd"
  />
</template>
<script setup lang="ts">
import { Colours } from '@/types/colours'
import type { PolygonPoint } from '@/types/garden'
import { drawPolygonVertex } from '@/utils/builder'
import type { Graphics } from 'pixi.js'
import { Circle } from 'pixi.js'
import { useStage } from 'vue3-pixi'

defineProps<{
  point: PolygonPoint
}>()

const emit = defineEmits<{
  (e: 'set-to-cursor:point'): void
}>()

const radius = 10

const drawEditPoint = (g: Graphics, p: PolygonPoint) => {
  const styling = {
    lineThickness: 2,
    fillColour: Colours.green,
    location: p,
    radius
  }
  drawPolygonVertex(g, styling)
}

const getEditPointHitArea = (p: PolygonPoint) => {
  return new Circle(p.x, p.y, radius)
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
