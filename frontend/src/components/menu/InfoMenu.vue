<template>
  <div class="p-4">
    <template v-if="viewportStore.plantInfo">
      <h2>{{ viewportStore.plantInfo.name }}</h2>
      <p>{{ viewportStore.plantInfo.nameLatin }}</p>
      <p>{{ viewportStore.plantInfo.info }}</p>
    </template>
    <template v-else>
      <p>Select a plant to show the information</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useViewportStore } from '@/stores'

const viewportStore = useViewportStore()
</script>
