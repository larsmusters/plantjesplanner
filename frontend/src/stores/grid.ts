import { defineStore } from 'pinia'
import { computed, ref, type ComputedRef } from 'vue'
import { useGardenStore } from '.'
import type { PolygonPoint } from '@/types/garden'
import { pointsDistance } from '@/utils'

export const useGridStore = defineStore('grid', () => {
  const nLines = ref({ columns: 21, rows: 21 })

  const columns = computed(() => {
    const gardenStore = useGardenStore()

    const array = new Array(nLines.value.columns).fill(1)
    const resolution = gardenStore.bounds.width / (nLines.value.columns - 1)
    return array.map((_, i) => i * resolution + gardenStore.bounds.x)
  })

  const rows = computed(() => {
    const gardenStore = useGardenStore()

    const array = new Array(nLines.value.rows).fill(1)
    const resolution = gardenStore.bounds.height / (nLines.value.rows - 1)
    return array.map((_, i) => i * resolution + gardenStore.bounds.y)
  })

  const vertices: ComputedRef<PolygonPoint[]> = computed(() => {
    // current grid is very simple: all points on intersections between rows and columns
    const v: PolygonPoint[] = []

    columns.value.forEach((x) => {
      rows.value.forEach((y) => {
        v.push({ x, y })
      })
    })
    return v
  })

  const findClosestVertex = (point: { x: number; y: number }): { gridId: number; dist: number } => {
    // 'point' has to be in garden space.
    return vertices.value.reduce(
      (closestPoint, v, i) => {
        const dist = pointsDistance(point, v)
        return dist < closestPoint.dist ? { gridId: i, dist: dist } : closestPoint
      },
      { gridId: -1, dist: 1000 }
    )
  }

  const getSnappingVertex = (
    points: { x: number; y: number }[]
  ): { id: number; x: number; y: number } => {
    const data = findClosestVertices(points)
    return { ...vertices.value[data.gridId], id: data.id }
  }

  const findClosestVertices = (
    points: { x: number; y: number }[]
  ): { gridId: number; id: number; dist: number } => {
    // 'points' has to be in garden space.
    return points.reduce(
      (closestMatch, v, i) => {
        const closestPoint = findClosestVertex(v)
        return closestPoint.dist < closestMatch.dist ? { ...closestPoint, id: i } : closestMatch
      },
      { id: -1, gridId: -1, dist: 1000 }
    )
  }

  return {
    columns,
    rows,
    vertices,
    findClosestVertex,
    findClosestVertices,
    getSnappingVertex
  }
})
