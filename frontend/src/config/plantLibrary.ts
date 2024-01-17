import { Colours } from '@/types/colours'
import type { Plant } from '@/types/garden'

const LIBRARY_PLANT_BASE = {
  color: Colours.black,
  animationScale: 15,
  info: 'No information available',
  nameLatin: 'No scientific name available'
}

export const plantLibrary: Plant[] = [
  {
    ...LIBRARY_PLANT_BASE,
    name: 'Default',
    nameLatin: 'Defaultis elegantis',
    animationId: 'madelief',
    animationScale: 5
  },
  {
    ...LIBRARY_PLANT_BASE,
    name: 'Hortensia',
    animationId: 'hortensia',
    animationScale: 12
  },
  {
    ...LIBRARY_PLANT_BASE,
    name: 'Kleine maagdenpalm',
    animationId: 'kleine-maagdenpalm',
    animationScale: 10
  },
  {
    ...LIBRARY_PLANT_BASE,
    name: 'Lampenpoetsersgras',
    animationId: 'lampenpoetsersgras',
    animationScale: 10
  },
  {
    ...LIBRARY_PLANT_BASE,
    name: 'Lavendel',
    animationId: 'lavendel',
    animationScale: 10
  },
  {
    ...LIBRARY_PLANT_BASE,
    name: 'Buxus',
    animationId: 'buxus',
    animationScale: 10
  },
  {
    ...LIBRARY_PLANT_BASE,
    name: 'Portugese laurierskers',
    animationId: 'portugese-laurierskers',
    animationScale: 10
  },
  {
    ...LIBRARY_PLANT_BASE,
    name: 'Ijzerhard',
    animationId: 'ijzerhard',
    animationScale: 10
  },
  {
    ...LIBRARY_PLANT_BASE,
    name: 'Viooltjes',
    animationId: 'viooltjes',
    animationScale: 10
  },
  {
    ...LIBRARY_PLANT_BASE,
    name: 'Geranium',
    animationId: 'geranium',
    animationScale: 10
  },
  {
    ...LIBRARY_PLANT_BASE,
    name: 'Spaanse margriet',
    animationId: 'spaanse-margriet',
    animationScale: 10
  },
  {
    ...LIBRARY_PLANT_BASE,
    name: 'Vlinderstruik',
    animationId: 'vlinderstruik',
    animationScale: 10
  },
  {
    ...LIBRARY_PLANT_BASE,
    name: 'Klimop',
    animationId: 'klimop',
    animationScale: 10
  },
  {
    ...LIBRARY_PLANT_BASE,
    name: 'Toscaanse jasmijn',
    animationId: 'toscaanse-jasmijn',
    animationScale: 10
  },
  {
    ...LIBRARY_PLANT_BASE,
    name: 'Hartlelie',
    animationId: 'hartlelie',
    animationScale: 10
  },
  {
    ...LIBRARY_PLANT_BASE,
    name: 'Kerstroos',
    animationId: 'kerstroos',
    animationScale: 10
  }
]
