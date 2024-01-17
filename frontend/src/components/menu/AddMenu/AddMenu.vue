<template>
  <div class="add-menu-grid">
    <ShapeSelector />
    <PlantSelector />
  </div>
</template>

<script setup lang="ts">
import ShapeSelector from './ShapeSelector.vue'
import PlantSelector from './PlantSelector.vue'
</script>

<style scoped lang="scss">
.add-menu-grid {
  display: grid;
  grid-template-rows: 1fr 1fr;
  height: calc(100% - 2em);
  > :first-child {
    border-bottom: 1px solid rgb(200, 200, 200);
  }
}
</style>
