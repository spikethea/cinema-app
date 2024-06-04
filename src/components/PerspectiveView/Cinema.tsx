import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import {Instance, Instances, useGLTF} from '@react-three/drei';
import seatData from 'data/seat-data.json';
import Screen from './Screen';

import cinemaURL from 'assets/models/cinema_seat.glb'
import * as THREE from 'three';
import { MeshLambertMaterial } from 'three';
import { hover } from '@testing-library/user-event/dist/hover';

interface seatProps {
        id: number;
        seatId: number;
        seatPos: number;
        isPremium: boolean;
        isEmpty: boolean;
}

interface SeatsRowData {
    name: string;
    elevation: number;
    seats: Array<seatProps>;
}


const Cinema = (props: any) => {

    const { camera } = useThree();
    useEffect(()=> {
        camera.position.x = 15;
        console.log('update')
    }, [camera.position])


    return (
        <group position-z={-10}>
            {
                seatData.seatRows.map((props, i) => (
                    <SeatsRow {...props} key={i} />
                ))
            }
            <Screen {...props}/>
        </group>
        
    )
}

const SeatsRow = ({seats, elevation}: SeatsRowData) => {

    return (
        <group position-x={-elevation*4} position-y={elevation*3}>
            {seats.map((props, i) => (
                <Seat key={i} {...props} />
            ))}
        </group>
    )
}

const Seat = (props: seatProps) => {
    const seatRef = useRef(null);
    const {nodes} = useGLTF(cinemaURL);
    const seat = nodes.seat as THREE.Mesh
    const [hovered, setHover] = useState(false);
    const [chosen, setChosen] = useState(false);
    const yellow = useMemo(() => new THREE.Color(0xFFFF00), []);
    const red = useMemo(() => new THREE.Color(0xE75636), []);
    
    useEffect(()=> {
        if (!seatRef.current) return;
        const seat = seatRef.current as THREE.Mesh;
        const material = seat.material as THREE.MeshLambertMaterial;
        
        material.transparent = true;
        seat.userData.seat_id = props.seatId;
        console.log(seat)
    }, [])
    


    const toggleSeat = () => {
        if (!seatRef.current) return;

        const seat = seatRef.current as THREE.Mesh;
        const material = seat.material as any;

        if (material) {
            material.needsUpdate = true;
            setChosen((prevState) => !prevState);
            console.log(chosen);
        }

    }

    return (
                <mesh
                 castShadow 
                 receiveShadow
                 position={[0, 0, props.seatPos* 3]}
                 onPointerOver={(event) => (event.stopPropagation(), setHover(true))}
                 onPointerOut={() => setHover(false)}
                 onClick={toggleSeat}
                 ref={seatRef}
                 geometry={seat.geometry}
                >
                   <meshLambertMaterial
                    opacity={chosen ? 0.2: 1}
                    color={hovered && !chosen ? yellow : red}
                    />
                </mesh>
    )
}

export default Cinema