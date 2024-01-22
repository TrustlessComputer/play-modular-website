import React, {useRef, useMemo, useState, useEffect} from 'react';
import {useFrame, useLoader} from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
// import {Instance, Instances} from '@react-three/drei';

const Voxelizer = () => {

    const refInsh = useRef();
    const groupRef = useRef();
    const [voxelsArray, setVoxelsArray] = useState([]);

    const {nodes: whale} = useLoader(GLTFLoader, 'whale.glb');
    const {nodes: lego} = useLoader(GLTFLoader, 'lego.glb');
    const nodes = whale.Geo_Whale;

    const params = {
        modelSize: 15,
        gridSize: .2,
        boxSize: .2,
        boxRoundness: .05,
        showOriginal: false
    }

    useEffect(() => {

        let rayCasterIntersects = null;
        const rayCaster = new THREE.Raycaster();
        const importedScene = nodes;
        const voxels = [];
        const importedMeshes = [];

        // function recreateInstancedMesh(cnt) {
        //
        //     // remove the old mesh and voxels data
        //     voxels = [];
        //     mainScene.remove(instancedMesh);
        //
        //     // re-initiate the voxel array with random colors and positions
        //     for (let i = 0; i < cnt; i++) {
        //         const randomCoordinate = () => {
        //             let v = (Math.random() - .5);
        //             v -= (v % params.gridSize);
        //             return v;
        //         }
        //         voxels.push({
        //             position: new THREE.Vector3(randomCoordinate(), randomCoordinate(), randomCoordinate()),
        //             color: new THREE.Color().setHSL(Math.random(), .8, .8)
        //         })
        //     }
        //
        //     // create a new instanced mesh object
        //     instancedMesh = new THREE.InstancedMesh(voxelGeometry, voxelMaterial, cnt);
        //     instancedMesh.castShadow = true;
        //     instancedMesh.receiveShadow = true;
        //
        //     // assign voxels data to the instanced mesh
        //     for (let i = 0; i < cnt; i++) {
        //         instancedMesh.setColorAt(i, voxels[i].color);
        //         dummy.position.copy(voxels[i].position);
        //         dummy.updateMatrix();
        //         instancedMesh.setMatrixAt(i, dummy.matrix);
        //     }
        //     instancedMesh.instanceMatrix.needsUpdate = true;
        //     instancedMesh.instanceColor.needsUpdate = true;
        //
        //     // add a new mesh to the scene
        //     // mainScene.add(instancedMesh);
        // }
        //
        // function animateVoxels(oldModelIdx, newModelIdx) {
        //
        //     // animate voxels data
        //     for (let i = 0; i < voxels.length; i++) {
        //
        //         gsap.killTweensOf(voxels[i].color);
        //         gsap.killTweensOf(voxels[i].position);
        //
        //         const duration = .6 + .6 * Math.pow(Math.random(), 6);
        //         let targetPos;
        //
        //         // move to new position if we have one;
        //         // otherwise, move to a randomly selected existing position
        //         //
        //         // animate to new color if it's determined
        //         // otherwise, voxel will be just hidden by animation of instancedMesh.count
        //
        //         if (voxelsPerModel[newModelIdx][i]) {
        //             targetPos = voxelsPerModel[newModelIdx][i].position;
        //             gsap.to(voxels[i].color, {
        //                 delay: .7 * Math.random() * duration,
        //                 duration: .05,
        //                 r: voxelsPerModel[newModelIdx][i].color.r,
        //                 g: voxelsPerModel[newModelIdx][i].color.g,
        //                 b: voxelsPerModel[newModelIdx][i].color.b,
        //                 ease: "power1.in",
        //                 onUpdate: () => {
        //                     instancedMesh.setColorAt(i, voxels[i].color);
        //                 }
        //             })
        //         } else {
        //             targetPos = voxelsPerModel[newModelIdx][Math.floor(voxelsPerModel[newModelIdx].length * Math.random())].position;
        //         }
        //
        //         // move to new position if it's determined
        //         gsap.to(voxels[i].position, {
        //             delay: .2 * Math.random(),
        //             duration: duration,
        //             x: targetPos.x,
        //             y: targetPos.y,
        //             z: targetPos.z,
        //             ease: "back.out(3)",
        //             onUpdate: () => {
        //                 dummy.position.copy(voxels[i].position);
        //                 dummy.updateMatrix();
        //                 instancedMesh.setMatrixAt(i, dummy.matrix);
        //             }
        //         });
        //     }
        //
        //     // increase the model rotation during transition
        //     gsap.to(instancedMesh.rotation, {
        //         duration: 1.2,
        //         y: "+=" + 1.3 * Math.PI,
        //         ease: "power2.out"
        //     })
        //
        //     // show the right number of voxels
        //     gsap.to(instancedMesh, {
        //         duration: .4,
        //         count: voxelsPerModel[newModelIdx].length
        //     })
        //
        //     // update the instanced mesh accordingly to voxels data
        //     // (no need to call it per each voxel)
        //     gsap.to({}, {
        //         duration: 1.5, // max transition duration
        //         onUpdate: () => {
        //             instancedMesh.instanceColor.needsUpdate = true;
        //             instancedMesh.instanceMatrix.needsUpdate = true;
        //         }
        //     });
        // }

        function isInsideMesh(pos, dir, mesh) {
            rayCaster.set(pos, dir);
            rayCasterIntersects = rayCaster.intersectObject(mesh, false);
            return rayCasterIntersects.length % 2 === 1;
        }


        importedScene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material.side = THREE.DoubleSide;
                importedMeshes.push(child);
            }
        });

        let boundingBox = new THREE.Box3().setFromObject(importedScene);
        const size = boundingBox.getSize(new THREE.Vector3());
        const scaleFactor = params.modelSize / size.length();
        const center = boundingBox.getCenter(new THREE.Vector3()).multiplyScalar(-scaleFactor);

        importedScene.scale.multiplyScalar(scaleFactor);
        importedScene.position.copy(center);

        boundingBox = new THREE.Box3().setFromObject(importedScene);
        boundingBox.min.z -= .5 * params.gridSize;

        for (let i = boundingBox.min.x; i < boundingBox.max.x; i += params.gridSize) {
            for (let j = boundingBox.min.y; j < boundingBox.max.y; j += params.gridSize) {
                for (let k = boundingBox.min.z; k < boundingBox.max.z; k += params.gridSize) {
                    for (let meshCnt = 0; meshCnt < importedMeshes.length; meshCnt++) {

                        const mesh = importedMeshes[meshCnt];
                        const pos = new THREE.Vector3(i, j, k);
                        const color = new THREE.Color();
                        const {h, s, l} = mesh.material.color.getHSL(color);
                        color.setHSL(h, s * .8, l * .7 + .3);

                        if (isInsideMesh(pos, {x: 0, y: 0, z: 1}, mesh)) {
                            voxels.push({color: color, position: pos});
                            break;
                        }
                    }
                }
            }
        }

        setVoxelsArray(voxels);
    }, [nodes])


    // useFrame(()=>{
    //     refInsh.current.c
    // })

    const Dot = ({position, color}) => {
        return <mesh position={position}>
            <boxGeometry args={[params.gridSize, params.gridSize, params.gridSize]}/>
            <meshBasicMaterial color={color}/>
        </mesh>
    }

    return (
        <group ref={groupRef}>
            {/*<Instances*/}
            {/*    ref={refInsh}*/}
            {/*    geometry={lego.group1822638002.geometry}*/}
            {/*    limit={3056}*/}
            {/*    range={3056}*/}
            {/*>*/}
            {/*    <meshStandardMaterial/>*/}
            {/*    {*/}
            {/*        voxelsArray.map((node) => {*/}
            {/*            return <Instance scale={.5} position={node.position} color={node.color}/>*/}
            {/*        })*/}
            {/*    }*/}
            {/*</Instances>*/}
        </group>
    );
};
export default Voxelizer;
