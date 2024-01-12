<template>
  <container :ref="(el) => (containerRef = el)" :position="bed.location">
    <graphics @render="drawDropShadow">
      <blur-filter :quality="2" :blur="4" />
    </graphics>
    <graphics ref="el" @render="drawBed" :hitArea="hitArea" @click="bedClicked">
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
      <graphics
        v-for="point in props.bed.shape"
        :key="point"
        @render="(g: Graphics) => drawEditPoint(g, point)"
        :hit-area="getEditPointHitArea(point)"
        @click="editPointClicked"
      />
    </template>
  </container>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { TransitionPresets, useElementHover, useTransition } from '@vueuse/core'
import { Graphics, Polygon, AnimatedSprite } from 'pixi.js'
import { Colours } from '@/types/colours'
import '@pixi/graphics-extras'
import type { Bed, PolygonPoint } from '@/types/garden'
import type { Container } from 'pixi.js'
import { drawPolygon, drawPolygonVertex } from '@/utils/builder'
import type { PolygonStyling } from '@/types/shapes'
import { Circle } from 'pixi.js'

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

const drawEditPoint = (g: Graphics, p: PolygonPoint) => {
  const styling = {
    shape: props.bed.shape,
    scale: scaleAnimated.value,
    lineThickness: 2,
    fillColour: Colours.black,
    location: p
  }
  drawPolygonVertex(g, styling)
}

const getEditPointHitArea = (p: PolygonPoint) => {
  const radius = 5
  return new Circle(p.x, p.y, radius)
}

const editPointClicked = () => {
  console.log('clicked')
}

const bedClicked = () => {
  emit('click:bed', containerRef.value)
}
</script>
