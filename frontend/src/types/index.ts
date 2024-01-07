import { Spritesheet, Texture } from 'pixi.js'

export interface Resource {
  spritesheet?: undefined | Spritesheet
  animation?: undefined | Texture[]
}
