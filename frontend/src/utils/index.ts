import { useGardenStore } from '@/stores'
import type { Point, PolygonPoint } from '@/types/garden'

export const buildPolygon = (
  path: PolygonPoint[],
  s: number = 1,
  o: number = 0
): PolygonPoint[] => {
  return path.map((point) => {
    return { x: point.x * s + o, y: point.y * s + o, radius: (point.radius || 0) * s }
  })
}

export const gardenToWorld = (point: Point) => {
  const gardenStore = useGardenStore()
  return {
    x: point.x * gardenStore.position.scale + gardenStore.position.x,
    y: point.y * gardenStore.position.scale + gardenStore.position.y
  }
}

export const bedToGarden = (points: Point[], bedLocation: Point) => {
  return points.map((point) => {
    return vectorSum(bedLocation, point)
  })
}

export const gardenToBed = (points: Point[], bedLocation: Point) => {
  return points.map((point) => {
    return vectorSum(bedLocation, point, -1)
  })
}

export const worldToGarden = (point: Point) => {
  const gardenStore = useGardenStore()
  return {
    x: (point.x - gardenStore.position.x) / gardenStore.position.scale,
    y: (point.y - gardenStore.position.y) / gardenStore.position.scale
  }
}

export const vectorSum = (point1: Point, point2: Point, multiply1?: number, multiply2?: number) => {
  return {
    x: point1.x * (multiply1 || 1) + point2.x * (multiply2 || 1),
    y: point1.y * (multiply1 || 1) + point2.y * (multiply2 || 1)
  }
}

export const pointsDistance = (point1: Point, point2: Point) => {
  const xDist = point1.x - point2.x
  const yDist = point1.y - point2.y
  return Math.sqrt(xDist * xDist + yDist * yDist)
}

export const getMidpoint = (v1: Point, v2: Point) => {
  const xMid = (v1.x + v2.x) / 2
  const yMid = (v1.y + v2.y) / 2
  return { x: xMid, y: yMid }
}
