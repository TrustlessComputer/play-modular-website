import React from 'react'

export const Lights = () => {
  return (
    <>
      <hemisphereLight intensity={0.1} />
      <directionalLight position={[0, 30, 0]} intensity={10} castShadow receiveShadow />
      <directionalLight position={[0, 0, 30]} intensity={7} castShadow receiveShadow />
      <directionalLight position={[30, 0, 0]} intensity={2} castShadow receiveShadow />
    </>
  )
}
