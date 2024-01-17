<template>
  <div class="p-4">
    <template v-if="viewportStore.plantInfo">
      <h2>{{ viewportStore.plantInfo.name }}</h2>
      <p>{{ viewportStore.plantInfo.nameLatin }}</p>
    </template>
    <template v-else>
      <p>Select a plant to show the information</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useViewportStore } from '@/stores/viewport'

const viewportStore = useViewportStore()
</script>
