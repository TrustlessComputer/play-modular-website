export const base = 25
export const heightBase = base * 1.4
export const knobSize = 7
export const outlineWidth = 1
export const minWorkSpaceSize = 1000

export const CREATE_MODE = 'Place'
export const EDIT_MODE = 'Adjust'
export const TIME_SAVE = 60000
export const LOCAL_DATA = 'BLOCKS'
export const views = {
  Isometric: 'Isometric',
  TopDown: 'Top Down',
}
export const viewMapToPosition = {
  [views.Isometric]: [500, 500, 500],
  [views.TopDown]: [0, 1000, 0],
}

export const defaultWidth = 1
export const defaultAnchor = 0

export const bricks = [
  { x: 1, z: 1 },
  { x: 2, z: 1 },
  { x: 2, z: 2 },
  { x: 3, z: 1 },
  { x: 3, z: 2 },
  { x: 4, z: 1 },
  { x: 4, z: 2 },
]

export const colors = ['#FF0000', '#FF9800', '#F0E100', '#00DE00', '#A1BC24', '#0011CF', '#000000', '#652A0C']

export const cursorColors = [
  '#FFA6B1', // Soft Pink
  '#FFB6C1', // Light Pink
  '#FFD1A8', // Peach
  '#FFE4B5', // Moccasin
  '#FFDEAD', // Navajo White
  '#FFF0E1', // Misty Rose
  '#D8BFD8', // Thistle
  '#E6E6FA', // Lavender
  '#B0E0E6', // Powder Blue
  '#ADD8E6', // Light Blue
  '#B0C4DE', // Light Steel Blue
  '#98FB98', // Pale Green
  '#F0E68C', // Khaki
  '#FFEBD6', // Almond
  '#FFE5B4', // Mellow Apricot
  '#FFDAB9', // Peach Puff
  '#EEDD82', // Light Goldenrod
  '#D3D3D3', // Light Gray
  '#FFC0CB', // Pink
  '#FFB347', // Pastel Orange
]
