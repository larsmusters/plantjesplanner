<template>
  <container ref="world">
    <graphics @render="drawWorld" />
    <container
      :x="gardenPosition.x"
      :y="gardenPosition.y"
      :rotation="gardenPosition.rotation"
      :scale="gardenPosition.scale"
    >
      <slot />
    </container>
  </container>
</template>

<script setup lang="ts">
import { Colours } from '@/types'
import type { Position } from '@/types'
import { type Graphics, Container } from 'pixi.js'
import { ref } from 'vue'

const props = defineProps<{
  gardenPosition: Position
  width: number
  height: number
}>()

const world = ref<Container>()

const drawWorld = (g: Graphics) => {
  g.clear()
  g.beginFill(Colours.background)
  g.drawRect(0, 0, props.width, props.height)
  g.endFill()
}
</script>
