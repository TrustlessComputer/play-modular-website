import React, { useMemo, useEffect, useRef, useCallback } from 'react'
import { Vector3, Box3, TextureLoader, Matrix4 } from 'three'
import { motion } from 'framer-motion-3d'
import { useLoader } from '@react-three/fiber'
import { base, createGeometry, getMeasurementsFromDimensions, uID as generateUId } from '@/utils'
import { TBlockData } from '@/types'
import { Decal, Outlines, PivotControls } from '@react-three/drei'
import { Select } from '../Select'

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
  onClick = (e: any) => {},
  mouseMove = (e: any) => {},
}: TBrickAction & TBlockData) => {
  // const { setCreatedBricks } = useStoreGlobal()
  const [resetKey, setResetKey] = React.useState(generateUId())
  const brickRef = useRef(null)
  const texturez = useLoader(TextureLoader, texture)
  const isNontTexture = texture === '/assets/patterns/images/Btc.jpg'
  const compansate = {
    x: dimensions.x % 2 === 0 ? dimensions.x / 2 : (dimensions.x - 1) / 2,
    z: dimensions.z % 2 === 0 ? dimensions.z / 2 : (dimensions.z - 1) / 2,
  }

  const offset = {
    x: Math.sign(translation.x) < 0 ? Math.max(translation.x, -compansate.x) : Math.min(translation.x, compansate.x),
    z: Math.sign(translation.z) < 0 ? Math.max(translation.z, -compansate.z) : Math.min(translation.z, compansate.z),
  }

  const [position, setPosition] = React.useState<Vector3 | null>(null)
  const [prevL, setPrevL] = React.useState(new Vector3(0, 0, 0))
  const [draggedOffset, setDraggedOffset] = React.useState({ x: 0, z: 0 })

  const { height, width, depth } = getMeasurementsFromDimensions(dimensions)

  const brickGeometry = useMemo(() => {
    return createGeometry({ width, height, depth, dimensions })
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
  }

  useEffect(() => {
    if (!brickRef.current) return
    if (!uID) return
    if (!bricksBoundBox.current) return
    if (!position) return

    const brickBoundingBox = new Box3().setFromObject(brickRef.current)

    bricksBoundBox.current.push({ uID, brickBoundingBox })

    return () => {
      const newA = []
      for (let i = 0; i < bricksBoundBox.current.length; i++) {
        const element = bricksBoundBox.current[i]
        if (element.uID !== uID) {
          newA.push(element)
        }
      }
      bricksBoundBox.current = newA
    }
  }, [uID, bricksBoundBox, position])

  useEffect(() => {
    const evenWidth = rotation === 0 ? dimensions.x % 2 === 0 : dimensions.z % 2 === 0
    const evenDepth = rotation === 0 ? dimensions.z % 2 === 0 : dimensions.x % 2 === 0

    const vec3 = new Vector3()
      .copy(intersect.point)
      .add(intersect.face.normal)
      .divide(new Vector3(base, height, base))
      .floor()
      .multiply(new Vector3(base, height, base))
      .add(
        new Vector3(
          (evenWidth ? base : base / 2) + draggedOffset.x,
          height / 2,
          (evenDepth ? base : base / 2) + draggedOffset.z,
        ),
      )

    setPosition(vec3)
  }, [intersect, dimensions.x, dimensions.z, height, rotation, draggedOffset])

  return (
    <>
      {position && (
        <motion.group
          ref={brickRef}
          rotation={[0, rotation, 0]}
          position={[position.x, Math.abs(position.y), position.z]}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 250, duration: 2 }}
          userData={{
            uID,
          }}
        >
          <Select box multiple>
            {/* <PivotControls
            key={resetKey}
            activeAxes={[true, false, true]}
            scale={base + 5}
            disableAxes={true}
            disableRotations
            onDrag={onDrag}
            onDragEnd={onDragEnd}
          > */}
            {brickGeometry.map((geo, i) => (
              <group
                key={i}
                position={[(offset.x * width) / dimensions.x, 0, (offset.z * depth) / dimensions.z]}
                onClick={onClick}
                onPointerMove={mouseMove}
              >
                <mesh
                  castShadow
                  receiveShadow
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
                  geometry={geo.cube}
                >
                  <Outlines angle={0} thickness={1} color={isSelected ? 'white' : 'black'} />
                  {!isNontTexture ? (
                    <>
                      <meshPhysicalMaterial color={color} roughness={0.9} metalness={0.94} />
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
                          metalness={0.94}
                          roughness={0.9}
                          polygonOffset
                          polygonOffsetFactor={-1} // The material should take precedence over the original
                        />
                      </Decal>
                    </>
                  ) : (
                    <meshPhysicalMaterial
                      color={color}
                      polygonOffset
                      polygonOffsetFactor={-1} // The material should take precedence over the original
                    />
                  )}
                </mesh>
                <mesh
                  castShadow
                  receiveShadow
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
                  geometry={geo.cylinder}
                >
                  {!isNontTexture ? (
                    <meshPhysicalMaterial color={color} roughness={0.9}  metalness={0.94}  polygonOffset polygonOffsetFactor={-1}/>
                  ) : (
                    <meshPhysicalMaterial color={color} opacity={1}  />
                  )}
                  <Outlines angle={0} thickness={1} color={isSelected ? 'white' : 'black'} />
                </mesh>
              </group>
            ))}
            {/* </PivotControls> */}
          </Select>
        </motion.group>
      )}
    </>
  )
}
