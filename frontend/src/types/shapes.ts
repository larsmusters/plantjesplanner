import type { Colours } from './colours'
import type { Vector, Vertex } from './garden'

export interface PolygonStyling {
  lineThickness: number
  lineColour: Colours
  fillAlpha: number
  lineAlpha: number
  alpha?: number
  fillColour: Colours
  shape: Vertex[]
  scale: number
  offset: number
}

export interface PolygonVertexStyling {
  radius: number
  lineThickness: number
  lineColour: number
  fillColour: number
  alpha: number
}

export interface PolygonEdgeStyling {
  lineThickness: number
  lineColour: number
  alpha: number
}
