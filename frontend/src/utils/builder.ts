import { type Graphics } from 'pixi.js'
import { buildPolygon } from '.'
import { Colours } from '@/types/colours'
import type { PolygonEdgeStyling, PolygonStyling, PolygonVertexStyling } from '@/types/shapes'
import type { Vector } from '@/types/garden'

const stylingDefault: PolygonStyling = {
  lineThickness: 0,
  lineColour: Colours.black,
  fillAlpha: 1,
  lineAlpha: 1,
  alpha: undefined,
  fillColour: Colours.white,
  shape: [
    { x: -10, y: -10 },
    { x: 10, y: -10 },
    { x: 5, y: 10 }
  ],
  scale: 1,
  offset: 0
}

export const drawPolygon = (g: Graphics, polygonStyling?: Partial<PolygonStyling>) => {
  const ps: PolygonStyling = { ...stylingDefault, ...polygonStyling }
  if (ps.alpha) {
    ps.lineAlpha = ps.alpha
    ps.fillAlpha = ps.alpha
  }

  g.clear()

  g.lineStyle(ps.lineThickness, ps.lineColour, ps.lineAlpha)

  g.beginFill(ps.fillColour, ps.fillAlpha)
  if (g.drawRoundedShape) {
    g.drawRoundedShape(buildPolygon(ps.shape, ps.scale, ps.offset), 0)
  }
}

const polygonVertexDefaultStyling: PolygonVertexStyling = {
  lineThickness: 0,
  lineColour: Colours.black,
  alpha: 0.8,
  fillColour: Colours.white,
  location: { x: 0, y: 0 },
  radius: 10
}

export const drawPolygonVertex = (g: Graphics, polygonStyling?: Partial<PolygonVertexStyling>) => {
  const pvs: PolygonVertexStyling = { ...polygonVertexDefaultStyling, ...polygonStyling }
  g.clear()
  g.lineStyle(pvs.lineThickness, pvs.lineColour, pvs.alpha)
  g.beginFill(pvs.fillColour, pvs.alpha)
  g.drawCircle(pvs.location.x, pvs.location.y, pvs.radius)
  g.endFill()
}

const polygonEdgeDefaultStyling: PolygonEdgeStyling = {
  lineThickness: 0,
  lineColour: Colours.black,
  alpha: 0.75
}

export const buildPolygonEdge = (start: Vector, end: Vector, thickness: number): Vector[] => {
  // Build a thick line (so that it is clickable)
  // Step 1: Calculate the length of the line
  const length = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2))

  // Step 2: Calculate the unit vector u
  const u = {
    x: (end.x - start.x) / length,
    y: (end.y - start.y) / length
  }

  // Step 3: Calculate the perpendicular vector v
  const v = {
    x: -u.y,
    y: u.x
  }

  // Step 4: Calculate rectangle vertices
  const halfThickness = thickness / 2
  const rectangle = [
    {
      x: start.x - halfThickness * v.x,
      y: start.y - halfThickness * v.y
    },
    {
      x: start.x + halfThickness * v.x,
      y: start.y + halfThickness * v.y
    },
    {
      x: end.x + halfThickness * v.x,
      y: end.y + halfThickness * v.y
    },
    {
      x: end.x - halfThickness * v.x,
      y: end.y - halfThickness * v.y
    }
  ]
  return rectangle
}

export const drawPolygonEdge = (
  g: Graphics,
  start: Vector,
  end: Vector,
  polygonStyling?: Partial<PolygonEdgeStyling>
) => {
  const pes: PolygonEdgeStyling = { ...polygonEdgeDefaultStyling, ...polygonStyling }
  const points = buildPolygonEdge(start, end, pes.lineThickness)

  g.clear()
  g.beginFill(pes.lineColour, pes.alpha)
  g.drawPolygon(points)
  g.endFill()
}
