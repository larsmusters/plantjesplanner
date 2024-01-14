<template>
  <container>
    <graphics @render="drawGrid" />
    <graphics @render="drawVertices" />
  </container>
</template>

<script setup lang="ts">
import { useGardenStore } from '@/stores'
import { useGridStore } from '@/stores/grid'
import { Colours } from '@/types/colours'
import { Graphics } from 'pixi.js'

const gardenStore = useGardenStore()
const gridStore = useGridStore()

const drawGrid = (g: Graphics) => {
  g.clear()
  g.lineStyle(1, Colours.black, 0.25)

  const bounds = gardenStore.bounds
  gridStore.columns.forEach((c) => {
    g.moveTo(c, bounds.y)
    g.lineTo(c, bounds.y + bounds.height)
  })
  gridStore.rows.forEach((r) => {
    g.moveTo(bounds.x, r)
    g.lineTo(bounds.x + bounds.width, r)
  })
}

const drawVertices = (g: Graphics) => {
  g.clear()
  g.lineStyle(1, Colours.black)

  gridStore.vertices.forEach((v) => {
    g.drawCircle(v.x, v.y, 2)
  })
}
</script>
