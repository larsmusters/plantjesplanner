<template>
  <div>
    <button @click="enabled = !enabled">Toggle</button>
    <span> Sprite visible: {{ enabled }} </span>
  </div>
  <Application ref="app" background="white" :width="600" :height="200">
    <CursorSprite v-if="enabled" :x="100" :y="200 / 2" />
    <CursorSprite v-if="enabled" :x="190" :y="200 / 2" />
    <CursorSprite v-if="enabled" :x="270" :y="200 / 2" />
    <CursorSprite v-if="enabled" :x="360" :y="200 / 2" />
    <CursorSprite v-if="enabled" :x="450" :y="200 / 2" />
    <CursorSprite v-if="enabled" :x="540" :y="200 / 2" />
  </Application>
</template>

<script setup lang="ts">
import { Application } from 'vue3-pixi'
import { ref } from 'vue'

import CursorSprite from '../components/CursorSprite.vue'

const enabled = ref(true)

const app = ref()
</script>
