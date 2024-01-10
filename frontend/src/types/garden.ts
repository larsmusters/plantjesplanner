import type { IPointData, Texture } from 'pixi.js'
import type { Colours } from '@/types/colours'

export interface PolygonPoint {
  x: number
  y: number
  radius: number
}

export interface Garden {
  shape: PolygonPoint[]
  beds: Bed[]
}

export interface Bed {
  id: number
  shape: PolygonPoint[]
  color: Colours
  location: IPointData
  plant: string
  heightOnHover: number
  animation: Texture[]
  animationScale: number
}
