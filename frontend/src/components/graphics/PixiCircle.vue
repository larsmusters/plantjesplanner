<template>
  <container :position="fullConfig.position">
    <Draggable
      :config="draggableConfig"
      :hit-area="hitArea"
      @drag="(dragLoc: Vector) => emit('drag', dragLoc)"
    >
      <graphics ref="el" @render="drawCircle">
        <slot />
      </graphics>
    </Draggable>
  </container>
</template>
<script setup lang="ts">
import Draggable from './PixiDraggable.vue'
import { Colours } from '@/types/colours'
import { type Graphics, Circle } from 'pixi.js'
import { computed } from 'vue'
import type { CircleConfig } from '@/types/shapes/circle'
import type { DraggableConfig } from '@/types/generics/draggable'
import type { Vector } from '@/types/garden'

const defaultConfig: CircleConfig = {
  position: { x: 0, y: 0 },
  offset: { x: 0, y: 0 },
  radius: 5,
  hitAreaRadiusFactor: 1.5,
  hoverFactor: 1.5,
  hoverTransitionTimems: 100,
  lineThickness: 2,
  lineColour: Colours.black,
  fillColour: Colours.black,
  alpha: 0.8
}

const props = defineProps<{
  config: Partial<CircleConfig>
}>()

const emit = defineEmits<{
  (e: 'drag', dragLoc: Vector): void
}>()

const fullConfig = computed((): CircleConfig => {
  return { ...defaultConfig, ...props.config }
})

const hitArea = computed(
  () =>
    new Circle(
      fullConfig.value.offset.x,
      fullConfig.value.offset.y,
      fullConfig.value.hitAreaRadiusFactor * fullConfig.value.radius
    )
)

const drawCircle = (g: Graphics) => {
  g.clear()
  g.lineStyle(fullConfig.value.lineThickness, fullConfig.value.lineColour, fullConfig.value.alpha)
  g.beginFill(fullConfig.value.fillColour, fullConfig.value.alpha)
  g.drawCircle(fullConfig.value.offset.x, fullConfig.value.offset.y, fullConfig.value.radius)
  g.endFill()
}

const draggableConfig = computed((): Partial<DraggableConfig> => {
  return { ...fullConfig.value }
})
</script>
