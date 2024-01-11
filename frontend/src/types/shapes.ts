import type { Colours } from './colours'
import type { PolygonPoint } from './garden'

export interface PolygonStyling {
  lineThickness: number
  lineColour: Colours
  fillAlpha: number
  lineAlpha: number
  alpha?: number
  fillColour: Colours
  shape: PolygonPoint[]
  scale: number
  offset: number
  vertexRadius: number
  vertexLineColour: number
  vertexFillColour: number
  vertexAlpha: number
}
