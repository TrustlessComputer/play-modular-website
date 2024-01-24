import { createGeometry, getMeasurementsFromDimensions, knobSize, outlineWidth } from '@/utils'
import React from 'react'
import { BackSide, InstancedMesh, Object3D } from 'three'

const dummy = new Object3D()

const BrickOutline = ({ meshesData }) => {
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
      knobDim: knobSize + outlineWidth,
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
        position={[0, 0.5, 0]}
        args={[outlineGeometry, null, meshesData.length]}
        raycast={() => {}}
      >
        <meshBasicMaterial color={'white'} side={BackSide} />
      </instancedMesh>
    </>
  )
}

export default BrickOutline
