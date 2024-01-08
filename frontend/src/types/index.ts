import { Texture, Spritesheet, type ISpritesheetData } from 'pixi.js'

export interface Resource {
  spritesheet?: Spritesheet<ISpritesheetData>
  animation?: Texture[]
}
