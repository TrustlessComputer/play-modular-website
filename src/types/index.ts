export type TBlockData = {
    color: string
    dimensions: { x: 1; z: 1 }
    intersect: { point: any; face: any }
    rotation: number
    texture: string
    translation: { x: 0; z: 0 }
    uID: string
}
export type TBlocks = {
    blockCurrent: TBlockData[]
    blocksState: [TBlockData[][]]
    currentStateIndex: 0
    isUndo: false
    isRedo: false
}
