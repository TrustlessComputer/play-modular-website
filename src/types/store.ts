import { TBlockData, TListCurrent } from '.'

export type TBlockSlice = {
  selectedBricks: any
  blockCurrent: TBlockData[]
  blocksState: TBlockData[][]
  currentStateIndex: number
  isUndo: boolean
  isRedo: boolean

  addBlocks: (d: TBlockData) => void
  deleteAlls: () => void
  undo: () => void
  redo: () => void
  setBricks: (d: TBlockData) => void
}

export type TPreviewSlice = {
  view: string
  viewPreview: boolean

  setViewPreview: (b: boolean) => void
  setView: (v: string) => void
}

export type TAtributeBlock = {
  mode: string
  width: number
  depth: number
  height: number
  anchorX: number
  anchorZ: number
  anchorY: number
  rotate: boolean
  color: string
  texture: string
  trait: { color: string; texture: string; shape: string }
  selectedBricks: []

  setMode: (mode: string) => void
  setWidth: (w: number) => void
  setDepth: (d: number) => void
  setHeight: (h: number) => void
  setAnchorX: (achor: number) => void
  setAnchorZ: (achor: number) => void
  setAnchorY: (achor: number) => void
  setRotate: (b: boolean) => void
  setColor: (color: string) => void
  setTexture: (t: string) => void
  setTrait: ({ color, texture, shape }: { color: string; texture: string; shape: string }) => void
  setSelectedBricks: (b: any) => void
}

type TBrickResponse = {
  id: string
  shape: string
  patterns: [string, string]
  positions: { x: number; y: number; z: string }[]
}

export type TCreatedBrickSlice = {
  createdBricks: TBrickResponse[]
  setCreatedBricks: (b: TBrickResponse) => void
}

export type TListBlocksSlice = {
  listCurrent: TListCurrent[]
  setListCurrent: (list: TListCurrent[]) => void
}
