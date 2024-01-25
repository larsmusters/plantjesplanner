import type { IPointData } from 'pixi.js'
import type { Colours } from '@/types/colours'

export interface PolygonPoint {
  x: number
  y: number
  radius?: number
}

export interface Point {
  x: number
  y: number
}

export interface Garden {
  shape: PolygonPoint[]
  beds: Bed[]
}

export interface Bed {
  name: string
  shape: PolygonPoint[]
  location: IPointData
  plant: Plant
  heightOnHover: number
}

interface PlantPart {
  colour: Colours
  scale: number
  id: number
}

export interface Leaf extends PlantPart {}

export interface Fruit extends PlantPart {}

export interface Flower extends PlantPart {}

export interface Plant {
  name: string
  nameLatin: string
  info: string
  color: Colours
  leaf?: Leaf
  fruit?: Fruit
  flower?: Flower
  animationId: string
  animationScale: number
}

export interface BedEdge {
  p0: { id: number; x: number; y: number }
  p1: { id: number; x: number; y: number }
}
