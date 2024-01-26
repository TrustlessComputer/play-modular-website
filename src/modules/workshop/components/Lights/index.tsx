import React from 'react'

export const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <hemisphereLight intensity={0.5} />
      <hemisphereLight intensity={0.2} color={0xdf901a} />
      <directionalLight position={[0, 30, 0]} intensity={10} castShadow receiveShadow></directionalLight>
      <directionalLight position={[0, 0, 30]} intensity={5} castShadow receiveShadow></directionalLight>
    </>
  )
}
