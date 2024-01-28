<template>
  <div class="px-2 menu-tabs">
    <button
      class="py-1 px-6 mx-1 border border-t-0 border-x-0"
      :class="{ 'bg-slate-200': each == viewportStore.activeTab }"
      v-for="each in tabs"
      :key="each"
      @click="switchTab(each)"
    >
      {{ each }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useViewportStore } from '@/stores'
import { Tab } from '@/types'

const tabs = [Tab.add, Tab.info]

const viewportStore = useViewportStore()

const switchTab = (tab: Tab) => {
  viewportStore.activeTab = tab
}
</script>

<style scoped lang="scss">
.menu-tabs {
  height: 2em;
}
</style>
