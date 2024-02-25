import { Tab } from '@/types'
import type { Plant } from '@/types/garden'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useViewportStore = defineStore('viewport', () => {
  const activeTab = ref<Tab>(Tab.add)
  const plantInfo = ref<Plant>()
  const month = ref<number>(0)

  const showInfo = () => (activeTab.value = Tab.info)
  const showAdd = () => (activeTab.value = Tab.add)

  const monthReadable = computed(() => {
    if (month.value === 0) return 'Januari'
    if (month.value === 1) return 'Februari'
    if (month.value === 2) return 'Maart'
    if (month.value === 3) return 'April'
    if (month.value === 4) return 'Mei'
    if (month.value === 5) return 'Juni'
    if (month.value === 6) return 'Juli'
    if (month.value === 7) return 'Augustus'
    if (month.value === 8) return 'September'
    if (month.value === 9) return 'Oktober'
    if (month.value === 10) return 'November'
    return 'December'
  })
  return { activeTab, showInfo, showAdd, plantInfo, month, monthReadable }
})
