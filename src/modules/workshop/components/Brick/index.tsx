'use client'

import { NONT_TEXTURE } from '@/constant/trait-data'
import '../../../../utils/preloadTexture'
import { useStoreGlobal } from '@/stores/blocks'
import { TBlockAnimation, TBlockData } from '@/types'
import {
  EDIT_MODE,
  base,
  createGeometry,
  uID as generateUId,
  getMeasurementsFromDimensions,
  heightBase
} from '@/utils'
import { Decal, Outlines, PivotControls, useTexture, RenderTexture } from '@react-three/drei'
import { motion } from 'framer-motion-3d'
import React, { useEffect, useMemo, useState } from 'react'
import { Box3, Matrix4, Vector3, DoubleSide, FrontSide, BackSide } from 'three'

type TBrickAction = {
  onClick?: (e: any) => void
  mouseMove?: (e: any) => void
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

  const { height, width, depth } = getMeasurementsFromDimensions(dimensions)

  const brickGeometry = React.useMemo(() => {
    return createGeometry({ width, height, depth, dimensions }) as any
  }, [width, height, depth, dimensions])

  const onDrag = (l: Matrix4) => {
    const newL = new Vector3(l.elements[12], l.elements[13], l.elements[14])
    setPrevL(newL)
  }

  const onDragEnd = () => {
    // Make prevL awalys diveded by base to set the draggedOffset
    const newOffset = {
      x: draggedOffset.x + Math.round(prevL.x / base) * base,
      y: draggedOffset.y + Math.round(prevL.y / heightBase) * heightBase,
      z: draggedOffset.z + Math.round(prevL.z / base) * base,
    }

    const blockCurrentClone = [...blockCurrent]
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

    setDraggedOffset(newOffset)
    setResetKey(generateUId())
    setIsDragging(false)
    setPositionBricks(blockCurrentClone)
  }

  React.useEffect(() => {
    if (!brickRef.current) return
    if (!uID) return
    if (!bricksBoundBox.current) return
    if (!position) return

    let brickBoundingBox
    const timeoutID = setTimeout(() => {
      brickBoundingBox = new Box3().setFromObject(brickRef.current)
      console.log('brickBoundingBox', brickBoundingBox)
      bricksBoundBox.current[uID] = { uID, brickBoundingBox }
    }, 300)

    return () => {
      const newA = {}
      Object.keys(bricksBoundBox.current).forEach((key) => {
        if (key !== uID) {
          newA[key] = bricksBoundBox.current[key]
        }
      })
      bricksBoundBox.current = newA
      clearTimeout(timeoutID)
    }
  }, [uID, bricksBoundBox, position])

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
        <motion.group
          rotation={[0, 0, 0]}
          initial={{ opacity: 0, scale: disabledAnim ? 1 : 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          ref={brickRef}
          position={[
            position.x + translation.x * base,
            Math.abs(position.y) + translation.y * heightBase,
            position.z + translation.z * base,
          ]}
          transition={{ type: 'spring', duration: 0.25 }}
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
                  scale={[
                    base * 3,
                    heightBase,
                    5,
                  ]}
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
                  <meshStandardMaterial map={texturez} polygonOffset roughness={1} metalness={0.35} color={'#fff'}
                                        emissive={'#000'} alphaHash={true} transparent alphaTest={0} />
                </Decal>
              )}
            </mesh>
          </PivotControls>
        </motion.group>
      )}
    </>
  )
}
