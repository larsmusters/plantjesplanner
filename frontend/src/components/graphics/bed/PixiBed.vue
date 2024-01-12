<template>
  <container :ref="(el) => (containerRef = el)" :position="bed.location">
    <graphics @render="drawDropShadow">
      <blur-filter :quality="2" :blur="4" />
    </graphics>
    <graphics
      ref="el"
      @render="drawBed"
      :hitArea="hitArea"
      @click="bedClicked"
      @pointerdown="onDragStart"
      @pointerup="onDragEnd"
      @pointerupoutside="onDragEnd"
    >
      <animated-sprite
        v-if="bed.animation.length"
        :textures="bed.animation"
        playing
        :animation-speed="0.04"
        :anchor="0.5"
        :scale="scaleAnimated * bed.animationScale"
      />
    </graphics>
    <template v-if="editMode">
      <BedVertex
        v-for="(point, index) in props.bed.shape"
        :key="index"
        :point="point"
        @set-to-cursor:point="editPoint(index)"
      />
    </template>
  </container>
</template>

<script setup lang="ts">
import BedVertex from './BedVertex.vue'
import { computed, ref, watch } from 'vue'
import { TransitionPresets, useElementHover, useTransition } from '@vueuse/core'
import { Graphics, Polygon, AnimatedSprite } from 'pixi.js'
import { Colours } from '@/types/colours'
import '@pixi/graphics-extras'
import type { Bed } from '@/types/garden'
import type { Container } from 'pixi.js'
import { drawPolygon } from '@/utils/builder'
import type { PolygonStyling } from '@/types/shapes'
import { useStage } from 'vue3-pixi'

const props = withDefaults(
  defineProps<{
    bed: Bed
    editMode?: boolean
  }>(),
  {
    editMode: false
  }
)

const emit = defineEmits<{
  (e: 'update:hover', container: Container): void
  (e: 'click:bed', container: Container): void
  (e: 'set-to-cursor:bed-vertex', index: number): void
  (e: 'set-to-cursor:bed'): void
}>()

const hitArea = new Polygon(props.bed.shape)
const el = ref()
const hovering = useElementHover(el)

const scale = computed(() => (hovering.value ? props.bed.heightOnHover : 1))
const scaleAnimated = useTransition(scale, {
  duration: 100,
  transition: TransitionPresets.easeOutQuad
})

const containerRef = ref()
watch(hovering, () => {
  if (hovering.value) {
    emit('update:hover', containerRef.value)
  }
})

const drawBed = (g: Graphics) => {
  const styling: Partial<PolygonStyling> = {
    shape: props.bed.shape,
    scale: scaleAnimated.value,
    lineThickness: 1,
    lineColour: props.bed.color,
    fillColour: props.bed.color,
    lineAlpha: 0.9,
    fillAlpha: 0.4
  }
  drawPolygon(g, styling)
}

const drawDropShadow = (g: Graphics) => {
  const styling: Partial<PolygonStyling> = {
    shape: props.bed.shape,
    scale: scaleAnimated.value,
    fillAlpha: (scaleAnimated.value - 1) * 2,
    fillColour: Colours.black,
    offset: 7.5
  }
  drawPolygon(g, styling)
}

const bedClicked = () => {
  emit('click:bed', containerRef.value)
}

const editPoint = (index: number) => {
  emit('set-to-cursor:bed-vertex', index)
}

const stage = useStage()
const onDragStart = () => {
  if (props.editMode) {
    stage.value!.addEventListener('pointermove', onDrag)
  }
}

const onDragEnd = () => {
  stage.value!.removeEventListener('pointermove', onDrag)
}

const onDrag = () => {
  emit('set-to-cursor:bed')
}
</script>
