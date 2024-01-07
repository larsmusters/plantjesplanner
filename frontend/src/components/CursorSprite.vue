<template>
  <container>
    <graphics @render="drawDropShadow">
      <blur-filter :quality="10" :blur="20" />
    </graphics>
    <graphics ref="el" @render="drawOutline" :hitArea="hitArea">
      <Loader
        :resources="{
          spritesheet: 'madelief.json'
        }"
        @resolved="onResolved($event.spritesheet)"
      >
        <animated-sprite
          :textures="resource.animation"
          playing
          :animation-speed="0.08"
          :anchor="0.5"
          :scale="scaleAnimated * 0.4"
          @loop="onChangeAnimation"
        />
      </Loader>
    </graphics>
  </container>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from 'vue'
import { Graphics } from 'pixi.js'
import { TransitionPresets, useElementHover, useTransition } from '@vueuse/core'
import { Polygon, AnimatedSprite, Spritesheet, Texture } from 'pixi.js'
import '@pixi/graphics-extras'
import { Loader } from 'vue3-pixi'
import { Colours } from '../types/colours'

const resource = reactive({
  spritesheet: undefined as undefined | Spritesheet,
  animation: undefined as undefined | Texture[]
})

function onResolved(sheet: Spritesheet) {
  resource.spritesheet = sheet
  console.log('resolved', sheet)
  resource.animation = sheet.animations['flower']
}

const size = 30
const buildPolygon = (s: number = 1, o: number = 0) => {
  const e = size
  const radius = 10 * s
  return [
    { x: e * s + o, y: -e * s + o, radius },
    { x: e * s + o, y: o, radius },
    { x: 2 * e * s + o, y: o, radius },
    { x: 2 * e * s + o, y: e * s + o, radius },
    { x: -e * s + o, y: e * s + o, radius: 10 },
    { x: -e * s + o, y: o, radius: 10 },
    { x: -2 * e * s + o, y: o, radius: 10 },
    { x: -2 * e * s + o, y: -e * s + o, radius: 10 }
  ]
}

const hitArea = new Polygon(buildPolygon(1))
const el = ref()

const hovering = useElementHover(el)

const scale = computed(() => (hovering.value ? 1.05 : 1))
const scaleAnimated = useTransition(scale, {
  duration: 100,
  transition: TransitionPresets.easeOutQuad
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

  // g.drawRect(-size * s, -size * s, (size * 2 + 8) * s, (size * 2 + 8) * s)
  g.endFill()
}

function onChangeAnimation() {
  const keys = Object.keys(resource.spritesheet!.animations)
  const randomIndex = Math.floor(Math.random() * keys.length)
  resource.animation = resource.spritesheet!.animations[keys[randomIndex]]
}
</script>
