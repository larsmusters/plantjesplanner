<template>
  <!-- To-do's:
    Lame things:
    -re-factor PixiBed

    Fun things:
    - !!Start building the yard construction tool, (build polygon with clicks),
    - Center and scale the garden such that it is always in view on load,
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
      <ToolTip />
    </World>
  </Application>
</template>

<script setup lang="ts">
import World from './PixiWorld.vue'
import ToolTip from '@/components/graphics/PixiToolTip.vue'
import PixiGarden from './PixiGarden.vue'
import { ref } from 'vue'
import { Loader, Application } from 'vue3-pixi'
import { Spritesheet } from 'pixi.js'
import type { Garden } from '@/types/garden'
import type { WorldPosition } from '@/types'
import { fakeGarden } from '@/config'

defineProps<{
  width: number
  height: number
}>()

const position = ref<WorldPosition>({ x: 0, y: 0, scale: 1, rotation: 0 })

const garden = ref<Garden>(fakeGarden)
const onResolved = (sheet: Spritesheet) => {
  // Populate gardenbeds with animations
  garden.value.beds.forEach((bed) => (bed.animation = sheet.animations[bed.plant]))
}
</script>
