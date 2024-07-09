import React, { Suspense, useEffect } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import { Perf } from 'r3f-perf';
import placeholder from 'assets/images/placeholder.png'
import Cinema from './Cinema';

import { MovieSceneProps } from 'types';

function Scene(props: MovieSceneProps) {


    return (
            <Canvas>
                {/* <Perf /> */}
                <ambientLight intensity={Math.PI / 2} />
                <pointLight position={[10, -10, -10]} decay={0} intensity={Math.PI} />
                <Cinema {...props}/>
                <OrbitControls enablePan={false} enableZoom={false}/>
            </Canvas>
    )
}

export default function SuspendedScene(props: MovieSceneProps) {
    return (
        <Suspense fallback={placeholder}>
            <Scene {...props} />
        </Suspense>
    )
}