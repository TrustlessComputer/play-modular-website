'use client'

import React, { Suspense } from 'react'
import { ControlsWrapper } from '../components/Control'
import { Scene } from '../components/Scene'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { minWorkSpaceSize } from '@/utils'
import { EffectComposer, BrightnessContrast, HueSaturation } from '@react-three/postprocessing'

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
      {/* <color attach='background' args={['#001c57']} /> */}
      <color attach='background' args={['#ffffff']} />
      {/* <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[minWorkSpaceSize, minWorkSpaceSize]} />
        <MeshReflectorMaterial
          mirror={0.2}
          blur={[25, 25]}
          resolution={512}
          mixBlur={100}
          mixStrength={20}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.6}
          color='#001c57'
          roughness={0.4}
          metalness={0.8}
        />
      </mesh> */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[50000, 50000]} />
        <meshPhysicalMaterial color='#cacaca' roughness={0.4} metalness={0.7} />
      </mesh>
      <Suspense fallback={null}>
        <Environment preset='city' />
        <Scene />
        <ControlsWrapper />
        <EffectComposer multisampling={0}>
          <BrightnessContrast contrast={-0.4} />
          <HueSaturation saturation={0.1} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}
