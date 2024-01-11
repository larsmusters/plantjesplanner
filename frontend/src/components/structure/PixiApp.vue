<template>
  <!-- To-do's:
    Lame things:
    -re-factor PixiBed

    Fun things:
    - !!Start building the yard construction tool, (build polygon with clicks),
    - Display information on the component that is being hovered,
    - Collect more information on plants.
  -->

  <Application background="white" :width="width" :height="height">
    <World :position="position">
      <Loader
        :resources="{ spritesheet: 'flowers.json' }"
        @resolved="onResolved($event.spritesheet)"
      >
        <PixiGarden :garden="fakeGarden" />
      </Loader>
    </World>
    <ToolTip />
  </Application>
</template>

<script setup lang="ts">
import World from './PixiWorld.vue'
import ToolTip from '@/components/graphics/PixiToolTip.vue'
import PixiGarden from './PixiGarden.vue'
import { ref, watch } from 'vue'
import { Loader, Application } from 'vue3-pixi'
import { Spritesheet } from 'pixi.js'
import type { Garden, PolygonPoint } from '@/types/garden'
import type { WorldPosition, BoundingBox } from '@/types'
import { fakeGarden } from '@/config'

const props = defineProps<{
  width: number
  height: number
}>()

const garden = ref<Garden>(fakeGarden)

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

const position = ref<WorldPosition>({ x: 0, y: 0, scale: 1, rotation: 0 })
const setWorldPosition = (): void => {
  // The function provides world coordinates to center and scale the garden based on the screen size and garden bounds.
  const bounds = getGardenBounds(garden.value.shape)
  const boundMargin = 18 // Screen pixels

  const scaleY = (props.height - 2 * boundMargin) / (bounds.yMax - bounds.yMin)
  const scaleX = (props.width - 2 * boundMargin) / (bounds.xMax - bounds.xMin)
  const scale = scaleY < scaleX ? scaleY : scaleX

  // Always move to zero, and move either to the middle, or the margin away from the boundary
  let x = -bounds.xMin * scale
  x += scale === scaleY ? (props.width - (bounds.xMax - bounds.xMin) * scaleY) / 2 : boundMargin
  let y = -bounds.yMin * scale
  y += scale === scaleX ? (props.height - (bounds.yMax - bounds.yMin) * scaleX) / 2 : boundMargin

  position.value = { x, y, scale, rotation: 0 }
}
setWorldPosition()

const onResolved = (sheet: Spritesheet) => {
  // Populate gardenbeds with animations
  garden.value.beds.forEach((bed) => (bed.animation = sheet.animations[bed.plant]))
}

watch(
  () => props.width + props.height,
  () => {
    setWorldPosition()
  }
)
</script>
