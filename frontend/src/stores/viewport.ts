import { Tab } from '@/types'
import type { Plant } from '@/types/garden'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useViewportStore = defineStore('viewport', () => {
  const activeTab = ref<Tab>(Tab.add)
  const plantInfo = ref<Plant>()

  const showInfo = () => (activeTab.value = Tab.info)
  const showAdd = () => (activeTab.value = Tab.add)

  return { activeTab, showInfo, showAdd, plantInfo }
})
