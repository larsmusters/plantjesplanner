export enum ClickMode {
  add = 'Add',
  select = 'Select',
  edit = 'Edit'
}

export interface Position {
  x: number
  y: number
  scale: number
  rotation: number
}

export interface BoundingBox {
  xMin: number
  xMax: number
  yMin: number
  yMax: number
}
