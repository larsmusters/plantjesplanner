import type { IPointData, Texture } from 'pixi.js'
import type { Colours } from './colours'

export interface Garden {
  beds: Bed[]
}

export interface PolygonPoints {
  x: number
  y: number
  radius: number
}

export interface Bed {
  id: number
  shape: PolygonPoints[]
  color: Colours
  location: IPointData
  plant: string
  heightOnHover: number
  animation: Texture[]
  animationScale: number
}
