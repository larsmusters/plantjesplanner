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
import type { CircleConfig, DraggableConfig, Vector } from '@/types'
import { type Graphics, Circle } from 'pixi.js'
import { computed } from 'vue'

const defaultConfig: CircleConfig = {
  position: { x: 0, y: 0 },
  offset: { x: 0, y: 0 },
  radius: 5,
  hitAreaFactor: 1.5,
  hoverFactor: 1.5,
  hoverTransitionTimems: 100,
  lineThickness: 2,
  lineColour: Colours.black,
  fillColour: Colours.black,
  lineAlpha: 0.8,
  fillAlpha: 0.8
}

const props = withDefaults(
  defineProps<{
    config?: Partial<CircleConfig>
    invisible?: boolean
  }>(),
  {
    invisible: false
  }
)

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
      fullConfig.value.hitAreaFactor * fullConfig.value.radius
    )
)

const drawCircle = (g: Graphics) => {
  if (props.invisible) return
  g.clear()
  g.lineStyle(
    fullConfig.value.lineThickness,
    fullConfig.value.lineColour,
    fullConfig.value.lineAlpha
  )
  g.beginFill(fullConfig.value.fillColour, fullConfig.value.fillAlpha)
  g.drawCircle(fullConfig.value.offset.x, fullConfig.value.offset.y, fullConfig.value.radius)
  g.endFill()
}

const draggableConfig = computed((): Partial<DraggableConfig> => {
  return { ...fullConfig.value }
})
</script>
