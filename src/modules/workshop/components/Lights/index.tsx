import React from 'react'

export const Lights = () => {
  return (
    <>
      <directionalLight position={[0, 30, 0]} intensity={3} castShadow />
      <directionalLight position={[0, 0, 30]} intensity={3} castShadow />
      <directionalLight position={[-30, 0, 0]} intensity={3} castShadow />

      <directionalLight position={[0, 0, -30]} intensity={.2} castShadow />
      <directionalLight position={[-30, 0, 0]} intensity={.2} castShadow />
    </>
  )
}
