import type { Point } from '@/types/garden'
import { pointsDistance, vectorSum } from '.'

/**
 * Places the toMove objects (assumed as points rigid relative to each other) on the grid.
 *
 * @param toMove The vertices that needs to be moved.
 * @param grid The vertices available for snapping.
 * @param limit If the closest distance between any vertex on the grid and the toMove object is larger than this limit,
 * it does not snap. Leaving the limit empty will effectively set it to infinity: it will always snap.
 *
 * @return returns the points in the new position, snapped if below the limit or if no limit is given.
 */
export const movePointsToGrid = (toMove: Point[], grid: Point[], limit?: number): Point[] => {
  const snapMove = getMoveToGrid(toMove, grid, limit)
  return toMove.map((point) => vectorSum(point, snapMove))
}

export const getMoveToGrid = (toMove: Point[], grid: Point[], limit?: number): Point => {
  // Gets snap location.
  const pair = findClosestPair(toMove, grid)
  if (limit && pair.dist > limit) return { x: 0, y: 0 }

  return vectorSum(toMove[pair.pointId], grid[pair.vertexId], -1)
}

/**
 * Moves a point to the grid, if the distance is smaller than the limit
 */
export const movePointToGrid = (point: Point, grid: Point[], limit?: number) => {
  const pair = findClosestVertex(point, grid)
  if (limit && pair.dist > limit) return point
  return grid[pair.id]
}

/**
 * Finds the closest vertex to 'point'
 */
export const findClosestVertex = (
  point: Point,
  vertices: Point[]
): { id: number; dist: number } => {
  return vertices.reduce(
    (closestVertex, v, id) => {
      const dist = pointsDistance(point, v)
      return dist < closestVertex.dist ? { id, dist } : closestVertex
    },
    { id: -1, dist: 1000 }
  )
}

/**
 * Finds the closest pair: 1 from 'points' and 1 from 'vertices'
 */
export const findClosestPair = (
  points: Point[],
  vertices: Point[]
): { vertexId: number; pointId: number; dist: number } => {
  return points.reduce(
    (closestPair, v, pointId) => {
      const pair = findClosestVertex(v, vertices)
      return pair.dist < closestPair.dist
        ? { vertexId: pair.id, dist: pair.dist, pointId }
        : closestPair
    },
    { pointId: -1, vertexId: -1, dist: 1000 }
  )
}
