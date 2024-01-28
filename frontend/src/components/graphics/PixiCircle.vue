<template>
  <container :position="fullConfig.position" :scale="scale">
    <graphics
      ref="el"
      @render="drawCircle"
      :hit-area="hitArea"
      @pointerdown="onDragStart"
      @pointerup="onDragEnd"
      @pointerupoutside="onDragEnd"
    >
      <slot />
    </graphics>
  </container>
</template>
<script setup lang="ts">
import { Colours } from '@/types/colours'
import { type Graphics, Circle } from 'pixi.js'
import { computed, ref } from 'vue'
import { useStage } from 'vue3-pixi'
import { TransitionPresets, useElementHover, useTransition } from '@vueuse/core'
import type { CircleConfig } from '@/types/shapes/circle'

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
  (e: 'drag'): void
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

const el = ref()
const hovering = useElementHover(el)
const scaleTarget = computed(() => (hovering.value ? fullConfig.value.hoverFactor : 1))
const scale = useTransition(scaleTarget, {
  duration: fullConfig.value.hoverTransitionTimems,
  transition: TransitionPresets.easeOutQuad
})

const drawCircle = (g: Graphics) => {
  g.clear()
  g.lineStyle(fullConfig.value.lineThickness, fullConfig.value.lineColour, fullConfig.value.alpha)
  g.beginFill(fullConfig.value.fillColour, fullConfig.value.alpha)
  g.drawCircle(fullConfig.value.offset.x, fullConfig.value.offset.y, fullConfig.value.radius)
  g.endFill()
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
