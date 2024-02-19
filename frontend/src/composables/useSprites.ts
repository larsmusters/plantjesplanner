import type { Texture } from 'pixi.js'
import { ref } from 'vue'

const sprites = ref<Record<string | number, Texture[]>>({})

export function useSprites() {
  const getSprites = () => {
    // Gets the relevant sprites (everything currently in the garden, and more i guess) from BE.
    console.log('getting sprites')
  }

  if (Object.keys(sprites.value).length == 0) getSprites()

  return { sprites }
}
