<template>
  <div class="app-container">
    <div class="header">Plantjesplanner</div>
    <div class="menu">Menu</div>
    <div ref="graph" class="graph">
      <PixiApp :width="window.width.value * 0.6" :height="window.height.value * 0.75" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PixiApp from '@/components/graphics/PixiApp.vue'
import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'

const window = useWindowSize()
const width = computed(() => (window.width.value - 20).toString() + 'px')
const height = computed(() => (window.height.value - 20).toString() + 'px')
</script>

<style scoped lang="scss">
.app-container {
  background-color: white;
  width: v-bind(width);
  height: v-bind(height);
  overflow-y: hidden;
  overflow-x: hidden;

  display: grid;
  grid-template-areas:
    'header header '
    'menu graph ';
  grid-template-columns: 15em 100fr;
  grid-template-rows: 4em 100fr;
}

.header {
  grid-area: header;
  background-color: white;
  border-bottom: 1px solid rgb(200, 200, 200);
  width: 100%;
  padding-top: 0.5em;
  text-align: center;
  font-size: 1.5em;
}

.menu {
  grid-area: menu;
  border-right: 1px solid rgb(200, 200, 200);
  padding: 1em;
}

.graph {
  grid-area: graph;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
