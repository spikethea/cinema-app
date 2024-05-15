import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import {Instance, Instances, useGLTF} from '@react-three/drei';
import seatData from 'data/seat-data.json';

import scene from 'assets/models/cinema_seat.glb'
import placeholder from 'assets/images/placeholder.png'
import * as THREE from 'three';
import { UUID } from 'crypto';

const Seat = (props: any) => {
    const gltf = useGLTF(scene);
    const seatRef = useRef(null);
    

    const turnSeatRed = () => {
        if (!seatRef.current) return;

        const seatGroup = seatRef.current as THREE.Group;

        seatGroup.traverse((child)=> {
            if ( child.name === 'seat' ) {
                const seat = child as THREE.Mesh;
                const material = seat.material as THREE.MeshBasicMaterial;
                console.log(seat)
                material.color = new THREE.Color(0xFF0000);
            }
        })
    }

    const turnSeatYellow = () => {
        if (!seatRef.current) return;

        const seatGroup = seatRef.current as THREE.Group;

        seatGroup.traverse((child)=> {
            if ( child.name === 'seat' ) {
                const seat = child as THREE.Mesh;
                const material = seat.material as THREE.MeshBasicMaterial;
                console.log(seat)
                material.color = new THREE.Color(0xFFFF00);
            }
        })
    }

    return (
                <Instance
                 castShadow 
                 receiveShadow
                 position={[0, 0, props.seatPos* 3]}
                 onPointerEnter={turnSeatYellow}
                 onPointerLeave={turnSeatRed}
                 >
                    <primitive ref={seatRef} object={gltf.scene} /> 
                </Instance>
    )
}

const SeatsRow = ({elevation}: {elevation: number, key: number}) => {
    const {nodes, materials} = useGLTF(scene);

    const seat = nodes.seat as THREE.Mesh;

    return (
        <Instances position-x={-elevation*4} position-y={elevation*3} range={1000} material={materials.Material} geometry={seat.geometry}>
            {seatData.seatRows[0].seats.map((props, i) => (
                <Seat key={i} {...props} />
            ))}
        </Instances>
    )
}

const Cinema = () => {
    const { camera } = useThree();

    useEffect(()=> {
        camera.position.x = 15;
        console.log('update')
    }, [camera.position])


    return (
        <group position-z={-10}>
            {
                seatData.seatRows.map((props, i) => (
                    <SeatsRow elevation={props.elevation} key={i} />
                ))
            }
            
        </group>
        
    )
}

export default Cinema