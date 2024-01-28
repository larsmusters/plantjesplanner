<template>
  <MenuTabs />
  <AddMenu v-if="viewportStore.activeTab === Tab.add" />
  <InfoMenu v-else-if="viewportStore.activeTab === Tab.info" />
</template>

<script setup lang="ts">
import MenuTabs from './MenuTabs.vue'
import { Tab } from '@/types'
import AddMenu from './AddMenu/AddMenu.vue'
import InfoMenu from './InfoMenu.vue'
import { useViewportStore } from '@/stores'

const viewportStore = useViewportStore()
</script>
