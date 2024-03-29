'use client'

import React, { Suspense } from 'react'
import { ControlsWrapper } from '../components/Control'
import { Scene } from '../components/Scene'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { base, captureCanvasImage, minWorkSpaceSize } from '@/utils'

const SaveToPng = () => {
  const [isSaving, setIsSaving] = React.useState(false)
  const { camera } = useThree()

  React.useEffect(() => {
    const onHandleCloseDownload = () => {
      //todo jackie
      console.log('____close popup download done')
    }

    const saveToPng = (e) => {
      if (e.ctrlKey && e.key === 's') {
        const prevPosition = camera.position.clone()
        const prevRotation = camera.rotation.clone()
        const prevZoom = camera.zoom

        camera.position.set(2900, 2400, 2900)
        camera.rotation.set(0, 0, 0)
        camera.zoom = 1
        camera.lookAt(0, 0, 0)
        camera.updateProjectionMatrix()
        camera.updateMatrixWorld()
        camera.updateMatrix()

        const { dataURL, canvas } = captureCanvasImage({
          download: true,
        })

        canvas.style.filter = `blur(100px)`
        const img: HTMLImageElement = new Image()
        img.src = dataURL
        img.onload = () => {
          img.remove()
          canvas.style.filter = null
          onHandleCloseDownload()
        }
      }
    }

    window.addEventListener('keydown', saveToPng)

    return () => {
      window.removeEventListener('keydown', saveToPng)
    }
  }, [camera])

  return (
    !isSaving && (
      <gridHelper position={[0, 0, 0]} args={[minWorkSpaceSize, minWorkSpaceSize / base, 0xffffff, 0xffffff]} />
    )
  )
}

export default function Three3D() {
  const [aspect, setAspect] = React.useState(1)

  React.useEffect(() => {
    const wrapperDom = document.querySelector('#canvas-3d') // TODO: Pass ref to

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
      shadows='basic'
      dpr={Math.min(2, aspect)}
      linear
      camera={{
        position: [2900, 2400, 2900],
        near: 10,
        far: 100000,
        fov: 10,
        aspect,
      }}
      id='canvas-3d'
    >
      <SaveToPng />
      <color attach='background' args={['#ffffff']} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[50000, 50000]} />
        <meshPhysicalMaterial color='#cacaca' roughness={1} metalness={0.7} specularIntensity={0} />
      </mesh>
      <Suspense fallback={null}>
        <Environment preset='city' />
        <Scene />
        <ControlsWrapper />
      </Suspense>
    </Canvas>
  )
}
