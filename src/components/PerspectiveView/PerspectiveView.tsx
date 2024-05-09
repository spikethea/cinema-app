import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import scene from 'assets/models/movietheatre.glb'
import placeholder from 'assets/images/placeholder.png'
import SeatsRow from './Cinema';

function Scene(props: any) {

    return (
            <Canvas>
                <ambientLight intensity={Math.PI / 2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                <SeatsRow/>
                <OrbitControls enablePan={false} enableZoom={false}/>
            </Canvas>
    )
}

export default function SuspendedScene() {
    return (
        <Suspense fallback={placeholder}>
            <Scene />
        </Suspense>
    )
}