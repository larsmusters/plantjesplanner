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
  <button class="border border-2 border-black m-1" @click="randomiseNewBed">
    Randomise new bed
  </button>
</template>

<script setup lang="ts">
import { bedLibrary } from '@/config/bedLibrary'
import { plantLibrary } from '@/config/plantLibrary'
import { useGardenStore } from '@/stores'
import { ClickMode } from '@/types'

const gardenStore = useGardenStore()

const changeMode = (mode: ClickMode) => {
  gardenStore.clickMode = mode
}

const randomiseNewBed = () => {
  gardenStore.newBed = bedLibrary[Math.floor(Math.random() * bedLibrary.length)]
  gardenStore.newBed.plant = plantLibrary[Math.floor(Math.random() * plantLibrary.length)]
  gardenStore.clickMode = ClickMode.add
}
</script>
