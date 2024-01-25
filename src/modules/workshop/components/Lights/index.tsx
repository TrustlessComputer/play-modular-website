import React from 'react'

export const Lights = () => {
  return (
    <>
      <hemisphereLight intensity={15} />
      <hemisphereLight intensity={15} color={0xdf901a} />
      <directionalLight position={[0, 30, 0]} intensity={1.2}></directionalLight>
      <directionalLight position={[30, -5, 0]} intensity={2}></directionalLight>
      <directionalLight position={[0, 0, 30]} intensity={1.2}></directionalLight>
      <directionalLight position={[-30, 0, 0]} intensity={1.2}></directionalLight>
    </>
  )
}
