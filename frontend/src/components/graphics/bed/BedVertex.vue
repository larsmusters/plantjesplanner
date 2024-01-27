<template>
  <graphics
    ref="el"
    @render="(g: Graphics) => drawEditPoint(g, point)"
    :hit-area="getEditPointHitArea(point)"
    @pointerdown="onDragStart"
    @pointerup="onDragEnd"
    @pointerupoutside="onDragEnd"
  />
</template>
<script setup lang="ts">
import { useGardenStore } from '@/stores/garden'
import { Colours } from '@/types/colours'
import type { Vector } from '@/types/garden'
import { drawPolygonVertex } from '@/utils/builder'
import type { Graphics } from 'pixi.js'
import { Circle } from 'pixi.js'
import { computed, ref } from 'vue'
import { useStage } from 'vue3-pixi'
import { TransitionPresets, useElementHover, useTransition } from '@vueuse/core'

defineProps<{
  point: Vector
}>()

const emit = defineEmits<{
  (e: 'set-to-cursor:point'): void
}>()

const gardenStore = useGardenStore()

const el = ref()
const hovering = useElementHover(el)
const scale = computed(() => (hovering.value ? 1.5 : 1))
const scaleAnimated = useTransition(scale, {
  duration: 100,
  transition: TransitionPresets.easeOutQuad
})

const radius = computed(() => 5 / gardenStore.position.scale)

const drawEditPoint = (g: Graphics, p: Vector) => {
  const styling = {
    lineThickness: 2,
    fillColour: Colours.black,
    location: p,
    radius: radius.value * scaleAnimated.value
  }
  drawPolygonVertex(g, styling)
}

const getEditPointHitArea = (p: Vector) => {
  return new Circle(p.x, p.y, radius.value * 1.5)
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
