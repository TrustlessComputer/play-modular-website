'use client'

import { Canvas } from '@react-three/fiber'
import React, { Suspense } from 'react'
import { Environment } from '@react-three/drei'
import Sence from './Sence'
import { ControlsWrapper } from '@/modules/workshop/components/Control'

type TViewMapProps = {
  brickData: any
  id: any
}

const ViewMap = ({ brickData, id }: TViewMapProps) => {
  const [aspect, setAspect] = React.useState(1)

  React.useEffect(() => {
    const wrapperDom = document.querySelector('#canvas-3d')

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
        preserveDrawingBuffer: true,
        pixelRatio: Math.min(2, aspect),
      }}
      dpr={Math.min(2, aspect)}
      shadows='basic'
      linear
      camera={{
        position: [2900, 2400, 2900],
        near: 10,
        far: 100000,
        fov: 10,
      }}
      style={{ height: '100vh' }}
      id='canvas-3d'
    >
      <color attach='background' args={['#ffffff']} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[50000, 50000]} />
        <meshPhysicalMaterial color='#cacaca' roughness={1} metalness={0.7} specularIntensity={0} />
      </mesh>
      <Suspense fallback={null}>
        <Environment preset='city' />
        <Sence data={brickData} />
        <ControlsWrapper />
      </Suspense>
    </Canvas>
  )
}

export default ViewMap
