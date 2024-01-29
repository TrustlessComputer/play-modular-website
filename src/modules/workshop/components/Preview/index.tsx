'use client'

import { useStoreGlobal } from '@/stores/blocks'
import { viewMapToPosition, views } from '@/utils'
import { Canvas, useThree } from '@react-three/fiber'
import React from 'react'
import { Lights } from '../Lights'
import PreviewScene from './PreviewSence'
import { BrightnessContrast, EffectComposer, HueSaturation } from '@react-three/postprocessing'

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
    camera.updateProjectionMatrix()
    camera.lookAt(0, 0, 0)
  }, [camera, view])

  return <orthographicCamera />
}

const PreviewRoom = () => {
  const [aspect, setAspect] = React.useState(1)

  React.useEffect(() => {
    const wrapperDom = document.querySelector('.styles_workshop_preview__cFkSM') // TODO: Pass ref to

    const resize = () => {
      setAspect(wrapperDom.clientWidth / wrapperDom.clientHeight)
    }
    const saveToPng = (e) => {
      if (e.ctrlKey && e.key === 's') {
        ;(wrapperDom as HTMLElement).style.display = 'block'
        const canvas = wrapperDom.querySelector('canvas')
        const image = canvas.toDataURL('image/png')
        const a = document.createElement('a')
        a.href = image
        a.download = 'project-xxxx.png'
        a.click()
        a.remove()
        ;(wrapperDom as HTMLElement).style.display = 'none'
      }
    }

    resize()

    window.addEventListener('keydown', saveToPng)
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('keydown', saveToPng)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <Canvas
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: true,
      }}
      shadows={true}
      dpr={Math.min(2, aspect)}
      linear
    >
      {/* <color attach='background' args={['#000325']} /> */}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[50000, 50000]} />
        <meshPhysicalMaterial color='#cacaca' roughness={0.4} metalness={0.7} />
      </mesh>

      <EffectComposer multisampling={0}>
        <BrightnessContrast contrast={-0.4} />
        <HueSaturation saturation={0.1} />
      </EffectComposer>

      <CameraController />
      <Lights />
      <PreviewScene />
    </Canvas>
  )
}

export default PreviewRoom
