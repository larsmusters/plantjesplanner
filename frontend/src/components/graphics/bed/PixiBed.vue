<template>
  <container :ref="(el: Container) => (containerRef = el)" :position="bed.location">
    <Polygon :config="bedConfig" @click="bedClicked" @drag="editBed">
      <Plant :bed="bed" />
    </Polygon>
    <template v-if="appStore.isEditMode">
      <template v-for="(edgeConfig, index) in edgeConfigs" :key="index">
        <AngledRectangle @drag="(loc: Vector) => editEdge(loc, index)" :config="edgeConfig" />
      </template>
      <template v-for="(_, i) in bed.shape" :key="i">
        <Circle @drag="editPoint(i)" :config="circleConfig[i]" />
      </template>
    </template>
  </container>
</template>

<script setup lang="ts">
import Polygon from '../PixiPolygon.vue'
import Plant from '@/components/graphics/PixiPlant.vue'
import Circle from '../PixiCircle.vue'
import AngledRectangle from '../PixiAngledRectangle.vue'
import '@pixi/graphics-extras'
import { computed, ref, watch } from 'vue'
import { useElementHover } from '@vueuse/core'
import { type Container } from 'pixi.js'
import type { Bed, Vector } from '@/types/garden'
import { useGardenStore } from '@/stores/garden'
import { useViewportStore } from '@/stores/viewport'
import { useBedMover } from '@/composables/bedMover'
import { useAppStore } from '@/stores/app'
import type { CircleConfig } from '@/types/shapes/circle'
import type { AngledRectangleConfig } from '@/types/shapes/angledRectangle'
import { VectorUtil } from '@/utils/vectorUtil'
import type { PolygonConfig } from '@/types/generics/draggable'

const props = defineProps<{
  bed: Bed
  bedId?: number
}>()

const emit = defineEmits<{
  (e: 'update:hover', container: Container): void
  (e: 'click:bed', container: Container): void
}>()

const gardenStore = useGardenStore()
const appStore = useAppStore()
const VUtil = new VectorUtil()

const containerRef = ref()
const hovering = useElementHover(containerRef)
watch(hovering, () => {
  if (hovering.value) {
    emit('update:hover', containerRef.value)
  }
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

const editEdge = (dragLoc: Vector, index: number) => {
  if (props.bedId === undefined) return
  // dragLoc is in Edge-space
  const edgeConfig = edgeConfigs.value[index]
  const pointToBed = VUtil.inverse(edgeConfig.dragCOM || edgeConfig.position!)
  const bedDragLoc = VUtil.moveOrigin(pointToBed, dragLoc)

  const iNext = index + 1 == props.bed.shape.length ? 0 : index + 1
  const ids = [index, iNext]
  bedMover.moveBedVertices(bedDragLoc, props.bedId, ids)
}

const editBed = (dragLoc: Vector) => {
  if (!appStore.isEditMode) return
  if (props.bedId === undefined) return
  bedMover.moveBedVertices(dragLoc, props.bedId)
}

const bedConfig = computed((): Partial<PolygonConfig> => {
  const offset = 7.5 / gardenStore.position.scale
  const baseConfig: Partial<PolygonConfig> = {
    lineAlpha: 0.9,
    fillAlpha: 0.4,
    fillColour: props.bed.plant.color,
    lineThickness: 1 / gardenStore.position.scale,
    vertices: props.bed.shape,
    shadowEnable: true,
    shadowOffset: { x: offset, y: offset },
    hoverFactor: 1.02
  }
  return baseConfig
})

const circleConfig = computed((): Partial<CircleConfig>[] => {
  const baseConfig = {
    radius: 5 / gardenStore.position.scale,
    hitAreaRadius: 7.5 / gardenStore.position.scale
  }
  return props.bed.shape.map((point) => {
    return { ...baseConfig, position: { x: point.x, y: point.y } }
  })
})

const edgeConfigs = computed((): Partial<AngledRectangleConfig>[] => {
  const baseConfig: Partial<AngledRectangleConfig> = {
    lineThickness: 0,
    fillAlpha: 0.4,
    fillColour: props.bed.plant.color
  }
  return props.bed.shape.map((point, i) => {
    const iNext = i + 1 == props.bed.shape.length ? 0 : i + 1
    let start = point
    let end = props.bed.shape[iNext]
    const position = VUtil.getMidPoint(start, end)
    start = VUtil.sub(start, position)
    end = VUtil.sub(end, position)

    return {
      ...baseConfig,
      dragCOM: position,
      thickness: 5 / gardenStore.position.scale,
      start,
      end,
      position
    }
  })
})
</script>
