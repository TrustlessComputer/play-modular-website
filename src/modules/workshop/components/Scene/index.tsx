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

const mousePoint = new Vector3()
const normal = new Vector3()
const brickDimensions = new Vector3()
const offsetVec = new Vector3()

export const Scene = () => {
  useAnchorShorcuts()

  const {
    blockCurrent,
    createdBricks,
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
  } = useStoreGlobal()

  const bricksBoundBox = useRef([])
  const brickCursorRef = useRef<Group>()
  const isDrag = useRef(false)
  const timeoutID = useRef(null)
  const isEditMode = mode === EDIT_MODE

  // console.log('BRICKS :::: ', blockCurrent)
  // console.log('CREATED BRICKS :::: ', createdBricks)

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
          type: trait.type,
        }

        if (trait?.color) {
          // console.log('brickData', brickData)

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
    // console.log('blockCurrent', JSON.stringify(blockCurrent))
    // console.log(blockCurrent)
  }, [blockCurrent.length])
  // const DATA = JSON.parse(
  //   '[{"intersect":{"point":{"x":36.35060973790545,"y":-6.28325304189107e-14,"z":282.97256058135156},"face":{"a":2,"b":3,"c":1,"normal":{"x":0,"y":0,"z":1},"materialIndex":0}},"uID":"itPEiXLb","dimensions":{"x":2,"z":2},"rotation":0,"color":"#FF4B51","texture":"/assets/patterns/optimic.svg","translation":{"x":0,"z":0},"type":"1"},{"intersect":{"point":{"x":4.69195503723682,"y":-3.709191490998424e-14,"z":167.04713416706318},"face":{"a":2,"b":3,"c":1,"normal":{"x":0,"y":0,"z":1},"materialIndex":0}},"uID":"VWb3CsBb","dimensions":{"x":2,"z":2},"rotation":0,"color":"#FF4B51","texture":"/assets/patterns/optimic.svg","translation":{"x":0,"z":0},"type":"1"},{"intersect":{"point":{"x":-66.25617572396438,"y":-6.903243484263624e-14,"z":310.8944478337746},"face":{"a":2,"b":3,"c":1,"normal":{"x":0,"y":0,"z":1},"materialIndex":0}},"uID":"HqvDRUAo","dimensions":{"x":2,"z":2},"rotation":0,"color":"#FF4B51","texture":"/assets/patterns/optimic.svg","translation":{"x":0,"z":0},"type":"1"},{"intersect":{"point":{"x":15.968985035130707,"y":-8.053288411965662e-14,"z":362.68786691235687},"face":{"a":2,"b":3,"c":1,"normal":{"x":0,"y":0,"z":1},"materialIndex":0}},"uID":"iegIKObu","dimensions":{"x":2,"z":2},"rotation":0,"color":"#FF4B51","texture":"/assets/patterns/optimic.svg","translation":{"x":0,"z":0},"type":"1"}]',
  // )
  // console.log(DATA)
  return (
    <>
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
      </Select>
      <Lights />
      <Workspace onClick={onClick} mouseMove={mouseMove} workspaceSize={minWorkSpaceSize} />
      {color && (
        <BrickCursor
          ref={brickCursorRef}
          rotation={rotate ? Math.PI / 2 : 0}
          dimensions={{ x: width, z: depth }}
          translation={{ x: anchorX, z: anchorZ }}
        />
      )}
    </>
  )
}
