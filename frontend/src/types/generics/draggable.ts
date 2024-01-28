import type { Colours } from '../colours'
import type { Vector } from '../garden'
import type { PolygonConfig } from '../shapes/polygon'

interface DraggableConfig {
  hoverFactor: number
  hoverTransitionTimems: number
  hitAreaFactor: number
  dragCOM: Vector
  position: Vector

  shadowColour: Colours
  shadowEnable: boolean
  shadowAlpha: number
  shadowOffset: Vector
}

export type { PolygonConfig, DraggableConfig }
