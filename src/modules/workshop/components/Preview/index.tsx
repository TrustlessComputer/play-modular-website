'use client'

/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */

import { useStoreGlobal } from '@/stores'
import { viewMapToPosition, views } from '@/utils'
import { Canvas, useThree } from '@react-three/fiber'
import React from 'react'
import { Lights } from '../Lights'
import PreviewScene from './PreviewSence'

const CameraController = () => {
  const { view } = useStoreGlobal()
  const { camera } = useThree() as any

  React.useEffect(() => {
    const wrapperDom = document.querySelector('.styles_workshop_preview__cFkSM') // TODO: Pass ref to
    const position = viewMapToPosition[view]
    camera.position.set(position[0], position[1], position[2])

    if (view === views.Isometric) {
      const aspect = wrapperDom.clientWidth / wrapperDom.clientHeight
      camera.position.x = 500
      camera.position.y = 500
      camera.position.z = 500
      const frustumSize = 5

      const left = -aspect * frustumSize
      const right = aspect * frustumSize
      const top = 1 * frustumSize
      const bottom = -1 * frustumSize

      camera.top = top
      camera.bottom = bottom
      camera.left = left
      camera.right = right
    }

    camera.near = 0.1
    camera.far = 10000
    camera.lookAt(0, 0, 0)
  }, [camera, view])

  return <orthographicCamera />
}

const PreviewRoom = () => {
  const { view } = useStoreGlobal()
  const position = viewMapToPosition[view]

  return (
    <Canvas
      gl={{
        alpha: false,
        antialias: true,
        powerPreference: 'high-performance',
      }}
      shadows={true}
      dpr={Math.min(2, window ? window.devicePixelRatio : 1)}
      linear
    >
      <color attach='background' args={['#000325']} />

      <CameraController />
      <Lights />
      <PreviewScene />
    </Canvas>
  )
}

export default PreviewRoom