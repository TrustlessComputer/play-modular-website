'use client'

import React, { Suspense } from 'react'
import { ControlsWrapper } from '../components/Control'
import { Scene } from '../components/Scene'
import { Canvas } from '@react-three/fiber'

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
