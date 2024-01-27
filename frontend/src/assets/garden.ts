import type { Garden } from '../types/garden'
import { plantLibrary } from '@/config/plantLibrary'
import { bedLibrary } from '@/config/bedLibrary'

// Garden-space is in mm: x = 1000mm, y = 1000mm, etc. It is later scaled to screen
export const fakeGarden: Garden = {
  shape: [
    { x: 0, y: 0 },
    { x: 5000, y: 0 },
    { x: 5000, y: 5000 },
    { x: 0, y: 5000 }
  ],
  beds: [
    {
      ...bedLibrary[1],
      shape: JSON.parse(JSON.stringify(bedLibrary[1].shape)),
      location: { x: 1000, y: 500 },
      plant: plantLibrary[0]
    }
    // {
    //   ...bedLibrary[2],
    //   shape: JSON.parse(JSON.stringify(bedLibrary[2].shape)),
    //   location: { x: 3000, y: 2000 },
    //   plant: plantLibrary[1]
    // },
    // {
    //   ...bedLibrary[4],
    //   shape: JSON.parse(JSON.stringify(bedLibrary[4].shape)),
    //   location: { x: 1500, y: 2500 },
    //   plant: plantLibrary[2]
    // },
    // {
    //   ...bedLibrary[3],
    //   shape: JSON.parse(JSON.stringify(bedLibrary[3].shape)),
    //   location: { x: 4000, y: 500 },
    //   plant: plantLibrary[3]
    // }
  ]
}
