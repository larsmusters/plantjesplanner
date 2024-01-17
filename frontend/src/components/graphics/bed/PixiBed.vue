<template>
  <container :ref="(el) => (containerRef = el)" :position="bed.location">
    <graphics @render="drawDropShadow">
      <blur-filter :quality="2" :blur="4" />
    </graphics>
    <graphics
      ref="el"
      @render="drawBed"
      :hitArea="hitArea"
      @click="bedClicked"
      @pointerdown="onDragStart"
      @pointerup="onDragEnd"
      @pointerupoutside="onDragEnd"
    >
      <animated-sprite
        v-if="animation.length"
        :textures="animation"
        playing
        :animation-speed="0.04"
        :anchor="0.5"
        :scale="scaleAnimated * bed.animationScale"
      />
    </graphics>
    <template v-if="editMode">
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
import BedVertex from './BedVertex.vue'
import BedEdgeVue from './BedEdge.vue'
import { computed, ref, watch } from 'vue'
import { TransitionPresets, useElementHover, useTransition } from '@vueuse/core'
import { Graphics, Polygon, AnimatedSprite } from 'pixi.js'
import { Colours } from '@/types/colours'
import '@pixi/graphics-extras'
import type { Bed, BedEdge, Point } from '@/types/garden'
import type { Container } from 'pixi.js'
import { drawPolygon } from '@/utils/builder'
import type { PolygonStyling } from '@/types/shapes'
import { useStage } from 'vue3-pixi'
import { useGardenStore } from '@/stores'
import type { FederatedPointerEvent } from 'pixi.js'
import { gardenToRelative, worldToGarden } from '@/utils'

const props = withDefaults(
  defineProps<{
    bed: Bed
    editMode?: boolean
  }>(),
  {
    editMode: false
  }
)

const emit = defineEmits<{
  (e: 'update:hover', container: Container): void
  (e: 'click:bed', container: Container): void
  (e: 'set-to-cursor:bed-vertex', index: number): void
  (e: 'set-to-cursor:bed', dragLoc: Point): void
  (e: 'set-to-cursor:bed-vertices', dragLoc: Point, ids: number[]): void
}>()

const hitArea = computed(() => new Polygon(props.bed.shape))
const el = ref()
const hovering = useElementHover(el)

const gardenStore = useGardenStore()
const bedId = computed(() => gardenStore.garden.beds.indexOf(props.bed))

const animation = computed(() => gardenStore.spritesheet?.animations[props.bed.plant] || [])

const scale = computed(() => (hovering.value ? props.bed.heightOnHover : 1))
const scaleAnimated = useTransition(scale, {
  duration: 100,
  transition: TransitionPresets.easeOutQuad
})

const containerRef = ref()
watch(hovering, () => {
  if (hovering.value) {
    emit('update:hover', containerRef.value)
  }
})

const drawBed = (g: Graphics) => {
  const styling: Partial<PolygonStyling> = {
    shape: props.bed.shape,
    scale: scaleAnimated.value,
    lineThickness: 1 / gardenStore.position.scale,
    lineColour: props.bed.color,
    fillColour: props.bed.color,
    lineAlpha: 0.9,
    fillAlpha: 0.4
  }
  drawPolygon(g, styling)
}

const drawDropShadow = (g: Graphics) => {
  const styling: Partial<PolygonStyling> = {
    shape: props.bed.shape,
    scale: scaleAnimated.value,
    fillAlpha: (scaleAnimated.value - 1) * 2,
    fillColour: Colours.black,
    offset: 7.5 / gardenStore.position.scale
  }
  drawPolygon(g, styling)
}

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

const bedClicked = () => {
  emit('click:bed', containerRef.value)
}

const editPoint = (index: number) => {
  emit('set-to-cursor:bed-vertex', index)
}

const editEdge = (dragLoc: Point, ids: number[]) => {
  emit('set-to-cursor:bed-vertices', dragLoc, ids)
}

const stage = useStage()
const dragLoc = ref<Point>()
const onDragStart = (e: FederatedPointerEvent) => {
  const gardenLoc = worldToGarden(e.global)
  dragLoc.value = gardenToRelative(props.bed.location, gardenLoc)
  if (props.editMode) {
    stage.value!.addEventListener('pointermove', onDrag)
  }
}

const onDragEnd = () => {
  stage.value!.removeEventListener('pointermove', onDrag)
}

const onDrag = () => {
  emit('set-to-cursor:bed', dragLoc.value!)
}
</script>
