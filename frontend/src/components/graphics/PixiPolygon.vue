<template>
  <container :position="fullConfig.position">
    <Draggable
      :config="draggableConfig"
      :hit-area="hitArea"
      :shadow-shape="hitArea"
      @drag="(dragLoc: Vector) => emit('drag', dragLoc)"
      @click="emit('click')"
    >
      <graphics @render="drawPolygon"> <slot /></graphics>
    </Draggable>
  </container>
</template>

<script setup lang="ts">
import Draggable from './PixiDraggable.vue'
import { Colours } from '@/types/colours'
import type { Vector } from '@/types/garden'
import { Graphics, Polygon } from 'pixi.js'
import { computed } from 'vue'
import type { PolygonConfig } from '@/types/shapes/polygon'
import type { DraggableConfig } from '@/types/generics/draggable'
import { VectorUtil } from '@/utils/vectorUtil'

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
  fillAlpha: 1,
  shadowColour: Colours.black,
  shadowOffset: { x: 0, y: 0 },
  shadowEnable: false,
  shadowAlpha: 0.1
}

const props = defineProps<{
  config: Partial<PolygonConfig>
}>()

const emit = defineEmits<{
  (e: 'drag', dragLoc: Vector): void
  (e: 'click'): void
}>()

const fullConfig = computed((): PolygonConfig => {
  return { ...defaultConfig, ...props.config }
})

const VUtil = new VectorUtil()
const hitArea = computed(
  () =>
    new Polygon(
      fullConfig.value.vertices.map((point) =>
        VUtil.multiply(point, fullConfig.value.hitAreaFactor)
      )
    )
)

const drawPolygon = (g: Graphics) => {
  g.clear()
  g.lineStyle(
    fullConfig.value.lineThickness,
    fullConfig.value.lineColour,
    fullConfig.value.lineAlpha
  )
  g.beginFill(fullConfig.value.fillColour, fullConfig.value.fillAlpha)
  if (g.drawRoundedShape) {
    g.drawRoundedShape(fullConfig.value.vertices, 0)
  }
}

const draggableConfig = computed((): Partial<DraggableConfig> => {
  return { ...fullConfig.value }
})
</script>
