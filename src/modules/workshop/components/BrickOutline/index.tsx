'use client'

import { useStoreGlobal } from '@/stores/blocks'
import { createGeometry, getMeasurementsFromDimensions, knobSize, outlineWidth } from '@/utils'
import React, { useMemo } from 'react'
import { BackSide, InstancedMesh, Object3D } from 'three'

const dummy = new Object3D()

const OutlineMesh = ({ meshesData }) => {
  const ref = React.useRef<InstancedMesh | null>(null)

  const dimensions = meshesData[0]?.dimensions

  const { height, width, depth } = dimensions
    ? getMeasurementsFromDimensions(dimensions)
    : {
        height: 0,
        width: 0,
        depth: 0,
      }

  const outlineGeometry = React.useMemo(() => {
    return createGeometry({
      width: width + outlineWidth * 2,
      height: height + outlineWidth * 2,
      depth: depth + outlineWidth * 2,
      dimensions,
      knobDim: knobSize,
    })
  }, [width, height, depth, dimensions]) as any

  React.useLayoutEffect(() => {
    if (!ref.current) return

    meshesData.forEach((meshData, i) => {
      const compansate = {
        x: dimensions.x % 2 === 0 ? dimensions.x / 2 : (dimensions.x - 1) / 2,
        z: dimensions.z % 2 === 0 ? dimensions.z / 2 : (dimensions.z - 1) / 2,
      }

      const translation = meshData.translation

      const offset = {
        x:
          Math.sign(translation.x) < 0 ? Math.max(translation.x, -compansate.x) : Math.min(translation.x, compansate.x),
        z:
          Math.sign(translation.z) < 0 ? Math.max(translation.z, -compansate.z) : Math.min(translation.z, compansate.z),
      }

      dummy.rotation.set(0, meshData.rotation, 0)
      dummy.position.set(
        meshData.position.x + (offset.x * width) / dimensions.x,
        Math.abs(meshData.position.y),
        meshData.position.z + (offset.z * width) / dimensions.z,
      )
      dummy.updateMatrix()
      ref.current.setMatrixAt(i, dummy.matrix)
    })
    ref.current.instanceMatrix.needsUpdate = true
  }, [meshesData])

  return (
    <>
      <instancedMesh
        ref={ref}
        position={[0, 0, 0]}
        args={[outlineGeometry, null, meshesData.length]}
        raycast={() => {}}
      >
        <meshBasicMaterial color={'white'} side={BackSide} />
      </instancedMesh>
    </>
  )
}

const BrickOutline = () => {
  const selected = useStoreGlobal((state) => state.selectedBricks).map((sel) => sel.userData)

  const selectedMeshes = useMemo(() => {
    const meshesAccrodingToType = {}

    for (let i = 0; i < selected.length; i++) {
      const currentSelected = selected[i]
      if (Object.keys(currentSelected).length > 0) {
        meshesAccrodingToType[currentSelected.type] = meshesAccrodingToType[currentSelected.type]
          ? [...meshesAccrodingToType[currentSelected.type], currentSelected]
          : [currentSelected]
      }
    }

    return meshesAccrodingToType
  }, [selected])

  return (
    <>
      {Object.entries(selectedMeshes).map(([key, value]) => (
        <OutlineMesh key={key} meshesData={value} />
      ))}
    </>
  )
}

export default BrickOutline
