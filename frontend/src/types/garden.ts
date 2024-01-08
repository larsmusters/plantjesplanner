import type { IPointData, Texture } from 'pixi.js'
import type { Colours } from './colours'

export interface Garden {
  beds: Bed[]
}

export interface Bed {
  id: number
  shape: IPointData[]
  color: Colours
  location: IPointData
  plant: string
  heightOnHover: number
  animation: Texture[]
  animationScale: number
}
