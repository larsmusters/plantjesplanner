<template>
  <container :position="position">
    <AddBed />
    <ToolTip v-if="tooltipEnabled" :cursor="position" />
  </container>
</template>

<script setup lang="ts">
import AddBed from './AddBed.vue'
import ToolTip from './ToolTip.vue'
import type { FederatedPointerEvent } from 'pixi.js'
import { useEventListener } from '@vueuse/core'
import { reactive } from 'vue'
import { useStage, onReady } from 'vue3-pixi'

// from: https://vue3-pixi.vercel.app/examples/events/pointer-tracker.html
const stageRef = useStage()

const tooltipEnabled = true

const position = reactive({ x: 0, y: 0 })
onReady((app) => {
  app.stage.eventMode = 'static'

  app.stage.hitArea = app.screen
  position.x = app.screen.width / 2
  position.y = app.screen.height / 2
})

const onPointerEvent = (event: FederatedPointerEvent) => {
  const newLocation = { x: event.global.x, y: event.global.y }
  Object.assign(position, newLocation)
}

useEventListener(stageRef, 'pointermove', onPointerEvent)
</script>
