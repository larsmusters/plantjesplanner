import { VectorMath } from './vectorMath'
import type { Vector } from '@/types/garden'

// More expanded version, with more readable functions
export class VectorUtil extends VectorMath {
  moveOrigin = (newOrigin: Vector, point: Vector): Vector => {
    return this.sub(point, newOrigin)
  }

  moveOrigins = (newOrigin: Vector, points: Vector[]): Vector[] => {
    return points.map((point) => this.moveOrigin(newOrigin, point))
  }

  /**
   * Finds the closest vector in candidates to 'point'
   */
  findClosest = (point: Vector, candidates: Vector[]): { id: number; dist: number } => {
    return candidates.reduce(
      (closestVector, v, id) => {
        const dist = this.distance(point, v)
        return dist < closestVector.dist ? { id, dist } : closestVector
      },
      { id: -1, dist: 1e9 }
    )
  }

  /**
   * Finds the closest pair: 1 from 'points' and 1 from 'candidates'
   */
  findClosestPair = (
    points: Vector[],
    candidates: Vector[]
  ): { candidateId: number; pointId: number; dist: number } => {
    return points.reduce(
      (closestPair, v, pointId) => {
        const pair = this.findClosest(v, candidates)
        return pair.dist < closestPair.dist
          ? { candidateId: pair.id, dist: pair.dist, pointId }
          : closestPair
      },
      { pointId: -1, candidateId: -1, dist: 1e9 }
    )
  }

  /**
   * Moves a point to the grid, if the distance is smaller than the limit
   */
  moveToGrid = (point: Vector, grid: Vector[], limit?: number) => {
    const pair = this.findClosest(point, grid)
    if (limit && pair.dist > limit) return point
    return grid[pair.id]
  }

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
  moveManyToGrid = (toMove: Vector[], grid: Vector[], limit?: number): Vector[] => {
    const snapMove = this.getMoveToGrid(toMove, grid, limit)
    return toMove.map((point) => this.sum(point, snapMove))
  }

  getMoveToGrid = (toMove: Vector[], grid: Vector[], limit?: number): Vector => {
    // Gets snap location.
    const pair = this.findClosestPair(toMove, grid)
    if (limit && pair.dist > limit) return { x: 0, y: 0 }

    return this.sub(grid[pair.candidateId], toMove[pair.pointId])
  }

  getMidPoint = (point1: Vector, point2: Vector) => {
    // Points from point1 to point2
    const fullLength = this.sub(point2, point1)
    const halfLength = this.multiply(fullLength, 0.5)
    const midPoint = this.sum(point1, halfLength)
    return midPoint
  }
}
