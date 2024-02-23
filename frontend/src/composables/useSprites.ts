import { Point, type Spritesheet } from 'pixi.js'
import { ref } from 'vue'

const spritesheet = ref<Spritesheet>()

export function useSprites() {
  const addSpritesheet = (sheet: Spritesheet) => {
    spritesheet.value = sheet
  }

  const getSprite = (textureId: string | undefined) => {
    if (!spritesheet.value) return
    if (!textureId) return

    const sprite = spritesheet.value.textures[textureId]
    if (!sprite) {
      return spritesheet.value.textures['default']
    }
    console.log(sprite)
    // Move anchor as python generator can't put the anchor in the middle yet
    sprite.defaultAnchor = new Point(0.5, 0.5)
    return sprite
  }

  const getAnimation = (spriteId: string) => {
    const animation = spritesheet.value?.animations[spriteId]
    return animation
  }

  return { getSprite, getAnimation, addSpritesheet }
}
