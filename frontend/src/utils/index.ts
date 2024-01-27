import { useGardenStore } from '@/stores/garden'
import type { Vector, Vertex } from '@/types/garden'

export const buildPolygon = (path: Vertex[], s: number = 1, o: number = 0): Vertex[] => {
  return path.map((point) => {
    return { x: point.x * s + o, y: point.y * s + o, radius: (point.radius || 0) * s }
  })
}

export const gardenToWorld = (point: Vector) => {
  const gardenStore = useGardenStore()
  return {
    x: point.x * gardenStore.position.scale + gardenStore.position.x,
    y: point.y * gardenStore.position.scale + gardenStore.position.y
  }
}

export const worldToGarden = (point: Vector) => {
  const gardenStore = useGardenStore()
  return {
    x: (point.x - gardenStore.position.x) / gardenStore.position.scale,
    y: (point.y - gardenStore.position.y) / gardenStore.position.scale
  }
}
