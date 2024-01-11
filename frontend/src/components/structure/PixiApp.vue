<template>
  <!-- To-do's:
    Fun things:
    - -> doing this one, see store Start building the yard construction tool, (build polygon with clicks),
    - Display information on the component that is being hovered,
    - Collect more information on plants.
  -->

  <Application background="white" :width="width" :height="height" @click="isClicked">
    <World :garden-position="gardenPosition" :width="width" :height="height">
      <Loader
        :resources="{ spritesheet: 'flowers.json' }"
        @resolved="onResolved($event.spritesheet)"
      >
        <PixiGarden :garden="fakeGarden" />
      </Loader>
    </World>
    <PixiCursor />
  </Application>
</template>

<script setup lang="ts">
import World from './PixiWorld.vue'
import PixiCursor from '@/components/cursor/PixiCursor.vue'
// import ToolTip from '@/components/graphics/PixiToolTip.vue'
import PixiGarden from './PixiGarden.vue'
import { useEventListener } from '@vueuse/core'
import { ref, watch } from 'vue'
import { Loader, Application, useStage } from 'vue3-pixi'
import { Spritesheet } from 'pixi.js'
import type { Bed, PolygonPoint } from '@/types/garden'
import type { Position, BoundingBox } from '@/types'
import { fakeGarden } from '@/config'
import { useGardenStore } from '@/stores'
import { ClickMode } from '@/types'
const props = defineProps<{
  width: number
  height: number
}>()

const gardenStore = useGardenStore()
gardenStore.garden = fakeGarden

const isClicked = (e: PointerEvent) => {
  console.log(e.offsetY, e.offsetX)
  if (gardenStore.clickMode === ClickMode.add) {
    // figure out where was clicked in application (relative to garden)
    const newBed: Partial<Bed> = { location: { x: e.offsetX, y: e.offsetY } }
    gardenStore.addBed(newBed)
  }
}

const getGardenBounds = (gardenShape: PolygonPoint[]): BoundingBox => {
  let [xMin, xMax, yMin, yMax] = [1e6, -1e6, 1e6, -1e6]
  gardenShape.forEach((point) => {
    xMin = xMin > point.x ? point.x : xMin
    xMax = xMax < point.x ? point.x : xMax
    yMin = yMin > point.y ? point.y : yMin
    yMax = yMax < point.y ? point.y : yMax
  })
  return { xMin, xMax, yMin, yMax }
}

const gardenPosition = ref<Position>({ x: 0, y: 0, scale: 1, rotation: 0 })
const setGardenPosition = (): void => {
  // The function provides world coordinates to center and scale the garden based on the screen size and garden bounds.
  const bounds = getGardenBounds(gardenStore.garden!.shape)
  const boundMargin = 18 // Screen pixels

  const scaleY = (props.height - 2 * boundMargin) / (bounds.yMax - bounds.yMin)
  const scaleX = (props.width - 2 * boundMargin) / (bounds.xMax - bounds.xMin)
  const scale = scaleY < scaleX ? scaleY : scaleX

  // Always move to zero, and move either to the middle, or the margin away from the boundary
  let x = -bounds.xMin * scale
  x += scale === scaleY ? (props.width - (bounds.xMax - bounds.xMin) * scaleY) / 2 : boundMargin
  let y = -bounds.yMin * scale
  y += scale === scaleX ? (props.height - (bounds.yMax - bounds.yMin) * scaleX) / 2 : boundMargin

  gardenPosition.value = { x, y, scale, rotation: 0 }
}
setGardenPosition()

const onResolved = (sheet: Spritesheet) => {
  // Populate gardenbeds with animations
  gardenStore.garden!.beds.forEach((bed) => (bed.animation = sheet.animations[bed.plant]))
}

watch(
  () => [props.width, props.height],
  () => {
    setGardenPosition()
  }
)
</script>
