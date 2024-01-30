'use client'

import { Canvas } from '@react-three/fiber'
import React, { Suspense } from 'react'
import { Environment } from '@react-three/drei'
import Sence from './Sence';
import { ControlsWrapper } from '@/modules/workshop/components/Control'

type TViewMapProps = {
  brickData: any
  id: any
}

const ViewMap = ({ brickData, id }: TViewMapProps) => {
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
      }}
      style={{ height: '100vh' }}
    >
      <color attach='background' args={['#CACACA']} />
      <Suspense fallback={null}>
        <Environment preset='city' />
        <Sence data={brickData} />
        <ControlsWrapper />
      </Suspense>
    </Canvas>
  )
}

export default ViewMap;
