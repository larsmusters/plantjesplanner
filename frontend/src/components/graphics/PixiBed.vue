<template>
  <container :ref="(el) => (containerRef = el)" :x="bed.location.x" :y="bed.location.y">
    <graphics @render="drawDropShadow">
      <blur-filter :quality="10" :blur="20" />
    </graphics>
    <graphics ref="el" @render="drawBed" :hitArea="hitArea" @click="bedClicked">
      <animated-sprite
        :textures="bed.animation"
        playing
        :animation-speed="0.04"
        :anchor="0.5"
        :scale="scaleAnimated * bed.animationScale"
      />
    </graphics>
  </container>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { TransitionPresets, useElementHover, useTransition } from '@vueuse/core'
import { Graphics, Polygon, AnimatedSprite } from 'pixi.js'
import { Colours } from '@/types/colours'
import '@pixi/graphics-extras'
import type { Bed } from '@/types/garden'
import type { Container } from 'pixi.js'
import { drawPolygon } from '@/utils/builder'
import type { PolygonStyling } from '@/types/shapes'

const props = defineProps<{
  bed: Bed
}>()

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
    lineThickness: 0.5,
    lineColour: Colours.dirtLight,
    fillColour: props.bed.color,
    lineAlpha: 0.5
  }
  drawPolygon(g, styling)
}

const drawDropShadow = (g: Graphics) => {
  const styling: Partial<PolygonStyling> = {
    shape: props.bed.shape,
    scale: scaleAnimated.value,
    fillAlpha: (scaleAnimated.value - 1) * 2,
    fillColour: Colours.black,
    offset: 5
  }
  drawPolygon(g, styling)
}

const bedClicked = (e: any) => {
  emit('click:bed', containerRef.value)
}
</script>
