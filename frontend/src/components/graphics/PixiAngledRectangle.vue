<template>
  <container :position="fullConfig.position">
    <Polygon :config="polygonConfig" @drag="reportDragging" />
  </container>
</template>

<script setup lang="ts">
import Polygon from './PixiPolygon.vue'
import { Colours } from '@/types/colours'
import type { Vector, Vertex } from '@/types/garden'
import { computed } from 'vue'
import type { AngledRectangleConfig } from '@/types/shapes/angledRectangle'
import type { PolygonConfig } from '@/types/shapes/polygon'

const defaultConfig: AngledRectangleConfig = {
  position: { x: 0, y: 0 },
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
  thickness: 1,
  edgeRadius: 0,
  hoverFactor: 1.5,
  hoverTransitionTimems: 100,
  hitAreaFactor: 2.5,
  lineThickness: 2,
  lineColour: Colours.black,
  lineAlpha: 1,
  fillColour: Colours.black,
  fillAlpha: 0.8
}

const props = defineProps<{
  config: Partial<AngledRectangleConfig>
}>()

const emit = defineEmits<{
  (e: 'drag', dragLoc: Vector): void
}>()

const fullConfig = computed((): AngledRectangleConfig => {
  return { ...defaultConfig, ...props.config }
})

const polygonConfig = computed((): Partial<PolygonConfig> => {
  // Polygon is on same location as angled rectangle.
  return {
    ...fullConfig.value,
    position: { x: 0, y: 0 },
    dragCOM: { x: 0, y: 0 },
    vertices: buildPolygonEdge()
  }
})

const buildPolygonEdge = (): Vertex[] => {
  const start = fullConfig.value.start
  const end = fullConfig.value.end
  const thickness = fullConfig.value.thickness
  const radius = fullConfig.value.edgeRadius

  // Generate vertices for equivalent polygon
  // Step 1: Calculate the length of the line
  const length = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2))

  // Step 2: Calculate the unit vector u
  const u = {
    x: (end.x - start.x) / length,
    y: (end.y - start.y) / length
  }

  // Step 3: Calculate the perpendicular vector v
  const v = {
    x: -u.y,
    y: u.x
  }

  // Step 4: Calculate rectangle vertices
  const halfThickness = thickness / 2
  const rectangle: Vertex[] = [
    {
      x: start.x - halfThickness * v.x,
      y: start.y - halfThickness * v.y,
      radius
    },
    {
      x: start.x + halfThickness * v.x,
      y: start.y + halfThickness * v.y,
      radius
    },
    {
      x: end.x + halfThickness * v.x,
      y: end.y + halfThickness * v.y,
      radius
    },
    {
      x: end.x - halfThickness * v.x,
      y: end.y - halfThickness * v.y,
      radius
    }
  ]
  return rectangle
}

const reportDragging = (dragLoc: Vector) => {
  emit('drag', dragLoc)
}
</script>
