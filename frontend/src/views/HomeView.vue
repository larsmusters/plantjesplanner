<template>
  <div>
    <button @click="enabled = !enabled">Toggle</button>
    <span> Sprite visible: {{ enabled }} </span>
  </div>
  <Application ref="app" background="white" :width="620" :height="600">
    <Loader
      ref="loader"
      :resources="{
        spritesheet: 'madelief.json'
      }"
      @resolved="onResolved($event.spritesheet)"
    >
      <template v-if="enabled">
        <template v-for="row in 7" :key="row">
          <CursorSprite
            v-for="column in 6"
            :x="80 + (column - 1) * 90"
            :y="75 + (row - 1) * 75"
            :resource="resource"
            @update:hover="raiseBlob"
          />
        </template>
      </template>
    </Loader>
  </Application>
</template>

<script setup lang="ts">
import { Application } from 'vue3-pixi'
import type { ApplicationInst } from 'vue3-pixi'
import { ref } from 'vue'
import { Loader } from 'vue3-pixi'

import { Spritesheet } from 'pixi.js'
import CursorSprite from '../components/CursorSprite.vue'
import type { Resource } from '@/types'
import type { Container } from 'pixi.js'

const resource = ref<Resource>({})

const onResolved = (sheet: Spritesheet) => {
  resource.value.spritesheet = sheet
  resource.value.animation = sheet.animations['flower']
}

const app = ref<ApplicationInst>()

const raiseBlob = (container: Container) => {
  app.value?.app.stage.sortChildren()
  app.value?.app.stage.setChildIndex(container, 70)
}

const enabled = ref(true)

const loader = ref()
</script>
