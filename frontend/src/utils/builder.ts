import { type Graphics } from 'pixi.js'
import { buildPolygon } from '.'
import { Colours } from '@/types/colours'
import type { PolygonStyling } from '@/types/shapes'

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
