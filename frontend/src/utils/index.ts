import type { PolygonPoint } from '@/types/garden'

export const buildPolygon = (
  path: PolygonPoint[],
  s: number = 1,
  o: number = 0
): PolygonPoint[] => {
  return path.map((point) => {
    return { x: point.x * s + o, y: point.y * s + o, radius: (point.radius || 0) * s }
  })
}
