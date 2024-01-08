<template>
  <!-- To-do's:
    Fun things:
    - Start building the yard construction tool,
    - Display information on the component that is being hovered,
    - Collect more information on plants.
    -->
  <Application ref="app" background="white" :width="620" :height="600">
    <Loader
      :resources="{
        spritesheet: 'flowers.json'
      }"
      @resolved="onResolved($event.spritesheet)"
    >
      <PixiBed
        v-for="(bed, index) in fakeGarden.beds"
        :key="index"
        :x="bed.location.x"
        :y="bed.location.y"
        :bed="bed"
        @update:hover="raiseBedIndex"
      />
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

const app = ref<ApplicationInst>()

const onResolved = (sheet: Spritesheet) => {
  fakeGarden.beds.forEach((bed) => (bed.animation = sheet.animations[bed.plant]))
}

const raiseBedIndex = (container: Container) => {
  app.value?.app.stage.sortChildren()

  const highestIndex = (app.value?.app.stage.children.length || 1) - 1
  app.value?.app.stage.setChildIndex(container, highestIndex)
}
</script>
