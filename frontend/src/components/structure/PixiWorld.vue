<template>
  <graphics @render="drawWorld"></graphics>
  <graphics
    :x="gardenPosition.x"
    :y="gardenPosition.y"
    :rotation="gardenPosition.rotation"
    :scale="gardenPosition.scale"
  >
    <slot />
  </graphics>
</template>

<script setup lang="ts">
import { Colours } from '@/types/colours'
import type { Position } from '@/types/index'
import type { Graphics } from 'pixi.js'

const props = defineProps<{
  gardenPosition: Position
  width: number
  height: number
}>()

const drawWorld = (g: Graphics) => {
  g.clear()
  g.beginFill(Colours.background)
  g.drawRect(0, 0, props.width, props.height)
  g.endFill()
}
</script>
