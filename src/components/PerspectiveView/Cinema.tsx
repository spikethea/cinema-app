import React, { Suspense, useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import {Instance, Instances, useGLTF} from '@react-three/drei';
import seatData from 'data/seat-data.json';

import scene from 'assets/models/cinema_seat.glb'
import placeholder from 'assets/images/placeholder.png'
import { Material, Mesh } from 'three';

const Seat = (props: any) => {
    const gltf = useGLTF(scene);

    return (
                <Instance
                 castShadow 
                 receiveShadow
                 position={[0, 0, props.seatPos* 3]}
                 >
                    <primitive object={gltf.scene} /> 
                </Instance>
    )
}

const SeatsRow = () => {
    const {nodes, materials} = useGLTF(scene);

    const seat = nodes.seat as Mesh;

    useEffect(() => {
        console.log(nodes)
    }, [])

    return (
        <Instances range={1000} material={materials.Material} geometry={seat.geometry}>
            {seatData.seatRows[0].seats.map((props, i) => (
                <Seat key={i} {...props} />
            ))}
        </Instances>
    )
}

export default SeatsRow