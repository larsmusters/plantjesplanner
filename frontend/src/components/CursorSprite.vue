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
  resource.animation = sheet.animations['adventurer-attack1']
}

const size = 32
const buildPolygon = (s: number = 1) => {
  const e = size

  return [
    { x: e * s, y: -e * s },
    { x: 2 * e * s, y: e * s },
    { x: -e * s, y: 2 * e * s },
    { x: -e * s, y: -e * s },
    { x: -2 * e * s, y: -e * s },
    { x: -e * s, y: -3 * e * s }
  ]
}

const hitArea = new Polygon(buildPolygon(1))
const el = ref()

const hovering = useElementHover(el)

const scale = computed(() => (hovering.value ? 1.1 : 1))
const scaleAnimated = useTransition(scale, {
  duration: 100,
  transition: TransitionPresets.easeOutQuad
})

const blur = computed(() => (hovering.value ? 0 : 1))
const blurAnimated = useTransition(blur, {
  duration: 300,
  transition: TransitionPresets.easeOutQuad
})

function drawOutline(g: Graphics) {
  g.clear()

  g.lineStyle(2, Colours.grey)

  g.beginFill(Colours.green, 1)
  if (g.drawRoundedShape) {
    g.drawRoundedShape(buildPolygon(scaleAnimated.value), 5)
  }
  g.endFill()
}

const drawDropShadow = (g: Graphics) => {
  g.clear()

  const s = scaleAnimated.value
  g.beginFill(Colours.black, (scaleAnimated.value - 1) * 10 * 0.1)
  g.drawRect(-size * s, -size * s, (size * 2 + 8) * s, (size * 2 + 8) * s)
  g.endFill()
}

function onChangeAnimation() {
  const keys = Object.keys(resource.spritesheet!.animations)
  const randomIndex = Math.floor(Math.random() * keys.length)
  resource.animation = resource.spritesheet!.animations[keys[randomIndex]]
}
</script>

<template>
  <container>
    <graphics @render="drawDropShadow">
      <blur-filter :quality="10" :blur="20" />
    </graphics>
    <graphics ref="el" @render="drawOutline" :hitArea="hitArea">
      <!-- <sprite
        texture="@/assets/flowers/Madelief.png"
        :scale="scaleAnimated * 0.4"
        :anchor="0.5"
        event-mode="static"
      >
      </sprite> -->
      <Loader
        :resources="{
          spritesheet:
            'https://raw.githubusercontent.com/hairyf/vue3-pixi/main/docs/public/assets/adventurer-spritesheet.json'
        }"
        @resolved="onResolved($event.spritesheet)"
      >
        <animated-sprite
          :textures="resource.animation"
          playing
          :animation-speed="0.1"
          :anchor="0.5"
          :scale="scaleAnimated"
          @loop="onChangeAnimation"
        />
      </Loader>
    </graphics>
  </container>
</template>
