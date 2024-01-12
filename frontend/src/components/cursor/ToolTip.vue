<template>
  <graphics :position="position" @render="drawToolTip" />
  <text :position="position" :text="gardenStore.clickMode.valueOf()" :style="textStyle" />
</template>

<script setup lang="ts">
import { useGardenStore } from '@/stores'
import { Colours } from '@/types/colours'
import type { Graphics } from 'pixi.js'
import { computed } from 'vue'
import { useApplication } from 'vue3-pixi'

const props = defineProps<{
  cursor: { x: number; y: number }
}>()

const gardenStore = useGardenStore()

const app = useApplication()

const textStyle = {
  fontFamily: 'Arial',
  fontSize: 17,
  wordWrap: true,
  wordWrapWidth: 100
}

const drawToolTip = (g: Graphics) => {
  g.beginFill(Colours.white, 0.9)
  g.lineStyle(1, Colours.grey)
  g.drawRoundedRect(0, 0, 100, 20, 4)
  g.endFill()
}

const position = computed(() => {
  const y_offset = props.cursor.y < 30 ? 20 : -20

  const appWidth = app.value.view.width
  const x_offset = appWidth - props.cursor.x < 140 ? -110 : 10

  const newLocation = { x: x_offset, y: y_offset }
  return newLocation
})
</script>
