<template>
  <graphics
    v-if="fullConfig.shadowEnable"
    @render="drawDropShadow"
    :position="fullConfig.shadowOffset"
  >
    <blur-filter :quality="2" :blur="4" />
  </graphics>
  <container
    ref="el"
    @pointerdown="onDragStart"
    @pointerup="onDragEnd"
    @pointerupoutside="onDragEnd"
    @click="$emit('click')"
    :scale="scale"
    :hitArea="hitArea"
  >
    <slot />
  </container>
</template>

<script setup lang="ts">
import { worldToGarden } from '@/utils'
import { Colours } from '@/types/colours'
import type { Vector, DraggableConfig } from '@/types'
import { computed, ref } from 'vue'
import { useStage } from 'vue3-pixi'
import { TransitionPresets, useElementHover, useTransition } from '@vueuse/core'
import { VectorUtil } from '@/utils/vectorUtil'
import type { Graphics, IHitArea, IShape, FederatedPointerEvent } from 'pixi.js'
import { Circle } from 'pixi.js'

const defaultConfig: DraggableConfig = {
  hoverFactor: 1.5,
  hoverTransitionTimems: 100,
  hitAreaFactor: 1,
  dragCOM: { x: 0, y: 0 },
  position: { x: 0, y: 0 },
  shadowColour: Colours.black,
  shadowAlpha: 0.25,
  shadowOffset: { x: 0, y: 0 },
  shadowEnable: false
}

const props = defineProps<{
  config: Partial<DraggableConfig>
  hitArea: IHitArea
  shadowShape?: IShape
}>()

const emit = defineEmits<{
  (e: 'drag', dragLoc: Vector): void
  (e: 'click'): void
}>()

const fullConfig = computed((): DraggableConfig => {
  return { ...defaultConfig, ...props.config }
})

const drawDropShadow = (g: Graphics) => {
  // Linearly increase shadow alpha based on hover value.
  const alpha = (scale.value - 1) / (fullConfig.value.hoverFactor - 1)
  g.clear()
  g.beginFill(fullConfig.value.shadowColour, alpha * (fullConfig.value.shadowAlpha || 1))
  g.drawShape(props.shadowShape || new Circle(0, 0, 1))
  g.endFill()
}

const el = ref()
const hovering = useElementHover(el)
const scaleTarget = computed(() => (hovering.value ? fullConfig.value.hoverFactor : 1))
const scale = useTransition(scaleTarget, {
  duration: fullConfig.value.hoverTransitionTimems,
  transition: TransitionPresets.easeOutQuad
})

const VUtil = new VectorUtil()
const stage = useStage()

// Dragging location is 'where on the shape are we dragging?'.
const dragLoc = ref<Vector>({ x: 0, y: 0 })
const onDragStart = (e: FederatedPointerEvent) => {
  const pointerInGarden = worldToGarden(e.global)
  const originInGlobal = el.value.toGlobal(fullConfig.value.dragCOM || fullConfig.value.position)
  const originInGarden = worldToGarden(originInGlobal)

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
