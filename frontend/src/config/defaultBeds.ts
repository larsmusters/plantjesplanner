import { Colours } from '@/types/colours'
import type { Bed } from '@/types/garden'

const LIBRARY_BED_BASE = {
  color: Colours.blue,
  location: { x: 0, y: 0 },
  plant: 'madelief',
  heightOnHover: 1.05,
  animationScale: 5
}

const radius = 30
export const bedLibrary: Bed[] = [
  {
    ...LIBRARY_BED_BASE,
    name: 'Square',
    id: 0,
    shape: [
      { x: -250, y: -250, radius },
      { x: 250, y: -250, radius },
      { x: 250, y: 250, radius },
      { x: -250, y: 250, radius }
    ]
  },
  {
    ...LIBRARY_BED_BASE,
    name: 'Rectangle',
    id: 0,
    shape: [
      { x: -250, y: -500, radius },
      { x: 250, y: -500, radius },
      { x: 250, y: 500, radius },
      { x: -250, y: 500, radius }
    ]
  },
  {
    ...LIBRARY_BED_BASE,
    name: 'T-piece',
    id: 0,
    shape: [
      { x: -750, y: -500, radius },
      { x: 750, y: -500, radius },
      { x: 750, y: 0, radius },
      { x: 250, y: 0, radius },
      { x: 250, y: 500, radius },
      { x: -250, y: 500, radius },
      { x: -250, y: 0, radius },
      { x: -750, y: 0, radius }
    ]
  },
  {
    ...LIBRARY_BED_BASE,
    name: 'Circle',
    id: 0,
    shape: [
      { x: 400, y: 0, radius: 400 },
      { x: 200, y: 346.41, radius: 400 },
      { x: -200, y: 346.41, radius: 400 },
      { x: -400, y: 0, radius: 400 },
      { x: -200, y: -346.41, radius: 400 },
      { x: 200, y: -346.41, radius: 400 }
    ]
  },

  {
    ...LIBRARY_BED_BASE,
    name: 'L-piece',
    id: 0,
    shape: [
      { x: -250, y: 250, radius },
      { x: 750, y: 250, radius },
      { x: 750, y: -250, radius },
      { x: 250, y: -250, radius },
      { x: 250, y: -1250, radius },
      { x: -250, y: -1250, radius }
    ]
  },
  {
    ...LIBRARY_BED_BASE,
    name: 'Medium square',
    id: 0,
    shape: [
      { x: -500, y: -500, radius },
      { x: 500, y: -500, radius },
      { x: 500, y: 500, radius },
      { x: -500, y: 500, radius }
    ]
  },
  {
    ...LIBRARY_BED_BASE,
    name: 'Big square',
    id: 0,
    shape: [
      { x: -750, y: -750, radius },
      { x: 750, y: -750, radius },
      { x: 750, y: 750, radius },
      { x: -750, y: 750, radius }
    ]
  }
]
