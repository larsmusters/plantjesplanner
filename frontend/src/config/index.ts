import { Colours } from '../types/colours'
import type { Bed, Garden } from '../types/garden'

const defaultBed: Bed = {
  id: 0,
  color: Colours.white,
  shape: [],
  location: { x: 0, y: 0 },
  plant: 'default',
  heightOnHover: 1.04,
  animation: [],
  animationScale: 1
}

export const fakeGarden: Garden = {
  shape: [
    { x: 45, y: 0, radius: 5 },
    { x: 600, y: 0, radius: 5 },
    { x: 600, y: 300, radius: 5 },
    { x: 45, y: 300, radius: 5 }
  ],
  beds: [
    {
      ...defaultBed,
      id: 1,
      color: Colours.grass,
      shape: [
        { x: 30, y: -30, radius: 5 },
        { x: 60, y: 30, radius: 5 },
        { x: -30, y: 30, radius: 5 },
        { x: -60, y: -30, radius: 5 }
      ],
      location: { x: 300, y: 100 },
      plant: 'brown',
      animationScale: 0.7
    },
    {
      ...defaultBed,
      id: 2,
      color: Colours.dirt,
      shape: [
        { x: 30, y: -30, radius: 5 },
        { x: 45, y: 60, radius: 5 },
        { x: -30, y: 60, radius: 5 },
        { x: -30, y: -30, radius: 5 }
      ],
      location: { x: 160, y: 180 },
      plant: 'pink',
      animationScale: 0.8
    }
  ]
}
