import { useEffect, useRef, useState, useMemo } from 'react'
import { Vector3, Box3, Mesh } from 'three'
import { Select } from '@react-three/drei'
import { Brick } from '../Brick'
import { BrickCursor } from '../BrickCursor'
import { Lights } from '../Light'
import { Workspace } from '../Workpage'
import { useStoreGlobal } from '@/stores'
import { EDIT_MODE, base, getMeasurementsFromDimensions, minWorkSpaceSize, uID } from '@/utils'
import { DeleteBrick } from '../DeleteBrick'
import { useAnchorShorcuts } from '@/hooks/useShortcuts'

const mousePoint = new Vector3()
const normal = new Vector3()
const brickDimensions = new Vector3()
const offsetVec = new Vector3()

export const Scene = () => {
  useAnchorShorcuts()

  const { blockCurrent, addBlocks, mode, width, depth, anchorX, anchorZ, rotate, color, texture } = useStoreGlobal()
  const bricksBoundBox = useRef([])
  const brickCursorRef = useRef<Mesh>()
  const isEditMode = mode === EDIT_MODE

  const addBrick = (e) => {
    e.stopPropagation()

    if (isEditMode) return
    if (!e.face?.normal || !e.point) return
    if (!brickCursorRef.current) return
    if (!isDrag.current) {
      const dimensions = getMeasurementsFromDimensions({
        x: width,
        z: depth,
      })
      const boundingBoxOfBrickToBeAdded = new Box3().setFromObject(brickCursorRef.current)

      let canCreate = true

      for (let index = 0; index < bricksBoundBox.current.length; index++) {
        const brickBoundingBox = bricksBoundBox.current[index].brickBoundingBox
        const collision = boundingBoxOfBrickToBeAdded.intersectsBox(brickBoundingBox)
        for (let index = 0; index < bricksBoundBox.current.length; index++) {
          const brickBoundingBox = bricksBoundBox.current[index].brickBoundingBox
          const collision = boundingBoxOfBrickToBeAdded.intersectsBox(brickBoundingBox)

          if (collision) {
            const dx = Math.abs(brickBoundingBox.max.x - boundingBoxOfBrickToBeAdded.max.x)
            const dz = Math.abs(brickBoundingBox.max.z - boundingBoxOfBrickToBeAdded.max.z)
            const yIntsersect = brickBoundingBox.max.y - 9 > boundingBoxOfBrickToBeAdded.min.y
            if (yIntsersect && dx !== dimensions.width && dz !== dimensions.depth) {
              canCreate = false
              break
            }
          }
        }
        if (collision) {
          const dx = Math.abs(brickBoundingBox.max.x - boundingBoxOfBrickToBeAdded.max.x)
          const dz = Math.abs(brickBoundingBox.max.z - boundingBoxOfBrickToBeAdded.max.z)
          const yIntsersect = brickBoundingBox.max.y - 9 > boundingBoxOfBrickToBeAdded.min.y
          if (yIntsersect && dx !== dimensions.width && dz !== dimensions.depth) {
            canCreate = false
            break
          }
        }
      }

      if (canCreate) {
        const brickData = {
          intersect: { point: e.point, face: e.face },
          uID: uID(),
          dimensions: { x: width, z: depth },
          rotation: rotate ? Math.PI / 2 : 0,
          color: color,
          texture: texture,
          translation: { x: anchorX, z: anchorZ },
        }

        // setBricks((prevBricks) => [...prevBricks, brickData])
        // setBricks((prevBricks) => [...prevBricks, brickData])
        addBlocks(brickData)
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

  const isDrag = useRef(false)
  const timeoutID = useRef(null)

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
      <color attach='background' args={['#202025']} />
      <Select box multiple>
        {blockCurrent?.length > 0 &&
          blockCurrent.map((b, i) => {
            const { dimensions, rotation, intersect } = b
            const height = 1
            const position = () => {
              const evenWidth = rotation === 0 ? dimensions.x % 2 === 0 : dimensions.z % 2 === 0
              const evenDepth = rotation === 0 ? dimensions.z % 2 === 0 : dimensions.x % 2 === 0
              return new Vector3()
                .copy(intersect.point)
                .add(intersect.face.normal)
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
                position={position()}
              />
            )
          })}
        {/* <DeleteBrick setBricks={setBricks} /> */}
        {/* <BrickOutline /> */}
        {/* <ChangeColor color={color} setBricks={setBricks} /> */}
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
