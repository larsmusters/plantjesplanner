import { Colours } from '@/types/colours'
import type { Plant } from '@/types/garden'

const LIBRARY_PLANT_BASE = {
  color: Colours.blue,
  animationScale: 15
}

export const plantLibrary: Plant[] = [
  {
    ...LIBRARY_PLANT_BASE,
    color: Colours.grass,
    name: 'Madelief',
    nameLatin: 'Bellis perennis',
    animationId: 'madelief',
    animationScale: 5
  },
  {
    ...LIBRARY_PLANT_BASE,
    color: Colours.violetFlower,
    name: 'Pink',
    animationId: 'pink',
    animationScale: 12
  },
  {
    ...LIBRARY_PLANT_BASE,
    color: Colours.brownFlower,
    name: 'Brown',
    animationId: 'brown',
    animationScale: 10
  },
  {
    ...LIBRARY_PLANT_BASE,
    color: Colours.orange,
    name: 'Orange',
    animationId: 'orange',
    animationScale: 10
  }
]
