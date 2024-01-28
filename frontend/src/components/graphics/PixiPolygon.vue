<template>
  <!-- <container :scale="scale"> -->
  <graphics
    ref="el"
    @render="drawPolygon"
    :hit-area="hitArea"
    @pointerdown="onDragStart"
    @pointerup="onDragEnd"
    @pointerupoutside="onDragEnd"
  />
  <!-- </container> -->
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
import type { PolygonConfig } from '@/types/shapes/polygon'

const defaultConfig: PolygonConfig = {
  position: { x: 0, y: 0 },
  data: { type: 'ThickEdge', start: { x: 0, y: 0 }, end: { x: 1, y: 0 }, thickness: 1 },
  hoverFactor: 1.5,
  hoverTransitionTimems: 100,
  hitAreaFactor: 2.5,
  lineThickness: 2,
  lineColour: Colours.black,
  fillColour: Colours.black,
  alpha: 0.8
}

const props = defineProps<{
  config: Partial<PolygonConfig>
}>()

const emit = defineEmits<{
  (e: 'drag', dragLoc: Vector): void
}>()

const fullConfig = computed((): PolygonConfig => {
  return { ...defaultConfig, ...props.config }
})

const hitArea = computed(
  () =>
    new Polygon(buildPolygonEdge(fullConfig.value.data.thickness * fullConfig.value.hitAreaFactor))
)

const el = ref()
const hovering = useElementHover(el)
const scaleTarget = computed(() => (hovering.value ? fullConfig.value.hoverFactor : 1))
const scale = useTransition(scaleTarget, {
  duration: fullConfig.value.hoverTransitionTimems,
  transition: TransitionPresets.easeOutQuad
})

const buildPolygonEdge = (thickness: number): Vector[] => {
  const start = fullConfig.value.data.start
  const end = fullConfig.value.data.end
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
  const halfThickness = (thickness / 2) * scale.value
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

const drawPolygon = (g: Graphics) => {
  const points = buildPolygonEdge(fullConfig.value.data.thickness)

  g.clear()
  g.lineStyle(fullConfig.value.lineThickness, fullConfig.value.lineColour, fullConfig.value.alpha)
  g.beginFill(fullConfig.value.fillColour, fullConfig.value.alpha)
  g.drawPolygon(points)
  g.endFill()
}

const stage = useStage()
const dragLoc = ref<Vector>({ x: 0, y: 0 })
const onDragStart = (e: FederatedPointerEvent) => {
  const pointerInGarden = worldToGarden(e.global)
  // Dragging location is 'where on the Polygon are we dragging?'.
  dragLoc.value = new VectorUtil().moveOrigin(
    fullConfig.value.dragCOM || fullConfig.value.position,
    pointerInGarden
  )
  stage.value.addEventListener('pointermove', onDrag)
}
const onDragEnd = () => {
  stage.value!.removeEventListener('pointermove', onDrag)
}
const onDrag = () => {
  emit('drag', dragLoc.value!)
}
</script>
