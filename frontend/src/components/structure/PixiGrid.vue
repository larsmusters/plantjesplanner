<template>
  <container :cache-as-bitmap="true">
    <graphics @render="drawGrid" />
    <graphics @render="drawVertices" />
  </container>
</template>

<script setup lang="ts">
import { useGridStore, useGardenStore } from '@/stores'
import { Colours } from '@/types'
import { Graphics } from 'pixi.js'

const gardenStore = useGardenStore()
const gridStore = useGridStore()

const drawGrid = (g: Graphics) => {
  g.clear()
  g.lineStyle(1 / gardenStore.position.scale, Colours.black, 0.25)

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
  g.lineStyle(1 / gardenStore.position.scale, Colours.black, 0.25)

  gridStore.vertices.forEach((v) => {
    g.drawCircle(v.x, v.y, 2 / gardenStore.position.scale)
  })
}
</script>
