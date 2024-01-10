<template>
  <container v-if="enabled">
    <graphics :position="position" @render="drawToolTip" />
    <text :position="position" :text="tooltipText" :style="textStyle" />
  </container>
</template>

<script setup lang="ts">
import { Colours } from '@/types/colours'
import type { FederatedPointerEvent, Graphics } from 'pixi.js'
import { useEventListener } from '@vueuse/core'
import { reactive, ref, type StyleValue, type SVGAttributes } from 'vue'
import { useStage, onReady, useApplication } from 'vue3-pixi'

const textStyle = {
  fontFamily: 'Arial',
  fontSize: 17,
  wordWrap: true,
  wordWrapWidth: 100
}
const enabled = ref<boolean>(true)
const tooltipText = ref<string>('Mode: select')

const drawToolTip = (g: Graphics) => {
  g.beginFill(Colours.white, 0.9)
  g.lineStyle(1, Colours.grey)
  g.drawRoundedRect(0, 0, 100, 20, 4)
  g.endFill()
}

// from: https://vue3-pixi.vercel.app/examples/events/pointer-tracker.html
const stageRef = useStage()
const appRef = useApplication()

const position = reactive({ x: 0, y: 0 })
onReady((app) => {
  app.stage.eventMode = 'static'

  app.stage.hitArea = app.screen
  position.x = app.screen.width / 2
  position.y = app.screen.height / 2
})

const onPointerEvent = (event: FederatedPointerEvent) => {
  // Only change, position the object at the top right of the cursor
  const y_offset = event.global.y < 25 ? 20 : -20

  const appWidth = appRef.value.view.width
  const x_offset = appWidth - event.global.x < 110 ? -110 : 10

  const newLocation = { x: event.global.x + x_offset, y: event.global.y + y_offset }
  Object.assign(position, newLocation)
}

useEventListener(stageRef, 'pointermove', onPointerEvent)
</script>
