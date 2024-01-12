<template>
  <button @click="changeMode(ClickMode.add)">Add Mode</button>
  <button @click="changeMode(ClickMode.select)">Select Mode</button>
  <button @click="changeMode(ClickMode.edit)">edit Mode</button>
</template>

<script setup lang="ts">
import { useGardenStore } from '@/stores'
import { ClickMode } from '@/types'

const gardenStore = useGardenStore()

const changeMode = (mode: ClickMode) => {
  gardenStore.clickMode = mode
}
</script>
