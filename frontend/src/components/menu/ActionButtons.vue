<template>
  <button class="border border-2 border-black m-1" @click="appStore.setClickMode('add')">
    Add Mode
  </button>
  <button class="border border-2 border-black m-1" @click="appStore.setClickMode('select')">
    Select Mode
  </button>
  <button class="border border-2 border-black m-1" @click="appStore.setClickMode('edit')">
    edit Mode
  </button>
  <button class="border border-2 border-black m-1" @click="randomiseNewPlant">
    Randomise new plant
  </button>
  <input
    ref="month"
    type="range"
    min="0"
    max="11"
    :value="viewportStore.month"
    class="slider"
    id="month-indicator"
    @input="changeMonth"
  />
</template>

<script setup lang="ts">
import { plantLibrary } from '@/config/plantLibrary'
import { useAppStore, useGardenStore, useViewportStore } from '@/stores'
import { ref } from 'vue'

const gardenStore = useGardenStore()
const appStore = useAppStore()
const viewportStore = useViewportStore()

const randomiseNewPlant = () => {
  gardenStore.newPlant = plantLibrary[Math.floor(Math.random() * plantLibrary.length)]
  appStore.setClickMode('add')
}

const month = ref<HTMLInputElement>()
const changeMonth = (e: any) => {
  viewportStore.month = +e.target.value
}
</script>
