<template>
  <ActionButtons />
</template>

<script setup lang="ts">
import ActionButtons from '@/components/menu/ActionButtons.vue'
import { useGardenStore } from '@/stores'

const gardenStore = useGardenStore()
</script>
