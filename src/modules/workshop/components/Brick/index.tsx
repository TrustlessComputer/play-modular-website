import React, { useMemo, useEffect, useRef } from 'react'
import { Vector3, Box3, TextureLoader } from 'three'
import { motion } from 'framer-motion-3d'
import { useLoader } from '@react-three/fiber'
import { base, createGeometry, getMeasurementsFromDimensions } from '@/utils'
import { TBlockData } from '@/types'
import { Decal, Outlines } from '@react-three/drei'
import { Select } from '../Select'
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
  onClick = (e: any) => {},
  mouseMove = (e: any) => {},
}: TBrickAction & TBlockData) => {
  const brickRef = useRef()
  const texturez = useLoader(TextureLoader, texture)
  const props = {
    ...(texturez && { map: texturez }),
    ...(color && { color: color }),
  }

  const { height, width, depth } = getMeasurementsFromDimensions(dimensions)

  const brickGeometry = useMemo(() => {
    return createGeometry({ width, height, depth, dimensions })
  }, [width, height, depth, dimensions])

  const position = useMemo(() => {
    const evenWidth = rotation === 0 ? dimensions.x % 2 === 0 : dimensions.z % 2 === 0
    const evenDepth = rotation === 0 ? dimensions.z % 2 === 0 : dimensions.x % 2 === 0

    const vec3 = new Vector3()
      .copy(intersect.point)
      .add(intersect.face.normal)
      .divide(new Vector3(base, height, base))
      .floor()
      .multiply(new Vector3(base, height, base))
      .add(new Vector3(evenWidth ? base : base / 2, height / 2, evenDepth ? base : base / 2))

    return vec3
  }, [intersect, dimensions.x, dimensions.z, height, rotation])

  useEffect(() => {
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
  }, [uID, bricksBoundBox])

  const compansate = {
    x: dimensions.x % 2 === 0 ? dimensions.x / 2 : (dimensions.x - 1) / 2,
    z: dimensions.z % 2 === 0 ? dimensions.z / 2 : (dimensions.z - 1) / 2,
  }

  const offset = {
    x: Math.sign(translation.x) < 0 ? Math.max(translation.x, -compansate.x) : Math.min(translation.x, compansate.x),
    z: Math.sign(translation.z) < 0 ? Math.max(translation.z, -compansate.z) : Math.min(translation.z, compansate.z),
  }

  return (
    <>
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
                <meshPhysicalMaterial color={color} roughness={1}  metalness={0} polygonOffset/>
                {/*<Outlines angle={0} thickness={1} color={isSelected ? 'white' : 'black'} />*/}
                <Decal
                  map={texturez}
                  position={[0, 0, 0.05]}
                  // position={[0, 0, brickGeometry.length > 1 ? 0.05 : 0.05]}
                  rotation={[0, 0, 0]}
                  scale={[
                    brickGeometry.length > 1 ? base * 2.3 : base * 2.3,
                    (base * 2.3) / 1.5,
                    brickGeometry.length > 1 ? base * 2.3 : base * 2.3,
                  ]}
                >
                  <meshPhysicalMaterial
                    map={texturez}
                    metalness={0.5}
                    roughness={1}
                    polygonOffset
                    polygonOffsetFactor={-1} // The material should take precedence over the original
                  />
                </Decal>
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

                {/*<Decal*/}
                {/*  map={texturez}*/}
                {/*  debug*/}
                {/*  position={[(offset.x * width) / dimensions.x, 0, (offset.z * depth) / dimensions.z]}*/}
                {/*  rotation={[0, 0, 0]}*/}
                {/*  scale={[*/}
                {/*    brickGeometry.length > 1 ? 7 * 2 : 7 * 2,*/}
                {/*    (7 * 2) / 1.5,*/}
                {/*    brickGeometry.length > 1 ? 7 * 2 : 7 * 2,*/}
                {/*  ]}*/}
                {/*>*/}
                {/*</Decal>*/}
                <meshPhysicalMaterial map={texturez} color={color} roughness={1} metalness={0} polygonOffset />

                {/*<Outlines angle={0} thickness={1} color={isSelected ? 'white' : 'black'} />*/}
              </mesh>
            </group>
          ))}
        </Select>
      </motion.group>
    </>
  )
}
