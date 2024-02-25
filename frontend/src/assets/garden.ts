import type { Garden } from '../types/garden'
import { plantLibrary } from '@/config/plantLibrary'

// Garden-space is in mm: x = 1000mm, y = 1000mm, etc. It is later scaled to screen
export const fakeGarden: Garden = {
  shape: [
    { x: 0, y: 0 },
    { x: 2500, y: 0 },
    { x: 2500, y: 2500 },
    { x: 0, y: 2500 }
  ],
  plants: [
    {
      ...plantLibrary[0],
      location: { x: 250, y: 250 }
    },
    {
      ...plantLibrary[1],
      location: { x: 750, y: 250 }
    }
    // {
    //   ...plantLibrary[2],
    //   location: { x: 1250, y: 250 }
    // },
    // {
    //   ...plantLibrary[3],
    //   location: { x: 1750, y: 250 }
    // },
    // {
    //   ...plantLibrary[4],
    //   location: { x: 2250, y: 250 }
    // },
    // {
    //   ...plantLibrary[5],
    //   location: { x: 250, y: 750 }
    // },
    // {
    //   ...plantLibrary[6],
    //   location: { x: 750, y: 750 }
    // },
    // {
    //   ...plantLibrary[7],
    //   location: { x: 1250, y: 750 }
    // },
    // {
    //   ...plantLibrary[8],
    //   location: { x: 1750, y: 750 }
    // },
    // {
    //   ...plantLibrary[9],
    //   location: { x: 2250, y: 750 }
    // },
    // {
    //   ...plantLibrary[10],
    //   location: { x: 250, y: 1250 }
    // },
    // {
    //   ...plantLibrary[11],
    //   location: { x: 750, y: 1250 }
    // },
    // {
    //   ...plantLibrary[12],
    //   location: { x: 1250, y: 1250 }
    // },
    // {
    //   ...plantLibrary[13],
    //   location: { x: 1750, y: 1250 }
    // },
    // {
    //   ...plantLibrary[14],
    //   location: { x: 2250, y: 1250 }
    // },
    // {
    //   ...plantLibrary[15],
    //   location: { x: 250, y: 1750 }
    // },
    // {
    //   ...plantLibrary[16],
    //   location: { x: 750, y: 1750 }
    // },
    // {
    //   ...plantLibrary[17],
    //   location: { x: 1250, y: 1750 }
    // }
  ]
}
