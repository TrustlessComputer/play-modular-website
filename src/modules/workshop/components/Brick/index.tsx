'use client'

import React from 'react'
import { Vector3, Box3, TextureLoader, Matrix4 } from 'three'
import { motion } from 'framer-motion-3d'
import { useLoader } from '@react-three/fiber'
import { base, createGeometry, getMeasurementsFromDimensions, uID as generateUId, EDIT_MODE } from '@/utils'
import { TBlockAnimation, TBlockData } from '@/types'
import { NONT_TEXTURE } from '@/constant/trait-data'
import { Decal, Outlines, PivotControls } from '@react-three/drei'
import { useStoreGlobal } from '@/stores/blocks'

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
  translation = { x: 0, z: 0 },
  bricksBoundBox = { current: [] },
  uID = '',
  isSelected = false,
  disabledAnim = false,
  onClick = (e: any) => {},
  mouseMove = (e: any) => {},
}: TBrickAction & TBlockData & TBlockAnimation) => {
  const { setIsDragging, mode, blockCurrent, setBlockCurrent, selectedBricks } = useStoreGlobal()
  const [resetKey, setResetKey] = React.useState(generateUId())
  const brickRef = React.useRef(null)
  const texturez = useLoader(TextureLoader, texture)
  const isNontTexture = texture === NONT_TEXTURE
  const compansate = {
    x: dimensions.x % 2 === 0 ? dimensions.x / 2 : (dimensions.x - 1) / 2,
    z: dimensions.z % 2 === 0 ? dimensions.z / 2 : (dimensions.z - 1) / 2,
  }
  const isSelected2 = selectedBricks.find((brick) => brick.userData.uID === uID) ? true : false

  const offset = {
    x: Math.sign(translation.x) < 0 ? Math.max(translation.x, -compansate.x) : Math.min(translation.x, compansate.x),
    z: Math.sign(translation.z) < 0 ? Math.max(translation.z, -compansate.z) : Math.min(translation.z, compansate.z),
  }

  const [position, setPosition] = React.useState<Vector3 | null>(null)
  const [prevL, setPrevL] = React.useState(new Vector3(0, 0, 0))
  const [draggedOffset, setDraggedOffset] = React.useState({ x: 0, z: 0 })

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
      z: draggedOffset.z + Math.round(prevL.z / base) * base,
    }

    setDraggedOffset(newOffset)
    setResetKey(generateUId())
    setIsDragging(false)

    const blockCurrentClone = [...blockCurrent]
    for (let i = 0; i < blockCurrentClone.length; i++) {
      const element = blockCurrentClone[i]
      if (element.uID === uID) {
        blockCurrentClone[i].translation = {
          x: newOffset.x / base,
          z: newOffset.z / base,
        }
      }
    }

    setBlockCurrent(blockCurrentClone)
  }
  React.useEffect(() => {
    if (!brickRef.current) return
    if (!uID) return
    if (!bricksBoundBox.current) return
    if (!position) return

    let brickBoundingBox
    const timeoutID = setTimeout(() => {
      brickBoundingBox = new Box3().setFromObject(brickRef.current)

      bricksBoundBox.current.push({ uID, brickBoundingBox })
    }, 1)

    return () => {
      const newA = []
      for (let i = 0; i < bricksBoundBox.current.length; i++) {
        const element = bricksBoundBox.current[i]
        if (element.uID !== uID) {
          newA.push(element)
        }
      }
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

  return (
    <>
      {position && (
        <motion.group
          ref={brickRef}
          rotation={[0, 0, 0]}
          position={[position.x + translation.x * base, Math.abs(position.y), position.z + translation.z * base]}
          initial={{ opacity: 0, scale: disabledAnim ? 1 : 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          // transition={disabledAnim ? null : { type: 'spring', stiffness: 10000, duration: 0.01 }}
          userData={{
            uID,
          }}
        >
          <PivotControls
            key={resetKey}
            scale={base * dimensions.x + 5}
            activeAxes={[true, false, true]}
            disableAxes={isSelected && mode === EDIT_MODE ? false : true}
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
              <Outlines visible={isSelected2 && mode === EDIT_MODE} scale={1.01} />
              <meshPhysicalMaterial color={color} metalness={0} roughness={1} specularIntensity={0} />
              {!isNontTexture && (
                <Decal
                  map={texturez}
                  position={[0, 0, brickGeometry.length > 1 ? 0.05 : 0.05]}
                  rotation={[0, 0, 0]}
                  scale={[
                    brickGeometry.length > 1 ? base * 2.5 : base * 2.5,
                    (base * 2) / 1.5,
                    brickGeometry.length > 1 ? base * 2 : base,
                  ]}
                >
                  <meshPhysicalMaterial
                    map={texturez}
                    transparent={true}
                    metalness={0}
                    roughness={1}
                    specularIntensity={0}
                    polygonOffset
                    polygonOffsetFactor={-1} // The material should take precedence over the original
                  />
                </Decal>
              )}
            </mesh>
          </PivotControls>
        </motion.group>
      )}
    </>
  )
}
