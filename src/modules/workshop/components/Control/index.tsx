'use client'
import React, { useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useStoreGlobal } from '@/stores/blocks'

export const ControlsWrapper = () => {
  const { isDragging } = useStoreGlobal()
  const { setEvents } = useThree()
  const controlRef = useRef<any>()

  const startTimeoutID = useRef<NodeJS.Timeout>()
  const endTimeoutID = useRef<NodeJS.Timeout>()

  const onStart = (e) => {
    if (startTimeoutID.current) clearTimeout(startTimeoutID.current)
    startTimeoutID.current = setTimeout(() => setEvents({ enabled: false }), 500)
  }

  const onEnd = (e) => {
    if (endTimeoutID.current) clearTimeout(endTimeoutID.current)
    endTimeoutID.current = setTimeout(() => setEvents({ enabled: true }), 500)
  }

  return <OrbitControls enabled={!isDragging} makeDefault onEnd={onEnd} onStart={onStart} />
}
