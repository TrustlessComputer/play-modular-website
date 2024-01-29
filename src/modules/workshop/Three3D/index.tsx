'use client'

import React, { Suspense } from 'react'
import { ControlsWrapper } from '../components/Control'
import { Scene } from '../components/Scene'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment, MeshReflectorMaterial, OrthographicCamera } from '@react-three/drei'
import { minWorkSpaceSize } from '@/utils'

export default function Three3D() {
  const [aspect, setAspect] = React.useState(1)

  React.useEffect(() => {
    const wrapperDom = document.querySelector('.styles_workshop_main__CrQRd') // TODO: Pass ref to

    const resize = () => {
      setAspect(wrapperDom.clientWidth / wrapperDom.clientHeight)
    }

    resize()

    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <Canvas
      gl={{
        alpha: false,
        antialias: true,
      }}
      dpr={Math.min(2, 1)}
      linear
      camera={{
        position: [2900, 2400, 2900],
        near: 10,
        far: 100000,
        fov: 10,
        aspect,
      }}
    >
      {/* <color attach='background' args={['#202025']} /> */}
      {/* <color attach='background' args={['#CACACA']} /> */}
      {/* <color attach='background' args={['#00072d']} /> */}
      <color attach='background' args={['#051650']} />
      {/* <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[minWorkSpaceSize, minWorkSpaceSize]} />
        <MeshReflectorMaterial
          mirror={0.5}
          blur={[25, 25]}
          resolution={720}
          mixBlur={100}
          mixStrength={100}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.6}
          // color='#050505'
          color='#CACACA'
          roughness={0.5}
          metalness={1}
        />
      </mesh> */}
      <Suspense fallback={null}>
        <Environment preset='city' />
        <Scene />
        <ControlsWrapper />
      </Suspense>
    </Canvas>
  )
}
