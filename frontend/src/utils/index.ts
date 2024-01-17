import { useGardenStore } from '@/stores/garden'
import type { Bed, Point, PolygonPoint } from '@/types/garden'

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

export const worldToGarden = (point: Point) => {
  const gardenStore = useGardenStore()
  return {
    x: (point.x - gardenStore.position.x) / gardenStore.position.scale,
    y: (point.y - gardenStore.position.y) / gardenStore.position.scale
  }
}

export const bedToGardenArray = (bed: Bed) => {
  return relativeToGardenArray(bed.location, bed.shape)
}

export const relativeToGarden = (relativeTo: Point, point: Point): Point => {
  return vectorSum(relativeTo, point)
}

export const relativeToGardenArray = (relativeTo: Point, points: Point[]): Point[] => {
  return points.map((point) => relativeToGarden(relativeTo, point))
}

export const gardenToRelative = (relativeTo: Point, point: Point): Point => {
  return vectorSum(relativeTo, point, -1)
}

export const gardenToRelativeArray = (relativeTo: Point, points: Point[]): Point[] => {
  return points.map((point) => gardenToRelative(relativeTo, point))
}

export const moveOriginArray = (points: Point[], newOrigin: Point): Point[] => {
  return points.map((point) => vectorSum(newOrigin, point, -1))
}

export const vectorSum = (
  point1: Point,
  point2: Point,
  multiply1?: number,
  multiply2?: number
): Point => {
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
