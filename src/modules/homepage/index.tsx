import {useReducer, useMemo} from 'react'
import {Canvas} from '@react-three/fiber'
import {Environment, Lightformer, OrbitControls, Stars} from '@react-three/drei'
import {Bloom, EffectComposer, N8AO} from '@react-three/postprocessing'
import s from './styles.module.scss';
import Voxelizer from './Voxelizer'

const accents = ['#00ED7B', '#006CEA', '#F7931A']
const shuffle = (accent = 0) => [
  {color: '#141622', roughness: 0.1},
  {color: '#141622', roughness: 0.75},
  {color: '#141622', roughness: 0.75},
  {color: '#141622', roughness: 0.1},
  {color: '#141622', roughness: 0.75},
  {color: '#141622', roughness: 0.1},
  {color: accents[accent], roughness: 0.1, accent: true},
  {color: accents[accent], roughness: 0.75, accent: true},
  {color: accents[accent], roughness: 0.1, accent: true}
]

const logo = [
  {color: '#FEA04A', roughness: 0.05},
  {color: '#006CEA', roughness: 0.05},
  {color: '#00ED7B', roughness: 0.05},
]

export const HomePageModule = () => (
  <div className={s.container}>
    <Scene/>
  </div>
)

function Scene(props) {
  const [accent, click] = useReducer((state) => ++state % accents.length, 0)
  const connectors = useMemo(() => shuffle(accent), [accent])
  return (
    //onClick={click} shadows dpr={[1, 1.5]} gl={{antialias: false}}
    //             camera={{position: [0, 0, 15], fov: 17.5, near: 1, far: 20}}
    <Canvas {...props}>
      <color attach="background" args={['#141622']}/>
      <ambientLight intensity={2}/>
      {/*<fog attach="fog" args={['#141622', 1, 30]}/>*/}
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow/>
      {/*<Stars radius={100} depth={2} count={1000} factor={20}/>*/}
      <OrbitControls />
      <Voxelizer/>

      <EffectComposer disableNormalPass multisampling={8}>
        <N8AO distanceFalloff={1} aoRadius={1} intensity={4}/>
        {/*<Bloom luminanceThreshold={0} mipmapBlur luminanceSmoothing={0.0} intensity={2}/>*/}
      </EffectComposer>
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2}/>
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2}/>
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]}
                       scale={2}/>
          <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8}/>
        </group>
      </Environment>
    </Canvas>
  )
}
