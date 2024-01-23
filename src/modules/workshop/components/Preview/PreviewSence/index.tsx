import React from 'react'
import { Vector3 } from 'three'
import { Brick } from './Brick'
import { useStoreGlobal } from '../../store/store'
import { base } from '@/utils'

const PreviewScene = () => {
  const { blockCurrent } = useStoreGlobal()

  return (
    <scene>
      {/* <gridHelper args={[minWorkSpaceSize, minWorkSpaceSize / 25]} /> */}

      {/* <EffectComposer autoClear={false}></EffectComposer> */}

      {blockCurrent.map((b, i) => {
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

        return <Brick key={b.uID} {...b} position={position()} />
      })}
    </scene>
  )
}

export default PreviewScene
