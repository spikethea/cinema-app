import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import scene from 'assets/models/movietheatre.glb'
import placeholder from 'assets/images/placeholder.png'

function Scene(props: any) {
    const gltf = useLoader(GLTFLoader, scene);

    return (
        <group {...props}>
            <Canvas>
                <ambientLight intensity={Math.PI / 2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                <mesh castShadow receiveShadow>
                    <primitive object={gltf.scene} /> 
                </mesh>
                <OrbitControls enablePan={false} enableZoom={false}/>
            </Canvas>
        </group>
    )
}

export default function SuspendedScene() {
    return (
        <Suspense fallback={placeholder}>
            <Scene />
        </Suspense>
    )
}