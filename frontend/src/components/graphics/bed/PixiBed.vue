<template>
  <container :ref="(el: Container) => (containerRef = el)" :position="bed.location">
    <BedShell
      :bed="bed"
      :scaleTarget="scale"
      @click="bedClicked"
      @drag="(dragLoc: Vector) => editBed(dragLoc)"
    >
      <Plant :bed="bed" />
    </BedShell>
    <template v-if="appStore.isEditMode">
      <BedEdgeVue
        v-for="(edge, index) in edges"
        :key="index"
        :start="edge.p0"
        :end="edge.p1"
        :bed-id="bedId"
        @set-to-cursor:vertices="editEdge"
      />
      <BedVertex
        v-for="(point, index) in props.bed.shape"
        :key="index"
        :point="point"
        @set-to-cursor:point="editPoint(index)"
      />
    </template>
  </container>
</template>

<script setup lang="ts">
import Plant from '@/components/graphics/PixiPlant.vue'
import BedVertex from './BedVertex.vue'
import BedEdgeVue from './BedEdge.vue'
import '@pixi/graphics-extras'
import { computed, ref, watch } from 'vue'
import { useElementHover } from '@vueuse/core'
import { type Container } from 'pixi.js'
import type { Bed, BedEdge, Vector } from '@/types/garden'
import { useGardenStore } from '@/stores/garden'
import { useViewportStore } from '@/stores/viewport'
import BedShell from './BedShell.vue'
import { useBedMover } from '@/composables/bedMover'
import { useAppStore } from '@/stores/app'

const props = defineProps<{
  bed: Bed
  bedId?: number
}>()

const emit = defineEmits<{
  (e: 'update:hover', container: Container): void
  (e: 'click:bed', container: Container): void
}>()

const el = ref()

const gardenStore = useGardenStore()
const appStore = useAppStore()
const bedId = computed(() => gardenStore.garden.beds.indexOf(props.bed))

const hovering = useElementHover(el)
const scale = computed(() => (hovering.value ? props.bed.heightOnHover : 1))

const containerRef = ref()
watch(hovering, () => {
  if (hovering.value) {
    emit('update:hover', containerRef.value)
  }
})

const edges = computed((): BedEdge[] => {
  const edges: BedEdge[] = []
  props.bed.shape.forEach((point, i) => {
    const iPrev = i - 1 < 0 ? props.bed.shape.length - 1 : i - 1
    const p0 = { id: iPrev, ...props.bed.shape[iPrev] }
    const p1 = { id: i, ...point }
    edges.push({ p0, p1 })
  })
  return edges
})

const viewportStore = useViewportStore()
const bedClicked = () => {
  emit('click:bed', containerRef.value)
  viewportStore.plantInfo = props.bed.plant
  viewportStore.showInfo()
}

const bedMover = useBedMover()

const editPoint = (index: number) => {
  if (props.bedId === undefined) return
  bedMover.moveBedVertex(index, props.bedId)
}

const editEdge = (dragLoc: Vector, ids: number[]) => {
  if (props.bedId === undefined) return
  bedMover.moveBedVertices(dragLoc, props.bedId, ids)
}

const editBed = (dragLoc: Vector) => {
  if (props.bedId === undefined) return
  bedMover.moveBedVertices(dragLoc, props.bedId)
}
</script>
