import { Colours } from '@/types/colours'
import type { Bed } from '@/types/garden'

export const defaultBed: Bed = {
  id: 0,
  color: Colours.white,
  shape: [],
  location: { x: 0, y: 0 },
  plant: 'default',
  heightOnHover: 1.04,
  animationScale: 1
}

export const defaultNewBed: Bed = {
  id: 0,
  shape: [
    { x: -250, y: -250, radius: 30 },
    { x: 250, y: -250, radius: 30 },
    { x: 250, y: 250, radius: 30 },
    { x: -250, y: 250, radius: 30 }
  ],
  color: Colours.blue,
  location: { x: 0, y: 0 },
  plant: 'madelief',
  heightOnHover: 1.05,
  animationScale: 5
}
