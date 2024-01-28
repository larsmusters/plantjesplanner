import type { Colours } from '../colours'
import type { Vector } from '../garden'

export interface CircleConfig {
  position: Vector
  offset: Vector
  dragCOM?: Vector
  radius: number
  hitAreaRadiusFactor: number
  hoverFactor: number
  hoverTransitionTimems: number
  lineThickness: number
  lineColour: Colours
  fillColour: Colours
  alpha: number
}
