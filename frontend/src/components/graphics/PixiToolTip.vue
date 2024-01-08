<template>
  <container>
    <graphics :x="mouse.x.value" :y="mouse.y.value" @render="drawToolTip" />
    <text :x="mouse.x.value" :y="mouse.y.value" :text="tooltipText" />
  </container>
</template>

<script setup lang="ts">
import { Colours } from '@/types/colours'
import type { Graphics } from 'pixi.js'
import { useMouse } from '@vueuse/core'
import { ref } from 'vue'

const tooltipText = ref<string>()
const mouse = useMouse()

const drawToolTip = (g: Graphics) => {
  g.clear()
  g.lineStyle(1, Colours.red)
  g.beginFill(Colours.green)
  if (g.drawStar) {
    g.drawStar(-30, -30, 6, 30, 10, 0)
  }
  g.endFill()
}
</script>
