import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import {Instance, Instances, useGLTF} from '@react-three/drei';
import seatData from 'data/seat-data.json';

import scene from 'assets/models/cinema_seat.glb'
import * as THREE from 'three';

interface SeatsRowData {
    name: string;
    elevation: number;
    seats: {
        id: number;
        seatId: number;
        seatPos: number;
        isPremium: boolean;
        isEmpty: boolean;
    }[];
}

const Seat = (props: any) => {
    const seatRef = useRef(null);
    

    const turnSeatRed = () => {
        if (!seatRef.current) return;

        // r3f PositionMesh is not defined, so using lambert material
        const seat = seatRef.current as THREE.MeshLambertMaterial;
        seat.color = new THREE.Color(0xFF0000);
    }

    const turnSeatYellow = () => {
        if (!seatRef.current) return;

        // r3f PositionMesh is not defined, so using lambert material
        const seat = seatRef.current as THREE.MeshLambertMaterial;
        seat.color = new THREE.Color(0xFFFF00);

    }

    return (
                <Instance
                 castShadow 
                 receiveShadow
                 position={[0, 0, props.seatPos* 3]}
                 onPointerEnter={turnSeatYellow}
                 onPointerLeave={turnSeatRed}
                 ref={seatRef}
                 />
    )
}

const SeatsRow = ({data}: {data: SeatsRowData, key: number}) => {
    const {nodes, materials} = useGLTF(scene);

    const seat = nodes.seat as THREE.Mesh;

    return (
        <Instances position-x={-data.elevation*4} position-y={data.elevation*3} range={1000} material={materials.Material} geometry={seat.geometry}>
            {data.seats.map((props, i) => (
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
                    <SeatsRow data={props} key={i} />
                ))
            }
            
        </group>
        
    )
}

export default Cinema