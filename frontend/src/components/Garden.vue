<template>
  <!-- To-do's:
    Lame things: 
    - Figure out zIndex for n beds: use Layer package?
  
    Fun things:
    - Build structure to define several different (flower)-beds/regions,
    - Start building the yard construction tool,
    - Display information on the component that is being hovered,
    - Collect more information on plants.
    -->
  <Application ref="app" background="white" :width="620" :height="600">
    <Loader
      :resources="{
        spritesheet: 'madelief.json'
      }"
      @resolved="onResolved($event.spritesheet)"
    >
      <Bed
        v-for="column in 6"
        :x="80 + (column - 1) * 90"
        :y="75"
        :animation="animation"
        @update:hover="raiseBlob"
      />
    </Loader>
  </Application>
</template>

<script setup lang="ts">
import Bed from '../components/Bed.vue'
import { ref } from 'vue'
import { Application, Loader } from 'vue3-pixi'
import type { ApplicationInst } from 'vue3-pixi'
import { Spritesheet, Container, Texture } from 'pixi.js'

const spritesheet = ref<Spritesheet>()
const animation = ref<Texture[]>()

const onResolved = (sheet: Spritesheet) => {
  spritesheet.value = sheet
  animation.value = sheet.animations['flower']
}

const app = ref<ApplicationInst>()

const raiseBlob = (container: Container) => {
  app.value?.app.stage.sortChildren()

  const highestIndex = (app.value?.app.stage.children.length || 1) - 1
  app.value?.app.stage.setChildIndex(container, highestIndex)
}
</script>
