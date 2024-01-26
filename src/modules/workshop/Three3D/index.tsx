'use client'

import React, { Suspense } from 'react'
import { ControlsWrapper } from '../components/Control'
import { Scene } from '../components/Scene'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment, MeshReflectorMaterial, OrthographicCamera } from '@react-three/drei'
import { minWorkSpaceSize } from '@/utils'

const IsometricCamera = () => {
  const { camera } = useThree() as any

  React.useEffect(() => {
    const wrapperDom = document.querySelector('.styles_workshop_main__CrQRd') // TODO: Pass ref to

    // const aspect = 1.5
    const aspect = wrapperDom.clientWidth / wrapperDom.clientHeight
    camera.position.x = 500
    camera.position.y = 500
    camera.position.z = 500
    const frustumSize = 500

    const left = -aspect * frustumSize
    const right = aspect * frustumSize
    const top = frustumSize
    const bottom = -frustumSize

    camera.top = top
    camera.bottom = bottom
    camera.left = left
    camera.right = right

    camera.near = 0.1
    camera.far = 10000
    camera.updateProjectionMatrix()
    camera.lookAt(0, 0, 0)
  }, [camera])

  return <OrthographicCamera makeDefault />
}

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
      dpr={Math.min(2, aspect)}
      shadows
      linear
      // camera={{
      //   position: [3000, 2500, 3000],
      //   near: 0.1,
      //   far: 10000,
      //   fov: 10,
      // }}
    >
      <color attach='background' args={['#202025']} />
      <Environment preset='city' />
      <IsometricCamera />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <ControlsWrapper />
    </Canvas>
  )
}
