<template>
  <graphics @render="drawDropShadow">
    <blur-filter :quality="2" :blur="4" />
  </graphics>
  <graphics
    ref="el"
    @render="drawBed"
    :hitArea="hitArea"
    @click="emit('click')"
    @pointerdown="onDragStart"
    @pointerup="onDragEnd"
    @pointerupoutside="onDragEnd"
  >
    <slot />
  </graphics>
</template>

<script setup lang="ts">
import { useGardenStore } from '@/stores/garden'
import type { Bed, Vector } from '@/types/garden'
import type { PolygonStyling } from '@/types/shapes'
import { drawPolygon } from '@/utils/builder'
import type { Graphics } from 'pixi.js'
import { Colours } from '@/types/colours'
import { TransitionPresets, useTransition } from '@vueuse/core'
import { useStage } from 'vue3-pixi'
import { computed, ref } from 'vue'
import type { FederatedPointerEvent } from 'pixi.js'
import { Polygon } from 'pixi.js'
import { worldToGarden } from '@/utils'
import { VectorUtil } from '@/utils/vectorUtil'
import { useAppStore } from '@/stores/app'

const props = defineProps<{
  bed: Bed
  scaleTarget: number
}>()

const emit = defineEmits<{
  (e: 'drag', dragLoc: Vector): void
  (e: 'click'): void
}>()

const gardenStore = useGardenStore()
const appStore = useAppStore()
const VUtil = new VectorUtil()

const hitArea = computed(() => new Polygon(props.bed.shape))
const scale = useTransition(props.scaleTarget, {
  duration: 100,
  transition: TransitionPresets.easeOutQuad
})

const drawBed = (g: Graphics) => {
  const styling: Partial<PolygonStyling> = {
    shape: props.bed.shape,
    scale: scale.value,
    lineThickness: 1 / gardenStore.position.scale,
    fillColour: props.bed.plant.color,
    lineAlpha: 0.9,
    fillAlpha: 0.4
  }
  drawPolygon(g, styling)
}

const drawDropShadow = (g: Graphics) => {
  const styling: Partial<PolygonStyling> = {
    shape: props.bed.shape,
    scale: scale.value,
    fillAlpha: (scale.value - 1) * 2,
    fillColour: Colours.black,
    offset: 7.5 / gardenStore.position.scale
  }
  drawPolygon(g, styling)
}

const stage = useStage()
const dragLoc = ref<Vector>()
const onDragStart = (e: FederatedPointerEvent) => {
  if (appStore.isEditMode) {
    const gardenLoc = worldToGarden(e.global)
    dragLoc.value = VUtil.moveOrigin(props.bed.location, gardenLoc)
    stage.value!.addEventListener('pointermove', onDrag)
  }
}

const onDragEnd = () => {
  stage.value!.removeEventListener('pointermove', onDrag)
}

const onDrag = () => {
  emit('drag', dragLoc.value!)
}
</script>
