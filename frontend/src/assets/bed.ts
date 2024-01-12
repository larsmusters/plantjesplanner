import { Colours } from '@/types/colours'
import type { Bed } from '@/types/garden'

export const defaultBed: Bed = {
  id: 0,
  color: Colours.white,
  shape: [],
  location: { x: 0, y: 0 },
  plant: 'default',
  heightOnHover: 1.04,
  animation: [],
  animationScale: 1
}

export const defaultNewBed: Bed = {
  id: 4,
  shape: [
    { x: -30, y: -30, radius: 0 },
    { x: 30, y: -30, radius: 0 },
    { x: 30, y: 30, radius: 0 },
    { x: -30, y: 30, radius: 0 }
  ],
  color: Colours.blue,
  location: { x: 0, y: 0 },
  plant: 'madelief',
  heightOnHover: 1.05,
  animation: [],
  animationScale: 0.5
}
