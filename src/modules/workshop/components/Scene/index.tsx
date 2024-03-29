'use client'

import { useAnchorShorcuts } from '@/hooks/useShortcuts'
import { useStoreGlobal } from '@/stores/blocks'
import {
  EDIT_MODE,
  base,
  checkCollision,
  getMeasurementsFromDimensions,
  heightBase,
  minWorkSpaceSize,
  uID,
} from '@/utils'
import { useEffect, useRef } from 'react'
import { Box3, Group, Vector3 } from 'three'
import { Brick } from '../Brick'
import { BrickCursor } from '../BrickCursor'
import { Lights } from '../Lights'
import { Workspace } from '../Workpage'
import { Select } from '../Select'
import instance from '@/utils/storage/local-storage'
import { useDebounce } from '@/hooks/useDebounce'
import BrickOutline from '../BrickOutline'
import { DeleteBrick } from '@/modules/workshop/components/DeleteBrick'

const mousePoint = new Vector3()
const normal = new Vector3()
const brickDimensions = new Vector3()
const offsetVec = new Vector3()

export const Scene = () => {
  useAnchorShorcuts()

  const {
    blockCurrent,
    blocksState,
    addBlocks,
    mode,
    width,
    depth,
    anchorX,
    anchorZ,
    rotate,
    color,
    texture,
    trait,
    selectedBricks,
    setBricks,
    listCurrent,
  } = useStoreGlobal()
  const bricksBoundBox = useRef<any>({}) // hash map
  const brickCursorRef = useRef<Group>()
  const isDrag = useRef(false)
  const timeoutID = useRef(null)
  const isEditMode = mode === EDIT_MODE

  const addBrick = (e) => {
    e.stopPropagation()
    if (isEditMode) return
    if (!e.face?.normal || !e.point) return
    if (!brickCursorRef.current) return
    // if (!isDrag.current) {
    const boundingBoxOfBrickToBeAdded = new Box3().setFromObject(brickCursorRef.current)

    const uId = uID()
    if (
      checkCollision({ uID: uId, brickBoundingBox: boundingBoxOfBrickToBeAdded }, Object.values(bricksBoundBox.current))
    ) {
      const brickData = {
        intersect: { point: e.point, face: e.face },
        uID: uId,
        dimensions: { x: width, z: depth },
        rotation: rotate ? Math.PI / 2 : 0,
        color: color,
        texture: texture,
        translation: { x: anchorX, y: 0, z: anchorZ },
        type: trait.type,
        groupId: trait.groupId,
      }
      if (trait?.color) addBlocks(brickData)
    }
    // } else {
    //   isDrag.current = false
    // }
  }

  const setBrickCursorPosition = (e): void => {
    e.stopPropagation()
    if (isEditMode) return
    if (!brickCursorRef.current) return
    const { height } = getMeasurementsFromDimensions({
      x: width,
      z: depth,
    })

    const evenWidth = !rotate ? width % 2 === 0 : depth % 2 === 0
    const evenDepth = !rotate ? depth % 2 === 0 : width % 2 === 0

    mousePoint.set(e.point.x, Math.abs(e.point.y), e.point.z)
    normal.set(e.face.normal.x, Math.abs(e.face.normal.y), e.face.normal.z)
    brickDimensions.set(base, height, base)
    offsetVec.set(evenWidth ? base : base / 2, height / 2, evenDepth ? base : base / 2)

    brickCursorRef.current.position
      .copy(mousePoint)
      .add(normal)
      .divide(brickDimensions)
      .floor()
      .multiply(brickDimensions)
      .add(offsetVec)
  }

  const onClick = (e) => {
    if (!isEditMode) addBrick(e)
  }

  const mouseMove = (e) => {
    setBrickCursorPosition(e)
  }

  useEffect(() => {
    const pointerDown = () => {
      timeoutID.current && clearTimeout(timeoutID.current)
      timeoutID.current = setTimeout(() => {
        isDrag.current = true
      }, 300)
    }

    const pointerUp = () => {
      timeoutID.current && clearTimeout(timeoutID.current)
    }

    window.addEventListener('pointerdown', pointerDown)
    window.addEventListener('pointerup', pointerUp)

    return () => {
      window.removeEventListener('pointerdown', pointerDown)
      window.removeEventListener('pointerup', pointerUp)
    }
  }, [])

  return (
    <>
      <Select box multiple>
        {blockCurrent.map((b, i) => {
          const isSelected = selectedBricks.find((s) => s.userData.uID === b.uID) ? true : false
          const { dimensions, rotation, intersect } = b
          const height = 1
          const position = () => {
            const evenWidth = rotation === 0 ? dimensions.x % 2 === 0 : dimensions.z % 2 === 0
            const evenDepth = rotation === 0 ? dimensions.z % 2 === 0 : dimensions.x % 2 === 0
            return new Vector3()
              .copy(intersect?.point)
              .add(intersect?.face.normal)
              .divide(new Vector3(base, height, base))
              .floor()
              .multiply(new Vector3(base, height, base))
              .add(new Vector3(evenWidth ? base : base / 2, height / 2, evenDepth ? base : base / 2))
          }

          return (
            <Brick
              key={b.uID}
              {...b}
              onClick={onClick}
              bricksBoundBox={bricksBoundBox}
              mouseMove={mouseMove}
              isSelected={isSelected}
              position={position()}
            />
          )
        })}
        <DeleteBrick />
        {/* <BrickOutline /> */}
      </Select>
      <Lights />
      <Workspace onClick={onClick} mouseMove={mouseMove} workspaceSize={minWorkSpaceSize} />
      <BrickCursor
        ref={brickCursorRef}
        rotation={rotate ? Math.PI / 2 : 0}
        dimensions={{ x: width, z: depth }}
        translation={{ x: anchorX, z: anchorZ }}
      />
    </>
  )
}
