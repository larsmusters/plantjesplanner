<template>
  <!-- To-do's:
    Lame things: 
    - Put restrictions on the shape of the polygons (non-intersecting)

    Lame-ish things:
    - Construct a default shapes library, with proper 'inheritance'
    
    Important things:
    - Make a physical mapping from distances to pixels -> already kind of done, as I scale everything to screen width anyway

    Fun-ish things:
    Add a 'grid' structure to every bed (with the bed itself some margin inset to that one)

    Fun things:
    - Make a grid and snap vertices to the grid
    - Allow moving by edge (now only by bed and vertex).
    - Allow adding of different standard bed shapes
    - Display information on the component that is being hovered,
    - Collect more information on plants.
  -->

  <Application background="white" :width="width" :height="height">
    <World :garden-position="gardenStore.position" :width="width" :height="height">
      <Loader
        :resources="{ spritesheet: 'flowers.json' }"
        @resolved="onResolved($event.spritesheet)"
      >
        <PixiGarden />
      </Loader>
      <!-- Grid is in garden space (everything in World is) -->
      <Grid />
    </World>
    <!-- Cursor in screen space, because it interacts with the edges of the screen -->
    <PixiCursor />
  </Application>
</template>

<script setup lang="ts">
import Grid from './PixiGrid.vue'
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
