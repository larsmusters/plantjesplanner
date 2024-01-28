<template>
  <container :scale="scale" :position="fullConfig.position">
    <graphics
      ref="el"
      @render="drawPolygon"
      :hit-area="hitArea"
      @pointerdown="onDragStart"
      @pointerup="onDragEnd"
      @pointerupoutside="onDragEnd"
    >
      <slot
    /></graphics>
  </container>
</template>

<script setup lang="ts">
import { Colours } from '@/types/colours'
import { worldToGarden } from '@/utils'
import type { Vector, Vertex } from '@/types/garden'
import { type FederatedPointerEvent, Graphics, Polygon } from 'pixi.js'
import { computed, ref } from 'vue'
import { useStage } from 'vue3-pixi'
import { TransitionPresets, useElementHover, useTransition } from '@vueuse/core'
import { VectorUtil } from '@/utils/vectorUtil'
import type { PolygonConfig } from '@/types/shapes/polygon'

const defaultConfig: PolygonConfig = {
  position: { x: 0, y: 0 },
  vertices: [],
  hoverFactor: 1.1,
  hoverTransitionTimems: 100,
  hitAreaFactor: 1,
  lineThickness: 2,
  lineColour: Colours.black,
  lineAlpha: 1,
  fillColour: Colours.black,
  fillAlpha: 1
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
  () => new Polygon(getPolygonPoints(fullConfig.value.vertices, fullConfig.value.hitAreaFactor))
)

const el = ref()
const hovering = useElementHover(el)
const scaleTarget = computed(() => (hovering.value ? fullConfig.value.hoverFactor : 1))
const scale = useTransition(scaleTarget, {
  duration: fullConfig.value.hoverTransitionTimems,
  transition: TransitionPresets.easeOutQuad
})

const drawPolygon = (g: Graphics) => {
  g.clear()
  g.lineStyle(
    fullConfig.value.lineThickness,
    fullConfig.value.lineColour,
    fullConfig.value.lineAlpha
  )
  g.beginFill(fullConfig.value.fillColour, fullConfig.value.fillAlpha)
  if (g.drawRoundedShape) {
    g.drawRoundedShape(getPolygonPoints(fullConfig.value.vertices), 0)
  }
}

const getPolygonPoints = (path: Vertex[], s: number = 1, o: number = 0): Vertex[] => {
  return path.map((point) => {
    return { x: point.x * s + o, y: point.y * s + o, radius: (point.radius || 0) * s }
  })
}

const VUtil = new VectorUtil()
const stage = useStage()
const dragLoc = ref<Vector>({ x: 0, y: 0 })
const onDragStart = (e: FederatedPointerEvent) => {
  const pointerInGarden = worldToGarden(e.global)
  const originInGlobal = el.value.toGlobal(fullConfig.value.dragCOM || fullConfig.value.position)
  const originInGarden = worldToGarden(originInGlobal)

  // Dragging location is 'where on the Polygon are we dragging?'.
  dragLoc.value = VUtil.sub(pointerInGarden, originInGarden)
  stage.value.addEventListener('pointermove', onDrag)
}
const onDragEnd = () => {
  stage.value!.removeEventListener('pointermove', onDrag)
}
const onDrag = () => {
  emit('drag', dragLoc.value!)
}
</script>
