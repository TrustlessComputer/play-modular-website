import { ReactNode } from 'react'
import { TBlockData, TListCurrent, TTraitBlocks } from '.'

export type TBlockSlice = {
  selectedBricks: any
  blockCurrent: TBlockData[]
  blocksState: TBlockData[][]
  currentStateIndex: number
  isUndo: boolean
  isRedo: boolean
  listCurrent: TListCurrent[]

  setDataCurrent: (list: TListCurrent[]) => void
  sliceListCurrent: (
    groupId: string,
    listCurrent: TListCurrent[],
  ) => { listCurrent: TListCurrent[]; inscriptionId: string }
  pushAllListCurrent: (blockCurrent: TBlockData[], listCurrent: TListCurrent[]) => any
  deleteAllListCurrent: (blockCurrent: TBlockData[], listCurrent: TListCurrent[]) => any
  pushListCurrent: (
    inscriptionId: string,
    groupId: string,
    listCurrent: TListCurrent[],
  ) => { listCurrent: TListCurrent[] }
  addBlocks: (d: TBlockData) => void
  deleteAlls: () => void
  deleteSelected: (d: any) => void
  setBlockCurrent: (d: TBlockData[]) => void
  setBlockCurrentUpdate: (d: any) => void
  // deleteSeletBlocks: () => void
  setSelectedBricks: (d: any) => void
  undo: () => void
  redo: () => void
  setBricks: (d: any) => void
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
  trait: TTraitBlocks

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
  setTrait: ({
    color,
    texture,
    shape,
    type,
    groupId,
  }: {
    color: string
    texture: string
    shape: string
    type: string
    groupId: string
  }) => void
  // setSelectedBricks: (b: any) => void
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

export type TProjectSlice = {
  projectName: string
  projectId: string
  renderFile: string
  selectedProject: {
    id: string
    name: string
  }
  loading: boolean

  saveProject: (params) => Promise<'success' | 'failed'>
  loadProject: (params) => void
  createProject: () => void
  setSelectedProject: (params) => void
  setLoading: (loading: boolean) => void
}

export type ModalProps = {
  id: string
  component: ReactNode
}

export type TModalSlice = {
  modals: ModalProps[]
  openModal: (params: ModalProps) => void
  closeModal: (id: string) => void
}

export type TDragSlice = {
  isDragging: boolean
  setIsDragging: (b: boolean) => void
}
