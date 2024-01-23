export type TBlockData = {
  color: string
  dimensions: { x: number; y?: number; z: number }
  intersect: { point: any; face: any }
  rotation: number
  texture: string
  translation: { x: number; z: number }
  uID: string
  bricksBoundBox: { current: any[] }
}
export type TBlocks = {
  blockCurrent: TBlockData[]
  blocksState: [TBlockData[][]]
  currentStateIndex: 0
  isUndo: false
  isRedo: false
}
