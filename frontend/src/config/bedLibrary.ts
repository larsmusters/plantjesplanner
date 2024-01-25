import type { Bed } from '@/types/garden'
import { plantLibrary } from './plantLibrary'

const LIBRARY_BED_BASE = {
  location: { x: 0, y: 0 },
  plant: plantLibrary[0],
  heightOnHover: 1.04
}

const radius = 30
export const bedLibrary: Bed[] = [
  {
    ...LIBRARY_BED_BASE,
    name: 'Square',
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
    shape: [
      { x: -250, y: -500, radius },
      { x: 250, y: -500, radius },
      { x: 250, y: 500, radius },
      { x: -250, y: 500, radius }
    ]
  },
  {
    ...LIBRARY_BED_BASE,
    name: 'Circle',
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
    name: 'Medium square',
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
    shape: [
      { x: -750, y: -750, radius },
      { x: 750, y: -750, radius },
      { x: 750, y: 750, radius },
      { x: -750, y: 750, radius }
    ]
  }
]
