import type { IPointData } from 'pixi.js'
import type { Colours } from './colours'

export interface Garden {
  beds: Bed[]
}

export interface Bed {
  shape: IPointData[]
  color: Colours
  plant: string
}
