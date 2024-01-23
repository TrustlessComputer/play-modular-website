/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */

import { Canvas, useThree } from '@react-three/fiber'
import React from 'react'

import { useStore } from '../../store'
import { viewMapToPosition, views } from '../../utils'
import { useStoreGlobal } from '../../store/store'
import { Lights } from './Lights'
import { OrthographicCamera } from '@react-three/drei'
import { previewCanvasConfig } from '../../utils/config'
import PreviewScene from './PreviewScene'

const PreviewRoomLights = () => {
  return (
    <>
      <ambientLight intensity={10} />
      {/* <directionalLight position={[10, 0, 0]} intensity={1.5} />
      <directionalLight position={[0, 10, 0]} intensity={1.5} />
      <directionalLight position={[0, 0, 10]} intensity={1.5} /> */}
    </>
  )
}

const CameraController = () => {
  const { view } = useStoreGlobal()
  const { camera } = useThree()

  React.useEffect(() => {
    const wrapperDom = document.querySelector('.canvas-wrapper')
    const position = viewMapToPosition[view]
    camera.position.set(...position)

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

  return <orthographicCamera makeDefault={true} />
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
        // toneMapping: LinearToneMapping,
      }}
      colormanagement={'true'}
      shadows={true}
      dpr={Math.min(2, window.devicePixelRatio)}
      linear
    >
      <color attach='background' args={['#000325']} />

      <CameraController />
      {/* <PreviewRoomLights /> */}
      <Lights />
      <PreviewScene />
    </Canvas>
  )
}

export default PreviewRoom
