import { VectorUtil } from '@/utils/vectorUtil'
import type { Vector, Vertex } from '@/types'
import { useGridStore, useGardenStore } from '@/stores'

export function useBedMover() {
  const gardenStore = useGardenStore()
  const gridStore = useGridStore()
  const VUtil = new VectorUtil()

  const moveBedVertex = (vertexId: number, bedId: number) => {
    const bed = gardenStore.garden.beds[bedId]
    const snapLocation = VUtil.moveToGrid(gardenStore.cursor, gridStore.vertices)
    const newBedPoint = VUtil.moveOrigin(bed.location, snapLocation)
    bed.shape[vertexId] = { ...bed.shape[vertexId], ...newBedPoint }
  }

  const moveBedVertices = (dragLoc: Vector, bedId: number, ids?: number[]) => {
    const bed = gardenStore.garden.beds[bedId]
    // if ids is not given, all vertices of the bed are moved.
    const moveIds = ids ? ids : bed.shape.map((_, i) => i)
    let bedVertices: Vertex[] = moveIds.map((id) => bed.shape[id]) // Bed-space
    bedVertices = VUtil.moveOrigins(dragLoc, bedVertices) // Bed-space (but relative to dragging location)
    bedVertices = VUtil.moveOrigins(VUtil.inverse(gardenStore.cursor), bedVertices) // Garden-space

    const closestVertices = VUtil.findClosestPair(bedVertices, gridStore.vertices)
    const matchLocationBed = bed.shape[moveIds[closestVertices.pointId]]
    const matchLocationGrid = gridStore.vertices[closestVertices.candidateId]
    // gridPoint - bedPoint = bed.location
    const newBedLocation = VUtil.sub(matchLocationGrid, matchLocationBed)

    if (ids) {
      // To move only part of a bed, you have to move the bed ánd move unselected vertices in the opposite direction.
      let unmovedVertices = VUtil.moveOrigins(VUtil.inverse(bed.location), bed.shape)
      unmovedVertices = VUtil.moveOrigins(newBedLocation, unmovedVertices)
      unmovedVertices.forEach((unmovedVertex, i) => {
        if (ids.includes(i)) return
        bed.shape[i] = { ...bed.shape[i], ...unmovedVertex }
      })
    }

    bed.location = newBedLocation
  }

  return { moveBedVertex, moveBedVertices }
}
