import type { Colours } from '../colours'
import type { Vector, Vertex } from '../garden'

export interface PolygonConfig {
  position: Vector
  data: PolygonThickEdge
  dragCOM?: Vector
  // offset: Vector
  hitAreaFactor: number
  hoverFactor: number
  hoverTransitionTimems: number
  lineThickness: number
  lineColour: Colours
  fillColour: Colours
  alpha: number
}

export interface PolygonThickEdge {
  type: 'ThickEdge'
  start: Vector
  end: Vector
  thickness: number
}

export interface PolygonPolygon {
  type: 'Polygon'
  vertices: Vertex[]
}
