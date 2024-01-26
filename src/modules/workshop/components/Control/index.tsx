'use client'
import React, { useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export const ControlsWrapper = () => {
  const { setEvents } = useThree()
  const controlRef = useRef<any>()

  const startTimeoutID = useRef<NodeJS.Timeout>()
  const endTimeoutID = useRef<NodeJS.Timeout>()

  const onStart = (e) => {
    // console.log('START CONTROL :::: ', controlRef.current)
    if (startTimeoutID.current) clearTimeout(startTimeoutID.current)
    startTimeoutID.current = setTimeout(() => setEvents({ enabled: false }), 500)
  }

  const onEnd = (e) => {
    // console.log('END CONTROL :::: ', controlRef.current)
    if (endTimeoutID.current) clearTimeout(endTimeoutID.current)
    endTimeoutID.current = setTimeout(() => setEvents({ enabled: true }), 500)
  }

  return <OrbitControls makeDefault onEnd={onEnd} onStart={onStart} ref={controlRef} />
  // return <OrbitControls makeDefault onEnd={onEnd} onStart={onStart} enableRotate={false} />
}
