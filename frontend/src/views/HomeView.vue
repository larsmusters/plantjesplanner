<template>
  <div>
    <button @click="enabled = !enabled">Toggle</button>
    <span> Sprite visible: {{ enabled }} </span>
  </div>
  <Application background="white" :width="300" :height="300">
    <CursorSprite v-if="enabled" :x="300 / 2" :y="300 / 2" />
  </Application>
</template>

<script setup lang="ts">
import { Application } from 'vue3-pixi'
import { ref } from 'vue'

import CursorSprite from '../components/CursorSprite.vue'

const enabled = ref(true)
</script>
