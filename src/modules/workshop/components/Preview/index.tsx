'use client'

import { useStoreGlobal } from '@/stores/blocks'
import { viewMapToPosition, views } from '@/utils'
import { Canvas, useThree } from '@react-three/fiber'
import React from 'react'
import { Lights } from '../Lights'
import PreviewScene from './PreviewSence'
import { BrightnessContrast, EffectComposer, HueSaturation } from '@react-three/postprocessing'
import { OrthographicCamera } from '@react-three/drei'
import s from './styles.module.scss'
import { DELAY_SNAPSHOT } from '@/constant/constant'

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
      const frustumSize = 500

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

  return <OrthographicCamera makeDefault />
}

const PreviewRoom = () => {
  // React.useEffect(() => {
  //   const saveToPng = (e) => {
  //     const wrapperDom = document.querySelector('.styles_workshop_preview__cFkSM') // TODO: Pass ref to
  //     if (e.ctrlKey && e.key === 's') {
  //       ; (wrapperDom as HTMLElement).style.display = 'block'
  //         ; (wrapperDom as HTMLElement).style.position = 'fixed'
  //         ; (wrapperDom as HTMLElement).style.top = '0'
  //         ; (wrapperDom as HTMLElement).style.left = '0'
  //         ; (wrapperDom as HTMLElement).style.right = '0'
  //         ; (wrapperDom as HTMLElement).style.bottom = '0'

  //       const canvas = wrapperDom.querySelector('canvas')
  //       canvas.classList.add(s.saveMove)

  //       setTimeout(() => {
  //         const image = canvas.toDataURL('image/png')
  //         const a = document.createElement('a')
  //         a.href = image
  //         a.download = 'project-xxxx.png'
  //         a.click()
  //         a.remove()

  //         canvas.classList.remove(s.saveMove)
  //           ; (wrapperDom as HTMLElement).style.display = 'none'
  //       }, 500)
  //     }
  //   }

  //   window.addEventListener('keydown', saveToPng)
  //   return () => {
  //     window.removeEventListener('keydown', saveToPng)
  //   }
  // }, [])

  return (
    //   <Canvas
    //     gl={{
    //       alpha: false,
    //       antialias: true,
    //       preserveDrawingBuffer: true,
    //       powerPreference: 'high-performance',
    //     }}
    //     shadows='basic'
    //     dpr={Math.min(2, 1)}
    //     linear
    //     camera={{
    //       position: [2900, 2400, 2900],
    //       near: 10,
    //       far: 100000,
    //       fov: 10,
    //     }}
    //   >
    //     {/* <color attach='background' args={['#ffffff']} /> */}

    //     <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
    //       <planeGeometry args={[50000, 50000]} />
    //       <meshPhysicalMaterial color='#cacaca' roughness={1} metalness={0.7} specularIntensity={0} />
    //     </mesh>

    //     <EffectComposer multisampling={0}>
    //       <BrightnessContrast contrast={-0.4} />
    //       <HueSaturation saturation={0.1} />
    //     </EffectComposer>

    //     <CameraController />
    //     <Lights />
    //     <PreviewScene />
    //   </Canvas>
    <></>
  )
}

export default PreviewRoom
