<template>
  <graphics ref="el" @render="drawEdge" />
</template>

<script setup lang="ts">
import { Colours } from '@/types/colours'
import type { PolygonPoint } from '@/types/garden'
import type { PolygonStyling } from '@/types/shapes'
import { drawPolygon } from '@/utils/builder'
import type { Graphics } from 'pixi.js'

const props = defineProps<{
  path: PolygonPoint[]
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
