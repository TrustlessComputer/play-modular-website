'use client'

import { NONT_TEXTURE } from '@/constant/trait-data'
import '../../../../utils/preloadTexture'
import { useStoreGlobal } from '@/stores/blocks'
import { TBlockAnimation, TBlockData } from '@/types'
import {
  EDIT_MODE,
  base,
  checkCollision,
  createGeometry,
  uID as generateUId,
  getMeasurementsFromDimensions,
  heightBase,
} from '@/utils'
import { Decal, Outlines, PivotControls, useTexture } from '@react-three/drei'
import { motion } from 'framer-motion-3d'
import React, { useEffect, useMemo, useState } from 'react'
import { Box3, Matrix4, Vector3, DoubleSide, FrontSide, BackSide } from 'three'
import { proxy } from 'valtio'

type TBrickAction = {
  onClick?: (e: any) => void
  mouseMove?: (e: any) => void
}

const roundToNearestMultiple = (value, multiple) => {
  return Math.round(value / multiple) * multiple
}

export const Brick = ({
  intersect,
  color,
  texture,
  dimensions = { x: 1, z: 1 },
  rotation = 0,
  translation = { x: 0, y: 0, z: 0 },
  bricksBoundBox = { current: {} },
  uID = '',
  isSelected = false,
  disabledAnim = false,
  onClick = (e: any) => {},
  mouseMove = (e: any) => {},
}: TBrickAction & TBlockData & TBlockAnimation) => {
  const { setIsDragging, mode, blockCurrent, selectedBricks, setPositionBricks } = useStoreGlobal()
  const [resetKey, setResetKey] = React.useState(generateUId())
  const brickRef = React.useRef(null)
  const isNontTexture = texture === null || texture === NONT_TEXTURE
  const updateTexture = isNontTexture ? NONT_TEXTURE : texture
  const texturez = useTexture(updateTexture)
  const [opacity, setOpacity] = useState<number>(1)
  const compansate = {
    x: dimensions.x % 2 === 0 ? dimensions.x / 2 : (dimensions.x - 1) / 2,
    z: dimensions.z % 2 === 0 ? dimensions.z / 2 : (dimensions.z - 1) / 2,
  }
  const isSelected2 = useMemo((): boolean => {
    return selectedBricks.find((brick) => brick.userData.uID === uID) ? true : false
  }, [selectedBricks])
  const offset = {
    x: Math.sign(translation.x) < 0 ? Math.max(translation.x, -compansate.x) : Math.min(translation.x, compansate.x),
    z: Math.sign(translation.z) < 0 ? Math.max(translation.z, -compansate.z) : Math.min(translation.z, compansate.z),
  }

  const [position, setPosition] = React.useState<Vector3 | null>(null)
  const [prevL, setPrevL] = React.useState(new Vector3(0, 0, 0))
  const [draggedOffset, setDraggedOffset] = React.useState({ x: 0, y: 0, z: 0 })
  const currentBrickSelected = React.useRef<any>({
    prevOffset: translation,
    boundingBox: null,
    blockCurrentClone: null,
    boundBricks: JSON.parse(JSON.stringify(bricksBoundBox.current)),
  })

  const { height, width, depth } = getMeasurementsFromDimensions(dimensions)

  const brickGeometry = React.useMemo(() => {
    return createGeometry({ width, height, depth, dimensions }) as any
  }, [width, height, depth, dimensions])

  const onDrag = (l: Matrix4) => {
    const newL = new Vector3(l.elements[12], l.elements[13], l.elements[14])
    setPrevL(newL)
  }

  const onDragEnd = () => {
    // const boundingBox = new Box3().setFromObject(brickRef.current)

    // Make prevL awalys diveded by base to set the draggedOffset
    const newOffset = {
      x: draggedOffset.x + Math.round(prevL.x / base) * base,
      y: draggedOffset.y + Math.round(prevL.y / heightBase) * heightBase,
      z: draggedOffset.z + Math.round(prevL.z / base) * base,
    }
    const customBoundingBox = new Box3().setFromObject(brickRef.current)

    customBoundingBox.min.x = roundToNearestMultiple(customBoundingBox.min.x, base)
    customBoundingBox.min.y = roundToNearestMultiple(customBoundingBox.min.y, heightBase)
    customBoundingBox.min.z = roundToNearestMultiple(customBoundingBox.min.z, base)
    customBoundingBox.max.x = roundToNearestMultiple(customBoundingBox.max.x, base)
    customBoundingBox.max.y = roundToNearestMultiple(customBoundingBox.max.y, heightBase)
    customBoundingBox.max.z = roundToNearestMultiple(customBoundingBox.max.z, base)

    const brickBoundBoxClone = JSON.parse(JSON.stringify(bricksBoundBox.current))
    brickBoundBoxClone[uID] = null
    const isNotColliding = checkCollision(
      { uID, brickBoundingBox: customBoundingBox },
      Object.values(brickBoundBoxClone),
    )

    const blockCurrentClone = JSON.parse(JSON.stringify(blockCurrent))

    for (let i = 0; i < blockCurrentClone.length; i++) {
      const element = blockCurrentClone[i]
      if (element.uID === uID) {
        blockCurrentClone[i].translation = {
          x: newOffset.x / base,
          y: newOffset.y / heightBase < 0 ? 0 : newOffset.y / heightBase,
          z: newOffset.z / base,
        }
      }
    }

    if (selectedBricks.length === 1) {
      setDraggedOffset(newOffset)
      setResetKey(generateUId())
      setIsDragging(false)
      if (blockCurrentClone) setPositionBricks(blockCurrentClone)
      brickBoundBoxClone[uID] = { uID, brickBoundingBox: customBoundingBox }
      bricksBoundBox.current = brickBoundBoxClone
    }

    if (!isNotColliding && selectedBricks.length === 0) {
      setResetKey(generateUId())
      if (currentBrickSelected.current.blockCurrentClone)
        setPositionBricks(currentBrickSelected.current.blockCurrentClone)
      setDraggedOffset(currentBrickSelected.current.prevOffset)
      bricksBoundBox.current = currentBrickSelected.current.boundBricks
    }

    if (selectedBricks.length === 1 && isNotColliding) {
      currentBrickSelected.current.prevOffset = newOffset
      currentBrickSelected.current.boundingBox = customBoundingBox
      currentBrickSelected.current.blockCurrentClone = blockCurrentClone
      brickBoundBoxClone[uID] = { uID, brickBoundingBox: customBoundingBox }
      currentBrickSelected.current.boundBricks = brickBoundBoxClone
    }
  }

  React.useEffect(() => {
    if (selectedBricks.length === 0) {
      if (brickRef.current && brickRef.current.userData.uID === uID) onDragEnd()
    } else {
      if (brickRef.current && brickRef.current.userData.uID === uID) {
        const boundingBox = new Box3().setFromObject(brickRef.current)
        boundingBox.min.x = roundToNearestMultiple(boundingBox.min.x, base)
        boundingBox.min.y = roundToNearestMultiple(boundingBox.min.y, heightBase)
        boundingBox.min.z = roundToNearestMultiple(boundingBox.min.z, base)
        boundingBox.max.x = roundToNearestMultiple(boundingBox.max.x, base)
        boundingBox.max.y = roundToNearestMultiple(boundingBox.max.y, heightBase)
        boundingBox.max.z = roundToNearestMultiple(boundingBox.max.z, base)
        currentBrickSelected.current.boundingBox = boundingBox
        currentBrickSelected.current.blockCurrentClone = JSON.parse(JSON.stringify(blockCurrent))
      }
    }
  }, [selectedBricks])

  React.useEffect(() => {
    if (!brickRef.current) return
    if (!uID) return
    if (!bricksBoundBox.current) return
    if (!position) return

    const brickBoundingBox = new Box3().setFromObject(brickRef.current)
    brickBoundingBox.min.x = roundToNearestMultiple(brickBoundingBox.min.x, base)
    brickBoundingBox.min.y = Math.abs(roundToNearestMultiple(brickBoundingBox.min.y, heightBase))
    brickBoundingBox.min.z = roundToNearestMultiple(brickBoundingBox.min.z, base)
    brickBoundingBox.max.x = roundToNearestMultiple(brickBoundingBox.max.x, base)
    brickBoundingBox.max.y = roundToNearestMultiple(brickBoundingBox.max.y, heightBase)
    brickBoundingBox.max.z = roundToNearestMultiple(brickBoundingBox.max.z, base)

    bricksBoundBox.current[uID] = { uID, brickBoundingBox }

    return () => {
      const newA = {}
      Object.keys(bricksBoundBox.current).forEach((key) => {
        if (key !== uID) {
          newA[key] = bricksBoundBox.current[key]
        }
      })
      bricksBoundBox.current = newA
    }
  }, [uID, bricksBoundBox, position, brickRef])

  React.useEffect(() => {
    const evenWidth = rotation === 0 ? dimensions.x % 2 === 0 : dimensions.z % 2 === 0
    const evenDepth = rotation === 0 ? dimensions.z % 2 === 0 : dimensions.x % 2 === 0

    const vec3 = new Vector3()
      .copy(intersect.point)
      .add(intersect.face.normal)
      .divide(new Vector3(base, height, base))
      .floor()
      .multiply(new Vector3(base, height, base))
      .add(new Vector3(evenWidth ? base : base / 2, height / 2, evenDepth ? base : base / 2))

    setPosition(vec3)
  }, [intersect, dimensions.x, dimensions.z, height, rotation, draggedOffset])

  useEffect(() => {
    if (isSelected2) {
      setOpacity(1)
    } else if (selectedBricks.length) {
      setOpacity(0.5)
    } else if (selectedBricks.length === 0) {
      setOpacity(1)
    }
  }, [isSelected2, selectedBricks])

  return (
    <>
      {position && (
        <group
          rotation={[0, 0, 0]}
          ref={brickRef}
          position={[
            position.x + translation.x * base,
            Math.abs(position.y) + translation.y * heightBase,
            position.z + translation.z * base,
          ]}
          userData={{
            uID,
          }}
        >
          <PivotControls
            key={resetKey}
            scale={base * dimensions.x + 5}
            disableAxes={isSelected && mode === EDIT_MODE && selectedBricks.length === 1 ? false : true}
            disableSliders
            disableRotations
            onDragStart={() => setIsDragging(true)}
            onDrag={onDrag}
            onDragEnd={onDragEnd}
          >
            <mesh
              castShadow
              receiveShadow
              rotation={[0, rotation, 0]}
              userData={{
                uID,
                dimensions,
                offset,
                width,
                depth,
                type: `${dimensions.x}-${dimensions.z}`,
                position,
                rotation,
                translation,
              }}
              geometry={brickGeometry}
              onClick={onClick}
              onPointerMove={mouseMove}
            >
              <Outlines visible={isSelected2 && mode === EDIT_MODE} scale={1.025} />
              <meshPhysicalMaterial
                opacity={opacity}
                transparent
                color={color}
                metalness={0}
                roughness={1}
                specularIntensity={0}
              />

              {!isNontTexture && (
                <Decal
                  position={[0, 0, dimensions.x == 2 ? base + 0.005 : 13 + 0.005]}
                  rotation={[0, 0, 0]}
                  scale={[base * 3, heightBase, 5]}
                >
                  {/*<meshPhysicalMaterial*/}
                  {/*  map={texturez}*/}
                  {/*  transparent={true}*/}
                  {/*  metalness={0}*/}
                  {/*  roughness={1}*/}
                  {/*  opacity={opacity}*/}
                  {/*  alphaHash={true}*/}
                  {/*  alphaTest={0}*/}
                  {/*  specularIntensity={0}*/}
                  {/*  polygonOffset*/}
                  {/*  polygonOffsetFactor={-1}*/}
                  {/*/>*/}
                  <meshStandardMaterial
                    map={texturez}
                    polygonOffset
                    roughness={1}
                    metalness={0.35}
                    color={'#fff'}
                    emissive={'#000'}
                    alphaHash={true}
                    transparent
                    alphaTest={0}
                  />
                </Decal>
              )}
            </mesh>
          </PivotControls>
        </group>
      )}
    </>
  )
}
