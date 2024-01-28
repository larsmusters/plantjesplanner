import type { Vector } from '@/types/garden'

// Does all the annoying vector math for you.
export class VectorMath {
  sum = (point1: Vector, point2: Vector): Vector => {
    return {
      x: point1.x + point2.x,
      y: point1.y + point2.y
    }
  }

  sub = (point1: Vector, point2: Vector): Vector => {
    return {
      x: point1.x - point2.x,
      y: point1.y - point2.y
    }
  }

  multiply = (point: Vector, factor: number): Vector => {
    return { x: point.x * factor, y: point.y * factor }
  }

  inverse = (point: Vector): Vector => {
    return { x: -point.x, y: -point.y }
  }

  distance = (point1: Vector, point2: Vector) => {
    const xDist = point1.x - point2.x
    const yDist = point1.y - point2.y
    return Math.sqrt(xDist * xDist + yDist * yDist)
  }
}
