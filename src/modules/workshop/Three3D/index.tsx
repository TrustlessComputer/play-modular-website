import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ControlsWrapper } from '../components/Control'
import { Scene } from '../components/Sence'

export default function Three3D() {
  return (
    <Canvas
      gl={{
        alpha: false,
        antialias: true,
        powerPreference: 'high-performance',
        // toneMapping: LinearToneMapping,
      }}
      camera={{
        position: [17.43, 657.76, 943.51],
        near: 0.1,
        far: 20000,
      }}
      // colormanagement={''}
      shadows={true}
      dpr={Math.min(2, window.devicePixelRatio)}
      linear
    >
      <Suspense fallback={null}>
        <Scene />
        <ControlsWrapper />
      </Suspense>
    </Canvas>
  )
}
