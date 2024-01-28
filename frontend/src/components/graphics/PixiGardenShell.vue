<template>
  <container :cache-as-bitmap="true">
    <graphics ref="el" @render="drawEdge" />
  </container>
</template>

<script setup lang="ts">
import { Colours } from '@/types/colours'
import type { Vertex, PolygonStyling } from '@/types'
import { drawPolygon } from '@/utils/builder'
import type { Graphics } from 'pixi.js'

const props = defineProps<{
  path: Vertex[]
}>()

const drawEdge = (g: Graphics) => {
  const styling: Partial<PolygonStyling> = {
    lineThickness: 2,
    lineColour: Colours.edge,
    lineAlpha: 0.5,
    fillColour: Colours.inside,
    shape: props.path
  }
  drawPolygon(g, styling)
}
</script>
