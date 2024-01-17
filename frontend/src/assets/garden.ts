import { Colours } from '../types/colours'
import type { Garden } from '../types/garden'
import { defaultBed } from './bed'

// Garden-space is in mm: x = 1000mm, y = 1000mm, etc. It is later scaled to screen
export const fakeGarden: Garden = {
  shape: [
    { x: 0, y: 0, radius: 5 },
    { x: 5000, y: 0, radius: 5 },
    { x: 5000, y: 5000, radius: 5 },
    { x: 0, y: 5000, radius: 5 }
  ],
  beds: [
    {
      ...defaultBed,
      id: 1,
      color: Colours.brownFlower,
      shape: [
        { x: 500, y: -500, radius: 30 },
        { x: -500, y: -500, radius: 30 },
        { x: -500, y: 500, radius: 30 },
        { x: 250, y: 750, radius: 30 },
        { x: 500, y: 500, radius: 30 }
      ],
      location: { x: 500, y: 500 },
      plant: 'brown',
      animationScale: 15
    },
    {
      ...defaultBed,
      id: 2,
      color: Colours.violetFlower,
      shape: [
        { x: 1000, y: -2000, radius: 5 },
        { x: -1000, y: -2000, radius: 5 },
        { x: -1000, y: 2000, radius: 5 },
        { x: 1000, y: 2000, radius: 5 }
      ],
      location: { x: 3000, y: 2000 },
      plant: 'pink',
      animationScale: 15
    }
  ]
}
