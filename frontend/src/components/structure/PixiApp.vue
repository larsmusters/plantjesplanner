<template>
  <!-- To-do's:
    Difficult things: 
    - Remove beds, plants are directly in garden. (simplify!)
    - !! Load textures from jpegs (all features are one picture), store in useSprites.
    - Define animation type, which controls rotation, position.
    - Build movement physics engine.

    - On edit mode, allow removing a plant.
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
import { useSprites } from '@/composables/useSprites'

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

const { addSpritesheet } = useSprites()
const onResolved = (sheet: Spritesheet) => {
  // Loads the file with all the sprites into the sprite data
  addSpritesheet(sheet)
}

watch(
  () => [props.width, props.height],
  () => {
    setGardenPosition()
  }
)
</script>
