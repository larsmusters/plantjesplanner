<template>
  <div class="menu-grid">
    <ShapeSelector class="shape-selector" />
    <PlantSelector />
  </div>
</template>

<script setup lang="ts">
import ShapeSelector from './ShapeSelector.vue'
import PlantSelector from './PlantSelector.vue'
</script>

<style scoped lang="scss">
.menu-grid {
  display: grid;
  height: 100%;
}

.shape-selector {
  border-bottom: 1px solid rgb(200, 200, 200);
}
</style>
