<template>
  <div class="app-container">
    <div class="header">Plantjesplanner</div>
    <div class="quick-buttons"><ActionButtons /></div>
    <div class="menu">
      <AppMenu />
    </div>
    <div ref="graph" class="graph">
      <PixiApp :width="graphWidth" :height="graphHeight" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ActionButtons from '@/components/menu/ActionButtons.vue'
import AppMenu from '@/components/menu/AppMenu.vue'
import PixiApp from '@/components/structure/PixiApp.vue'
import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'

const extraMargin = 10

const window = useWindowSize()
const windowWidth = computed(() => window.width.value)
const windowHeight = computed(() => window.height.value)

const appWidth = computed(() => (windowWidth.value - extraMargin * 2).toString() + 'px')
const appHeight = computed(() => (windowHeight.value - extraMargin * 2).toString() + 'px')

const headerHeight = 50
const quickButonsHeight = 40
const menuWidth = 350

const graphWidth = computed(() => windowWidth.value - menuWidth - extraMargin * 2)
const graphHeight = computed(
  () => windowHeight.value - headerHeight - quickButonsHeight - extraMargin * 2
)

// For CSS
const headerHeightCSS = headerHeight.toString() + 'px'
const menuWidthCSS = menuWidth.toString() + 'px'
const quickButonsHeightCSS = quickButonsHeight.toString() + 'px'
</script>

<style lang="scss">
.app-container {
  background-color: white;
  width: v-bind(appWidth);
  height: v-bind(appHeight);
  overflow-y: hidden;
  overflow-x: hidden;

  display: grid;
  grid-template-areas:
    'header header '
    'menu quick-buttons'
    'menu graph ';
  grid-template-columns: v-bind(menuWidthCSS) 50fr;
  grid-template-rows: v-bind(headerHeightCSS) v-bind(quickButonsHeightCSS) 25fr;
}

.header {
  grid-area: header;
  background-color: white;
  border-bottom: 1px solid rgb(200, 200, 200);
  width: 100%;
  padding-top: 0.25em;
  text-align: center;
  font-size: 1.5em;
}

.menu {
  grid-area: menu;
  border-right: 1px solid rgb(200, 200, 200);
}

.quick-buttons {
  grid-area: quick-buttons;
  border-bottom: 1px solid rgb(200, 200, 200);
  padding: 0.25em;
}

.graph {
  grid-area: graph;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
