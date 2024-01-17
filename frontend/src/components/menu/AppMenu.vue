<template>
  <div class="menu-grid">
    <ShapeSelector />
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
  > :first-child {
    border-bottom: 1px solid rgb(200, 200, 200);
  }
}
</style>
