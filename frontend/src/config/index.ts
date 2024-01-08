import { Colours } from '../types/colours'
import type { Bed, Garden } from '../types/garden'

const defaultBed: Bed = {
  id: 0,
  color: Colours.white,
  shape: [],
  location: { x: 0, y: 0 },
  plant: 'default',
  heightOnHover: 1.25,
  animation: [],
  animationScale: 1
}

export const fakeGarden: Garden = {
  beds: [
    {
      ...defaultBed,
      id: 1,
      color: Colours.green,
      shape: [
        { x: 30, y: -30, radius: 10 },
        { x: 60, y: 30, radius: 10 },
        { x: -30, y: 30, radius: 10 },
        { x: -60, y: -30, radius: 10 }
      ],
      location: { x: 80, y: 100 },
      plant: 'brown',
      animationScale: 0.7
    },
    {
      ...defaultBed,
      id: 2,
      color: Colours.red,
      shape: [
        { x: 30, y: -30, radius: 10 },
        { x: 60, y: 30, radius: 10 },
        { x: -30, y: 30, radius: 10 },
        { x: -60, y: -30, radius: 10 }
      ],
      location: { x: 160, y: 180 },
      plant: 'pink',
      animationScale: 0.8
    }
  ]
}
