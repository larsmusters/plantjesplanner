import type { Garden } from '../types/garden'
import { plantLibrary } from '@/config/plantLibrary'
import { bedLibrary } from '@/config/bedLibrary'

// Garden-space is in mm: x = 1000mm, y = 1000mm, etc. It is later scaled to screen
export const fakeGarden: Garden = {
  shape: [
    { x: 0, y: 0 },
    { x: 2500, y: 0 },
    { x: 2500, y: 2500 },
    { x: 0, y: 2500 }
  ],
  beds: [
    {
      ...bedLibrary[0],
      shape: JSON.parse(JSON.stringify(bedLibrary[0].shape)),
      location: { x: 250, y: 250 },
      plant: plantLibrary[0]
    },
    {
      ...bedLibrary[0],
      shape: JSON.parse(JSON.stringify(bedLibrary[0].shape)),
      location: { x: 750, y: 250 },
      plant: plantLibrary[1]
    },
    {
      ...bedLibrary[0],
      shape: JSON.parse(JSON.stringify(bedLibrary[0].shape)),
      location: { x: 1250, y: 250 },
      plant: plantLibrary[2]
    },
    {
      ...bedLibrary[0],
      shape: JSON.parse(JSON.stringify(bedLibrary[0].shape)),
      location: { x: 1750, y: 250 },
      plant: plantLibrary[3]
    },
    {
      ...bedLibrary[0],
      shape: JSON.parse(JSON.stringify(bedLibrary[0].shape)),
      location: { x: 2250, y: 250 },
      plant: plantLibrary[4]
    },
    {
      ...bedLibrary[0],
      shape: JSON.parse(JSON.stringify(bedLibrary[0].shape)),
      location: { x: 250, y: 750 },
      plant: plantLibrary[5]
    },
    {
      ...bedLibrary[0],
      shape: JSON.parse(JSON.stringify(bedLibrary[0].shape)),
      location: { x: 750, y: 750 },
      plant: plantLibrary[6]
    },
    {
      ...bedLibrary[0],
      shape: JSON.parse(JSON.stringify(bedLibrary[0].shape)),
      location: { x: 1250, y: 750 },
      plant: plantLibrary[7]
    },
    {
      ...bedLibrary[0],
      shape: JSON.parse(JSON.stringify(bedLibrary[0].shape)),
      location: { x: 1750, y: 750 },
      plant: plantLibrary[8]
    },
    {
      ...bedLibrary[0],
      shape: JSON.parse(JSON.stringify(bedLibrary[0].shape)),
      location: { x: 2250, y: 750 },
      plant: plantLibrary[9]
    },
    {
      ...bedLibrary[0],
      shape: JSON.parse(JSON.stringify(bedLibrary[0].shape)),
      location: { x: 250, y: 1250 },
      plant: plantLibrary[10]
    },
    {
      ...bedLibrary[0],
      shape: JSON.parse(JSON.stringify(bedLibrary[0].shape)),
      location: { x: 750, y: 1250 },
      plant: plantLibrary[11]
    },
    {
      ...bedLibrary[0],
      shape: JSON.parse(JSON.stringify(bedLibrary[0].shape)),
      location: { x: 1250, y: 1250 },
      plant: plantLibrary[12]
    },
    {
      ...bedLibrary[0],
      shape: JSON.parse(JSON.stringify(bedLibrary[0].shape)),
      location: { x: 1750, y: 1250 },
      plant: plantLibrary[13]
    },
    {
      ...bedLibrary[0],
      shape: JSON.parse(JSON.stringify(bedLibrary[0].shape)),
      location: { x: 2250, y: 1250 },
      plant: plantLibrary[14]
    },
    {
      ...bedLibrary[0],
      shape: JSON.parse(JSON.stringify(bedLibrary[0].shape)),
      location: { x: 250, y: 1750 },
      plant: plantLibrary[15]
    },
    {
      ...bedLibrary[0],
      shape: JSON.parse(JSON.stringify(bedLibrary[0].shape)),
      location: { x: 750, y: 1750 },
      plant: plantLibrary[16]
    },
    {
      ...bedLibrary[0],
      shape: JSON.parse(JSON.stringify(bedLibrary[0].shape)),
      location: { x: 1250, y: 1750 },
      plant: plantLibrary[17]
    }
  ]
}
