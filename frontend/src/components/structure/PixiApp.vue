<template>
  <!-- To-do's:
    Difficult things: 
    - Load SVG's instead of png's? And load them in a random pattern within the bed.
    - On edit mode, allow removing a bed.
    - On edit mode, only edit the bed you have selected.
    - Build a system that defines the looks of the beds properly (based on plants and month) 
    - Build constraint-sets per shape-type (square, rectangle, etc)
    - Allow reversing changes from edit mode.

    Fun-ish things:
    - Add the ability to add other things in the garden (such as a 'path')
    - Add a 'grid' structure to every bed (with the bed itself some margin inset to that one)
    - Add image of plant to plant selector (and think about how to deal with 1000 images in the future...)

    After these things (pending more stuff):
    - Build backend to store garden
    - Allow selecting a different garden (and a garden edit page?)
    - Build a section where you can alter the shape library
    - Build a section where you can alter the plant library (and with that any active plants)

    After these things (pending more stuff):
    - Add info on plants: (height(t), colour(time))
    - Add visuals designs for heights and colours
    - Add a slider to visualise the garden each month
  -->

  <Application background="white" :width="width" :height="height">
    <World :garden-position="gardenStore.position" :width="width" :height="height">
      <Loader
        :resources="{ spritesheet: 'flowers.json' }"
        @resolved="onResolved($event.spritesheet)"
      >
        <PixiGarden />
      </Loader>
    </World>
    <!-- Cursor in screen space, because it interacts with the edges of the screen -->
    <PixiCursor />
  </Application>
</template>

<script setup lang="ts">
import World from './PixiWorld.vue'
import PixiCursor from '@/components/cursor/PixiCursor.vue'
import PixiGarden from './PixiGarden.vue'
import { watch } from 'vue'
import { Loader, Application } from 'vue3-pixi'
import { Spritesheet } from 'pixi.js'
import { useGardenStore } from '@/stores'

const props = defineProps<{
  width: number
  height: number
}>()

const gardenStore = useGardenStore()
const setGardenPosition = (): void => {
  // The function provides world coordinates to center and scale the garden based on the screen size and garden bounds.
  const bounds = gardenStore.bounds
  const boundMargin = 18 // Screen pixels

  const scaleY = (props.height - 2 * boundMargin) / bounds.height
  const scaleX = (props.width - 2 * boundMargin) / bounds.width

  let scale, x, y
  if (scaleY < scaleX) {
    scale = scaleY
    // Move to zero, and move either to the middle, or the margin away from the boundary
    x = -bounds.x * scale + (props.width - bounds.width * scale) / 2
    y = -bounds.y * scale + boundMargin
  } else {
    scale = scaleX
    x = -bounds.x * scale + boundMargin
    y = -bounds.y * scale + (props.height - bounds.height * scale) / 2
  }

  gardenStore.position = { x, y, scale, rotation: 0 }
}
setGardenPosition()

const onResolved = (sheet: Spritesheet) => {
  gardenStore.spritesheet = sheet
}

watch(
  () => [props.width, props.height],
  () => {
    setGardenPosition()
  }
)
</script>
