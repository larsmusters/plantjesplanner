<template>
  <div class="shape-selector">
    <h2 class="p-2">Available shapes</h2>
    <div class="library-grid">
      <button
        v-for="(bed, index) in bedLibrary"
        :key="index"
        class="library-option"
        @click="optionClicked(bed)"
      >
        {{ bed.name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGardenStore } from '@/stores/garden'
import { bedLibrary } from '@/config/bedLibrary'
import { ClickMode } from '@/types'
import type { Bed } from '@/types/garden'

const gardenStore = useGardenStore()

const optionClicked = (bed: Bed) => {
  gardenStore.newBed = { ...bed, plant: gardenStore.newBed.plant }
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
  grid-template-columns: repeat(2, 1fr);
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
