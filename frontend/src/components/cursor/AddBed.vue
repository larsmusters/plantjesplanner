<template>
  <graphics @render="drawAddBed" />
</template>

<script setup lang="ts">
import { Colours } from '@/types/colours'
import type { PolygonStyling } from '@/types/shapes'
import { drawPolygon } from '@/utils/builder'
import type { Graphics } from 'pixi.js'

const drawAddBed = (g: Graphics) => {
  const styling: Partial<PolygonStyling> = {
    shape: [
      { x: -30, y: -30, radius: 0 },
      { x: 30, y: -30, radius: 0 },
      { x: 30, y: 30, radius: 0 },
      { x: -30, y: 30, radius: 0 }
    ],
    fillAlpha: 0.2,
    lineAlpha: 0.7,
    lineThickness: 3,
    fillColour: Colours.blue,
    lineColour: Colours.blue,
    vertexRadius: 7,
    vertexFillColour: Colours.blue,
    vertexLineColour: Colours.blue,
    vertexAlpha: 0.7
  }

  drawPolygon(g, styling)
}
</script>
