<template>
  <!-- To-do's:
    Lame things:
    -re-factor PixiBed

    Fun things:
    - !!Start building the yard construction tool, (build polygon with clicks)
    - Display information on the component that is being hovered,
    - Collect more information on plants.
    -->
  <Loader :resources="{ spritesheet: 'flowers.json' }" @resolved="onResolved($event.spritesheet)">
    <template v-for="bed in fakeGarden.beds" :key="bed.id">
      <PixiBed :bed="bed" @update:hover="raiseBedIndex" @click:bed="bedClicked" />
    </template>
  </Loader>
</template>

<script setup lang="ts">
import PixiBed from '@/components/graphics/PixiBed.vue'
import { ref } from 'vue'
import { Loader } from 'vue3-pixi'
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
  console.log('bed Clicked!')
}
</script>
