import { Colours } from '../types/colours'
import type { Garden } from '../types/garden'
import { defaultBed } from './bed'

export const fakeGarden: Garden = {
  shape: [
    { x: 45, y: 0, radius: 5 },
    { x: 600, y: 0, radius: 5 },
    { x: 600, y: 400, radius: 5 },
    { x: 45, y: 400, radius: 5 }
  ],
  beds: [
    {
      ...defaultBed,
      id: 1,
      color: Colours.brownFlower,
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
      color: Colours.violetFlower,
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
