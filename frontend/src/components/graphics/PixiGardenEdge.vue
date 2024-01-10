<template>
  <graphics ref="el" @render="drawEdge" />
</template>

<script setup lang="ts">
import { Colours } from '@/types/colours'
import type { PolygonPoint } from '@/types/garden'
import type { Graphics } from 'pixi.js'

const props = defineProps<{
  path: PolygonPoint[]
}>()

// Re-used, consider importing thiss
const buildPolygon = (s: number = 1, o: number = 0) => {
  return props.path.map((point) => {
    return { x: point.x * s + o, y: point.y * s + o, radius: point.radius * s }
  })
}

const drawEdge = (g: Graphics) => {
  g.clear()

  g.lineStyle(2, Colours.edge, 0.5)

  g.beginFill(Colours.inside, 1)
  if (g.drawRoundedShape) {
    g.drawRoundedShape(buildPolygon(1), 0)
  }
  g.endFill()
}
</script>
