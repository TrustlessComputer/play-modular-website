'use client'

import { useAnchorShorcuts } from '@/hooks/useShortcuts'
import { useStoreGlobal } from '@/stores/blocks'
import { EDIT_MODE, base, getMeasurementsFromDimensions, minWorkSpaceSize, uID } from '@/utils'
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
    setMode,
    selectedBricks,
    setBricks,
    blocksState
  } = useStoreGlobal()
console.log('blockCurrentScreen', blockCurrent)
  const bricksBoundBox = useRef([])
  const brickCursorRef = useRef<Group>()
  const isDrag = useRef(false)
  const timeoutID = useRef(null)
  const isEditMode = mode === EDIT_MODE
  const deboundeData = useDebounce(blockCurrent, 1000)
  // console.log('blocksState in scence', blocksState)
  const addBrick = (e) => {
    e.stopPropagation()
    if (isEditMode) return
    if (!e.face?.normal || !e.point) return
    if (!brickCursorRef.current) return
    if (!isDrag.current) {
      const boundingBoxOfBrickToBeAdded = new Box3().setFromObject(brickCursorRef.current)
      let isCollied = false
      let isSomethingBelow = false
      let isFirstLayer = Math.floor(boundingBoxOfBrickToBeAdded.max.y) === Math.floor((base * 2) / 1.5)
      const acceptRange = 9

      for (let index = 0; index < bricksBoundBox.current.length; index++) {
        const brickBoundingBox = bricksBoundBox.current[index].brickBoundingBox
        const collision = boundingBoxOfBrickToBeAdded.intersectsBox(brickBoundingBox)
        const yIntsersect = brickBoundingBox.max.y - acceptRange > boundingBoxOfBrickToBeAdded.min.y
        const isSameRow = Math.floor(boundingBoxOfBrickToBeAdded.min.y) === Math.floor(brickBoundingBox.min.y)

        // Check if brick is not on top of another brick
        // Check if there is a brick below
        const isBrickBelow = brickBoundingBox.max.y - acceptRange < boundingBoxOfBrickToBeAdded.min.y
        const isOver2Bricks =
          Math.floor(boundingBoxOfBrickToBeAdded.min.y + acceptRange - brickBoundingBox.max.y) >
          Math.floor((base * 2) / 1.5)
        if (isOver2Bricks) continue

        // Normalize width and depth for the brick below
        let minCellXBelow = Math.round(brickBoundingBox.min.x) / base
        let maxCellXBelow = Math.round(brickBoundingBox.max.x) / base
        let minCellZBelow = Math.round(brickBoundingBox.min.z) / base
        let maxCellZBelow = Math.round(brickBoundingBox.max.z) / base

        minCellXBelow = minCellXBelow == -0 ? 0 : minCellXBelow
        maxCellXBelow = maxCellXBelow == -0 ? 0 : maxCellXBelow
        minCellZBelow = minCellZBelow == -0 ? 0 : minCellZBelow
        maxCellZBelow = maxCellZBelow == -0 ? 0 : maxCellZBelow

        let minCellXToBeAdded = Math.round(boundingBoxOfBrickToBeAdded.min.x) / base
        let maxCellXToBeAdded = Math.round(boundingBoxOfBrickToBeAdded.max.x) / base
        let minCellZToBeAdded = Math.round(boundingBoxOfBrickToBeAdded.min.z) / base
        let maxCellZToBeAdded = Math.round(boundingBoxOfBrickToBeAdded.max.z) / base

        minCellXToBeAdded = minCellXToBeAdded == -0 ? 0 : minCellXToBeAdded
        maxCellXToBeAdded = maxCellXToBeAdded == -0 ? 0 : maxCellXToBeAdded
        minCellZToBeAdded = minCellZToBeAdded == -0 ? 0 : minCellZToBeAdded
        maxCellZToBeAdded = maxCellZToBeAdded == -0 ? 0 : maxCellZToBeAdded

        // Convert minX, maxX of below brick to array
        const xBelow = []
        const zBelow = []
        for (let index = minCellXBelow; index <= maxCellXBelow; index++) {
          xBelow.push(index)
        }
        for (let index = minCellZBelow; index <= maxCellZBelow; index++) {
          zBelow.push(index)
        }

        const xToBeAdded = []
        const zToBeAdded = []

        for (let index = minCellXToBeAdded; index <= maxCellXToBeAdded; index++) {
          xToBeAdded.push(index)
        }
        for (let index = minCellZToBeAdded; index <= maxCellZToBeAdded; index++) {
          zToBeAdded.push(index)
        }

        // Filter out the top layer
        if (isFirstLayer) continue

        let isOverlapX = false
        let isOverlapZ = false
        for (let index = 0; index < xToBeAdded.length; index++) {
          const x = xToBeAdded[index]

          if (x !== xBelow[0] && x !== xBelow[xBelow.length - 1] && xBelow.includes(x)) {
            isOverlapX = true
            break
          }
        }

        for (let index = 0; index < zToBeAdded.length; index++) {
          const z = zToBeAdded[index]

          if (z !== zBelow[0] && z !== zBelow[zBelow.length - 1] && zBelow.includes(z)) {
            isOverlapZ = true
            break
          }
        }

        if (yIntsersect && (isOverlapX || isOverlapZ) && !isSameRow) {
          isCollied = true
          break
        }

        if (isOverlapX && isOverlapZ && isBrickBelow) {
          // console.log('isSomethingBelow')
          isSomethingBelow = true
        }
      }

      if (!isCollied && ((isSomethingBelow && !isFirstLayer) || isFirstLayer)) {
        const brickData = {
          intersect: { point: e.point, face: e.face },
          uID: uID(),
          dimensions: { x: width, z: depth },
          rotation: rotate ? Math.PI / 2 : 0,
          color: color,
          texture: texture,
          translation: { x: anchorX, z: anchorZ },
          type: trait.type,
          groupId: trait.groupId,
        }

        if (trait?.color) {
          // setMode(EDIT_MODE)
          addBlocks(brickData)
        }
      }
    } else {
      isDrag.current = false
    }
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

  useEffect(() => {
    if (deboundeData.length >= 1) {
      instance.set('DATA_BLOCKS', deboundeData)
    }
  }, [deboundeData.length])

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
        <DeleteBrick setBricks={setBricks} />
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
