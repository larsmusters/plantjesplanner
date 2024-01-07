<template>
  <container :ref="(el) => (containerRef = el)">
    <graphics @render="drawDropShadow">
      <blur-filter :quality="10" :blur="20" />
    </graphics>
    <graphics ref="el" @render="drawOutline" :hitArea="hitArea">
      <animated-sprite
        :textures="resource.animation"
        playing
        :animation-speed="0.08"
        :anchor="0.5"
        :scale="scaleAnimated * 0.4"
      />
    </graphics>
  </container>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Graphics } from 'pixi.js'
import { TransitionPresets, useElementHover, useTransition } from '@vueuse/core'
import { Polygon, AnimatedSprite } from 'pixi.js'
import type { Resource } from '@/types'
import { Colours } from '@/types/colours'
import '@pixi/graphics-extras'

defineProps<{
  resource: Resource
  refName?: string
}>()

const emit = defineEmits<{
  (e: 'update:hover', container: any): void
}>()

const size = 30
const buildPolygon = (s: number = 1, o: number = 0) => {
  const e = size
  const radius = 20 * s
  return [
    { x: e * s + o, y: -e * s + o, radius },
    { x: 2 * e * s + o, y: e * s + o, radius },
    { x: -e * s + o, y: e * s + o, radius },
    { x: -2 * e * s + o, y: -e * s + o, radius }
  ]
}

const hitArea = new Polygon(buildPolygon(1))
const el = ref()

const hovering = useElementHover(el)

const scale = computed(() => (hovering.value ? 1.25 : 1))
const scaleAnimated = useTransition(scale, {
  duration: 100,
  transition: TransitionPresets.easeOutQuad
})

const containerRef = ref()
watch(hovering, () => {
  if (hovering.value == true) {
    emit('update:hover', containerRef.value)
  }
})
function drawOutline(g: Graphics) {
  g.clear()

  g.lineStyle(2, Colours.grey)

  g.beginFill(Colours.green, 1)
  if (g.drawRoundedShape) {
    g.drawRoundedShape(buildPolygon(scaleAnimated.value), 0)
  }
  g.endFill()
}

const drawDropShadow = (g: Graphics) => {
  g.clear()

  const s = scaleAnimated.value
  g.beginFill(Colours.black, (scaleAnimated.value - 1) * 10 * 0.25)
  if (g.drawRoundedShape) {
    g.drawRoundedShape(buildPolygon(scaleAnimated.value, 5), 0)
  }
  g.endFill()
}
</script>
