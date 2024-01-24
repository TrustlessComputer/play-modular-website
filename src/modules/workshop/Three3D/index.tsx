'use client'

import React, { Suspense } from 'react'
import { ControlsWrapper } from '../components/Control'
import { Scene } from '../components/Scene'
import { Canvas } from '@react-three/fiber'

export default function Three3D() {
  return (
    <Canvas
      gl={{
        alpha: false,
        antialias: true,
        powerPreference: 'high-performance',
      }}
      camera={{
        position: [0, 600, 900],
        near: 0.1,
        far: 20000,
      }}
      shadows={true}
      dpr={Math.min(2, window ? window.devicePixelRatio : 1)}
      linear
    >
      <Suspense fallback={null}>
        <Scene />
        <ControlsWrapper />
      </Suspense>
    </Canvas>
  )
}
