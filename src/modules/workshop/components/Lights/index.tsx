import React from 'react'

export const Lights = () => {
  return (
    <>
      {/* <hemisphereLight intensity={0.1} /> */}
      <directionalLight position={[0, 30, 0]} intensity={15} castShadow receiveShadow />
      <directionalLight position={[0, 0, 30]} intensity={5} castShadow receiveShadow />
      <directionalLight position={[30, 0, 0]} intensity={2} castShadow receiveShadow />
    </>
  )
}
