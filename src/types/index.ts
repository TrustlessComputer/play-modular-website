import { Vector3 } from 'three'

export type TBlockData = {
  type: string
  color: string
  texture: string
  dimensions: { x: number; y?: number; z: number }
  rotation: number
  position?: Vector3
  translation: { x: number; z: number }
  intersect: { point: any; face: any }
  uID: string
  bricksBoundBox?: { current: any[] }
  isSelected?: boolean
}
export type TBlocks = {
  blockCurrent: TBlockData[]
  blocksState: [TBlockData[][]]
  currentStateIndex: number
  isUndo: false
  isRedo: false
}

export type TListCurrent = {
  img: string
  // count: number
  traits: TTraitBlocks
}
export type TAtribute = { traitType: string; value: string }[]
export type TTraitBlocks = {
  color: string
  ShapeObject: string
  texture: string
  id?: string
}
