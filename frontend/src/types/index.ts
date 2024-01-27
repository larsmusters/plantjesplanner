export enum ClickMode {
  add = 'add',
  select = 'select',
  edit = 'edit'
}

export enum Tab {
  add = 'Add',
  info = 'Info'
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
