import type { Colours, Vector, Vertex } from '..'

export interface Shape {
  position: Vector
  lineThickness: number
  lineColour: Colours
  lineAlpha: number
  fillColour: Colours
  fillAlpha: number
}

export interface DraggableConfig {
  hoverFactor: number
  hoverTransitionTimems: number
  hitAreaFactor: number
  dragCOM?: Vector
  position: Vector

  shadowColour?: Colours
  shadowEnable?: boolean
  shadowAlpha?: number
  shadowOffset?: Vector
}

export interface PolygonConfig extends DraggableConfig, Shape {
  vertices: Vertex[]
}

export interface CircleConfig extends DraggableConfig, Shape {
  offset: Vector
  radius: number
}

export interface AngledRectangleConfig extends DraggableConfig, Shape {
  start: Vector
  end: Vector
  thickness: number
  edgeRadius: number
}
