<template>
  <container>
    <graphics @render="drawGrid" />
  </container>
</template>

<script setup lang="ts">
import { Colours } from '@/types/colours'
import type { Graphics } from 'pixi.js'

const drawGrid = (g: Graphics) => {
  g.clear()
  g.lineStyle(3, Colours.black)
  g.drawCircle(0, 0, 10)
}
</script>
