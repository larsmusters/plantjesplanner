<template>
  <button class="border border-2 border-black m-1" @click="changeMode(ClickMode.add)">
    Add Mode
  </button>
  <button class="border border-2 border-black m-1" @click="changeMode(ClickMode.select)">
    Select Mode
  </button>
  <button class="border border-2 border-black m-1" @click="changeMode(ClickMode.edit)">
    edit Mode
  </button>
  <button class="border border-2 border-black m-1" @click="randomiseNewFlower">
    Randomise new flower
  </button>
</template>

<script setup lang="ts">
import { useGardenStore } from '@/stores'
import { ClickMode } from '@/types'

const gardenStore = useGardenStore()

const changeMode = (mode: ClickMode) => {
  gardenStore.clickMode = mode
}

const randomiseNewFlower = () => {
  const items = ['pink', 'madelief', 'brown', 'orange']

  gardenStore.newBed.plant = items[Math.floor(Math.random() * items.length)]
}
</script>
