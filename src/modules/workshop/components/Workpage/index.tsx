import { Environment, Lightformer } from '@react-three/drei'

export const Workspace = ({ onClick = (e: any) => {}, mouseMove = (e: any) => {}, workspaceSize }) => {
  const gridSize = workspaceSize / 25

  return (
    <>
      {/* <gridHelper position={[0, 0, 0]} args={[workspaceSize, gridSize, 0xffffff, 0xffffff]} /> */}
      <gridHelper position={[0, 0, 0]} args={[workspaceSize, gridSize, 0xffffff]} />
      {/* <gridHelper position={[0, 0, 0]} args={[workspaceSize, gridSize, 0x000000]} /> */}

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={onClick}
        onPointerMove={(e) => {
          mouseMove(e)
        }}
      >
        <planeGeometry args={[workspaceSize, workspaceSize]} />
        <meshBasicMaterial visible={false} color={'white'} opacity={0.4} transparent />
      </mesh>

      <Environment resolution={256}>
        <group rotation={[-Math.PI / 4, 0, 0]}>
          <Lightformer form='ring' intensity={1} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[2, 100, 1]} />
          <Lightformer form='ring' intensity={1} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[100, 2, 1]} />
          <Lightformer
            form='ring'
            intensity={0.5}
            rotation-y={Math.PI / 2}
            position={[-5, -1, -1]}
            scale={[10, 2, 1]}
          />
          <Lightformer
            form='rect'
            intensity={0.5}
            rotation-y={-Math.PI / 2}
            position={[10, 1, 0]}
            scale={[100, 10, 1]}
          />
        </group>
      </Environment>
    </>
  )
}
