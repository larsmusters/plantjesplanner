<template>
  <div class="app-container">
    <div class="header">Plantjesplanner</div>
    <div class="menu">Menu</div>
    <div ref="graph" class="graph">
      <PixiApp :width="graphWidth" :height="graphHeight" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PixiApp from '@/components/structure/PixiApp.vue'
import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'

const window = useWindowSize()
const windowWidth = computed(() => window.width.value)
const windowHeight = computed(() => window.height.value)

const appWidth = computed(() => (windowWidth.value - 20).toString() + 'px')
const appHeight = computed(() => (windowHeight.value - 20).toString() + 'px')

const headerHeight = 60
const menuWidth = 150

const graphWidth = computed(() => windowWidth.value - menuWidth)
const graphHeight = computed(() => windowHeight.value - headerHeight)

// For CSS
const headerHeightCSS = headerHeight.toString() + 'px'
const menuWidthCSS = menuWidth.toString() + 'px'
</script>

<style scoped lang="scss">
.app-container {
  background-color: white;
  width: v-bind(appWidth);
  height: v-bind(appHeight);
  overflow-y: hidden;
  overflow-x: hidden;

  display: grid;
  grid-template-areas:
    'header header '
    'menu graph ';
  grid-template-columns: v-bind(menuWidthCSS) 50fr;
  grid-template-rows: v-bind(headerHeightCSS) 50fr;
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
