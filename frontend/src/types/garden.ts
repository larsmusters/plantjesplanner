import type { IPointData, Texture } from 'pixi.js'
import type { Colours } from './colours'

export interface PolygonPoints {
  x: number
  y: number
  radius: number
}

export interface Garden {
  shape: PolygonPoints[]
  beds: Bed[]
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
