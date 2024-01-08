<template>
  <container :ref="(el) => (containerRef = el)" :x="bed.location.x" :y="bed.location.y">
    <graphics @render="drawDropShadow">
      <blur-filter :quality="10" :blur="20" />
    </graphics>
    <graphics ref="el" @render="drawPolygon" :hitArea="hitArea" @click="bedClicked">
      <animated-sprite
        :textures="bed.animation"
        playing
        :animation-speed="0.08"
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

const props = defineProps<{
  bed: Bed
}>()

const emit = defineEmits<{
  (e: 'update:hover', container: Container): void
  (e: 'click:bed', container: Container): void
}>()

const buildPolygon = (s: number = 1, o: number = 0) => {
  return props.bed.shape.map((point) => {
    return { x: point.x * s + o, y: point.y * s + o, radius: point.radius * s }
  })
}

const hitArea = new Polygon(buildPolygon())
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

const drawPolygon = (g: Graphics) => {
  g.clear()

  g.lineStyle(0.5, Colours.dirtLight, 0.5)

  g.beginFill(props.bed.color, 1)
  if (g.drawRoundedShape) {
    g.drawRoundedShape(buildPolygon(scaleAnimated.value), 0)
  }
  g.endFill()
}

const drawDropShadow = (g: Graphics) => {
  g.clear()

  g.beginFill(Colours.black, (scaleAnimated.value - 1) * 2)
  if (g.drawRoundedShape) {
    g.drawRoundedShape(buildPolygon(scaleAnimated.value, 5), 0)
  }
  g.endFill()
}

const bedClicked = (e: any) => {
  emit('click:bed', containerRef.value)
}
</script>
