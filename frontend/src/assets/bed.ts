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
    { x: -25, y: -25, radius: 0 },
    { x: 25, y: -25, radius: 0 },
    { x: 25, y: 25, radius: 0 },
    { x: -25, y: 25, radius: 0 }
  ],
  color: Colours.blue,
  location: { x: 0, y: 0 },
  plant: 'madelief',
  heightOnHover: 1.05,
  animationScale: 0.5
}
