<template>
  <!-- To-do's:
    Lame things: 
    - Put restrictions on the shape of the polygons

    Lame-ish things:
    - Make sure new additions are properly separated (currently adding 2 object makes them behave the same)
    - Construct a default shapes library, with proper 'inheritance'

    Fun-ish things:
    Add a 'grid' structure to every bed (with the bed itself some margin inset to that one)

    Fun things:
    - Make a grid and snap vertices to the grid
    - Allow adding of different standard bed shapes
    - Display information on the component that is being hovered,
    - Collect more information on plants.
  -->

  <Application background="white" :width="width" :height="height">
    <World :garden-position="gardenPosition" :width="width" :height="height">
      <Loader
        :resources="{ spritesheet: 'flowers.json' }"
        @resolved="onResolved($event.spritesheet)"
      >
        <PixiGarden />
      </Loader>
    </World>
    <PixiCursor />
  </Application>
</template>

<script setup lang="ts">
import World from './PixiWorld.vue'
import PixiCursor from '@/components/cursor/PixiCursor.vue'
import PixiGarden from './PixiGarden.vue'
import { ref, watch } from 'vue'
import { Loader, Application } from 'vue3-pixi'
import { Spritesheet } from 'pixi.js'
import type { Position } from '@/types'
import { useGardenStore } from '@/stores'

const props = defineProps<{
  width: number
  height: number
}>()

const gardenStore = useGardenStore()

const gardenPosition = ref<Position>({ x: 0, y: 0, scale: 1, rotation: 0 })
const setGardenPosition = (): void => {
  // The function provides world coordinates to center and scale the garden based on the screen size and garden bounds.
  const bounds = gardenStore.bounds
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
  gardenStore.position = gardenPosition.value
}
setGardenPosition()

const onResolved = (sheet: Spritesheet) => {
  // Populate gardenbeds with animations
  gardenStore.garden!.beds.forEach((bed) => (bed.animation = sheet.animations[bed.plant]))
  gardenStore.newBed.animation = sheet.animations[gardenStore.newBed.plant]
}

watch(
  () => [props.width, props.height],
  () => {
    setGardenPosition()
  }
)
</script>
