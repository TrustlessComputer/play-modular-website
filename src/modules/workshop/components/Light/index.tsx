import React from 'react'

export const Lights = () => {
  return (
    <>
      <hemisphereLight intensity={3.5} />
      <directionalLight position={[0, 30, 0]}></directionalLight>
      <directionalLight position={[0, 0, 30]}></directionalLight>
    </>
  )
}
