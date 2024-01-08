<template>
  <!-- To-do's:
    Fun things:
    - Start building the yard construction tool,
    - Display information on the component that is being hovered,
    - Collect more information on plants.
    -->
  <Application ref="app" background="white" :width="620" :height="600">
    <Loader :resources="{ spritesheet: 'flowers.json' }" @resolved="onResolved($event.spritesheet)">
      <template v-for="bed in fakeGarden.beds" :key="bed.id">
        <PixiBed :bed="bed" @update:hover="raiseBedIndex" @clicki="bedClicked" />
      </template>
    </Loader>
  </Application>
</template>

<script setup lang="ts">
import PixiBed from '@/components/graphics/PixiBed.vue'
import { ref } from 'vue'
import { Application, Loader } from 'vue3-pixi'
import type { ApplicationInst } from 'vue3-pixi'
import { Spritesheet, Container } from 'pixi.js'
import { fakeGarden } from '@/config'
import type { Garden } from '@/types/garden'

const app = ref<ApplicationInst>()

const garden = ref<Garden>(fakeGarden)

const onResolved = (sheet: Spritesheet) => {
  // Populate gardenbeds with animations
  garden.value.beds.forEach((bed) => (bed.animation = sheet.animations[bed.plant]))
}

const raiseBedIndex = (container: Container) => {
  app.value?.app.stage.sortChildren()

  const highestIndex = (app.value?.app.stage.children.length || 1) - 1
  app.value?.app.stage.setChildIndex(container, highestIndex)
}

const bedClicked = (container: Container) => {
  console.log('bed Clicked!', container)
}
</script>
