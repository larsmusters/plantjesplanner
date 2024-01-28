import type { Colours } from '../colours'
import type { Vector, Vertex } from '../garden'

export interface PolygonConfig {
  position: Vector
  vertices: Vertex[]
  dragCOM?: Vector
  hitAreaFactor: number
  hoverFactor: number
  hoverTransitionTimems: number
  lineThickness: number
  lineColour: Colours
  lineAlpha: number
  fillColour: Colours
  fillAlpha: number

  shadowColour: Colours
  shadowOffset: Vector
  shadowEnable: boolean
  shadowAlpha: number
}
