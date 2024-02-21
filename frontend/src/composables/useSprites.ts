import type { Spritesheet } from 'pixi.js'
import { ref } from 'vue'

const spritesheet = ref<Spritesheet>()

export function useSprites() {
  // Sprite loading strategy:
  // All sprites in one file
  // Load file at start-up.
  // Generate file with python, place in front-end folder.
  const addSpritesheet = (sheet: Spritesheet) => {
    spritesheet.value = sheet
  }

  const getSprite = (textureId: string) => {
    const sprite = spritesheet.value?.textures[textureId]
    return sprite
  }

  const getAnimation = (animationId: string) => {
    const animation = spritesheet.value?.animations[animationId]
    return animation
  }

  return { getSprite, getAnimation, addSpritesheet }
}
