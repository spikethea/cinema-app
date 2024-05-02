import React, { Suspense } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import scene from 'assets/models/movietheatre.glb'

function Scene(props: any) {
    const gltf = useLoader(GLTFLoader, scene);

    console.log(gltf);

    return (
        <group {...props}>
            <scene>
                <mesh castShadow receiveShadow>
                    <bufferGeometry attach="geometry" {...gltf.scene} />
                    <meshPhongMaterial attach="material" color="black" />
                </mesh>
            </scene>
        </group>
    )
}

export default function SuspendedScene() {
    return (
        <Suspense fallback={null}>
            <Scene />
        </Suspense>
    )
}