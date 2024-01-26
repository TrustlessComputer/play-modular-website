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
  setBlockCurrent: (d: TBlockData[]) => void
  setSelectedBricks: (d: any) => void
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
  trait: { color: string; texture: string; shape: string; type: string }
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
  setTrait: ({ color, texture, shape, type }: { color: string; texture: string; shape: string; type: string }) => void
}

type TBrickResponse = {
  shape: string
  patterns: string[]
  positions: { [uId: string]: { x: number; y: number; z: number } }
}

export type TCreatedBrickSlice = {
  createdBricks: { [key: string]: TBrickResponse }
  setCreatedBricks: (b: TBrickResponse) => void
}

export type TListBlocksSlice = {
  listCurrent: TListCurrent[]
  setDataCurrent: (list: TListCurrent[]) => void
}

export type TProjectSlice = {
  projectName: string
  projectId: string

  saveProject: (params) => void
  saveAsProject: (params) => void
  loadProject: (params) => void
  createProject: () => void
}
