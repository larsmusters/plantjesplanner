<template>
  <button @click="toAddMode">Add Mode</button>
  <button @click="toSelectMode">Select Mode</button>
</template>

<script setup lang="ts">
import { useGardenStore } from '@/stores'
import { ClickMode } from '@/types'

const gardenStore = useGardenStore()

const toAddMode = () => {
  gardenStore.clickMode = ClickMode.add
}

const toSelectMode = () => {
  gardenStore.clickMode = ClickMode.select
}
</script>
