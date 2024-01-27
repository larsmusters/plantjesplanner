<template>
  <container :position="point" :scale="scale">
    <graphics
      ref="el"
      @render="drawEditPoint"
      :hit-area="getEditPointHitArea()"
      @pointerdown="onDragStart"
      @pointerup="onDragEnd"
      @pointerupoutside="onDragEnd"
    />
  </container>
</template>
<script setup lang="ts">
import { useGardenStore } from '@/stores/garden'
import { Colours } from '@/types/colours'
import type { Vector } from '@/types/garden'
import { type Graphics, Circle } from 'pixi.js'
import { computed, ref } from 'vue'
import { useStage } from 'vue3-pixi'
import { TransitionPresets, useElementHover, useTransition } from '@vueuse/core'
import type { PolygonVertexStyling } from '@/types/shapes'

defineProps<{
  point: Vector
}>()

const emit = defineEmits<{
  (e: 'drag'): void
}>()

const gardenStore = useGardenStore()

const el = ref()
const hovering = useElementHover(el)
const scaleTarget = computed(() => (hovering.value ? 1.5 : 1))
const scale = useTransition(scaleTarget, {
  duration: 100,
  transition: TransitionPresets.easeOutQuad
})

const radius = computed(() => 5 / gardenStore.position.scale)

const drawEditPoint = (g: Graphics) => {
  const styling = {
    lineThickness: 2,
    fillColour: Colours.black,
    radius: radius.value
  }
  drawPolygonVertex(g, styling)
}

const polygonVertexDefaultStyling: PolygonVertexStyling = {
  lineThickness: 0,
  lineColour: Colours.black,
  alpha: 0.8,
  fillColour: Colours.white,
  radius: 10
}

const drawPolygonVertex = (g: Graphics, polygonStyling?: Partial<PolygonVertexStyling>) => {
  const pvs: PolygonVertexStyling = { ...polygonVertexDefaultStyling, ...polygonStyling }
  g.clear()
  g.lineStyle(pvs.lineThickness, pvs.lineColour, pvs.alpha)
  g.beginFill(pvs.fillColour, pvs.alpha)
  g.drawCircle(0, 0, pvs.radius)
  g.endFill()
}

const getEditPointHitArea = () => {
  return new Circle(0, 0, radius.value * 1.5)
}

const stage = useStage()

const onDragStart = () => {
  stage.value!.addEventListener('pointermove', onDrag)
}

const onDragEnd = () => {
  stage.value!.removeEventListener('pointermove', onDrag)
}

const onDrag = () => {
  emit('drag')
}
</script>
