import type { Colours } from '@/types/colours'

export interface Vertex {
  x: number
  y: number
  radius?: number
}

export interface Vector {
  x: number
  y: number
}

export interface Garden {
  shape: Vertex[]
  beds: Bed[]
}

export interface Bed {
  name: string
  shape: Vertex[]
  location: Vector
  plant: Plant
  heightOnHover: number
}

export interface PlantPart {
  colour: Colours
  scale: number
  animationId: string
  radius: number
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
