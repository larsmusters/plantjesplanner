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
  plants: Plant[]
}

export interface PlantPart {
  colour: Colours
  spriteId: string
  spriteScale: number
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
  location: Vector
}
