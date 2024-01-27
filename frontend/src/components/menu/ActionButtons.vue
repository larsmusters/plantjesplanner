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
  <button class="border border-2 border-black m-1" @click="randomiseNewBed">
    Randomise new bed
  </button>
</template>

<script setup lang="ts">
import { bedLibrary } from '@/config/bedLibrary'
import { plantLibrary } from '@/config/plantLibrary'
import { useAppStore } from '@/stores/app'
import { useGardenStore } from '@/stores/garden'

const gardenStore = useGardenStore()
const appStore = useAppStore()

const randomiseNewBed = () => {
  gardenStore.newBed = bedLibrary[Math.floor(Math.random() * bedLibrary.length)]
  gardenStore.newBed.plant = plantLibrary[Math.floor(Math.random() * plantLibrary.length)]
  appStore.setClickMode('add')
}
</script>
