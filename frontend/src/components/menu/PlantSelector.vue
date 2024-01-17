<template>
  <div class="shape-selector">
    <h2 class="p-2">Plants</h2>
    <div class="library-grid">
      <button
        v-for="(plant, index) in plantLibrary"
        :key="index"
        class="library-option"
        @click="optionClicked(plant)"
      >
        {{ plant.name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGardenStore } from '@/stores/garden'
import { ClickMode } from '@/types'
import type { Plant } from '@/types/garden'
import { plantLibrary } from '@/config/plantLibrary'

const gardenStore = useGardenStore()

const optionClicked = (plant: Plant) => {
  gardenStore.newBed.plant = plant
  gardenStore.clickMode = ClickMode.add
}
</script>

<style scoped lang="scss">
.shape-selector {
  display: flex;
  flex-direction: column;
}

.library-grid {
  margin-bottom: 0.5em;
  border: 1px solid rgb(231, 231, 231);
  border-left: none;
  border-right: none;
  height: 100%;
  overflow-y: scroll;

  display: grid;
  gap: 0.5em;
  padding: 0.5em;
  grid-template-columns: repeat(3, 1fr);
}

.library-option {
  border: 1px solid rgb(50, 178, 50);
  background-color: rgb(245, 255, 245);
  height: 5em;

  &:hover {
    box-shadow: 0 0 5px rgb(206, 206, 206);
  }
}
</style>
