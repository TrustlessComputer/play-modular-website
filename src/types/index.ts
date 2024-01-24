import { Vector3 } from 'three'

export type TBlockData = {
  color: string
  texture: string
  dimensions: { x: number; y?: number; z: number }
  rotation: number
  position?: Vector3
  translation: { x: number; z: number }
  intersect: { point: any; face: any }
  uID: string
  bricksBoundBox?: { current: any[] }
}
export type TBlocks = {
  blockCurrent: TBlockData[]
  blocksState: [TBlockData[][]]
  currentStateIndex: number
  isUndo: false
  isRedo: false
}
