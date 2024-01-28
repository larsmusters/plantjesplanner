import type { Colours } from '../colours'
import type { Vector } from '../garden'

export interface AngledRectangleConfig {
  position: Vector
  start: Vector
  end: Vector
  thickness: number
  edgeRadius: number

  dragCOM?: Vector
  hitAreaFactor: number
  hoverFactor: number
  hoverTransitionTimems: number
  lineThickness: number
  lineColour: Colours
  lineAlpha: number
  fillColour: Colours
  fillAlpha: number
}
