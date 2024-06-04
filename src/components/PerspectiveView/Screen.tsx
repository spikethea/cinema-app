// Loads the skybox texture and applies it to the scene.
import { useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import * as THREE from 'three';
import { useGetAllRecentMoviesQuery, useGetVideoByNameQuery } from "services/movies";
import videoLink from 'assets/models/screen.glb';
import { useParams } from "react-router-dom";

interface screenProps {
    videoId: number
}

export default function Screen(props: screenProps) {
    const { nodes }: {nodes: {Screen: THREE.Mesh}} = useLoader(GLTFLoader, videoLink);
    console.log(props.videoId);
    let { movieId } = useParams();
    const { data } = useGetVideoByNameQuery(Number(movieId));
  
    console.log(data)

    useEffect(() => {

          if ( nodes.Screen ) { 
            (nodes.Screen.material as THREE.ShaderMaterial).transparent = true;
            nodes.Screen.castShadow = true;
            nodes.Screen.receiveShadow = true;
            (nodes.Screen.material as THREE.ShaderMaterial).needsUpdate = true;
          }

      }, []);

    const [video] = useState(() => {
        const vid = document.createElement("video");
        vid.src = 'data';
        vid.crossOrigin = "Anonymous";
        vid.playsInline = true;
        vid.loop = true;
        vid.muted = true;
        vid.play();

        return vid;
    });


    return (
    <group>
        <primitive object={nodes.Screen}/>
        <mesh scale={[4.2, 3, 4.2]} rotation={[0, 0, 0]} position={[0, 12.5, 0.5]}>
        <planeGeometry args={[3.2, 1.9]} />
        <meshStandardMaterial emissive={"white"}>
            <videoTexture attach="map" args={[video]} />
            <videoTexture attach="emissiveMap" args={[video]} />
        </meshStandardMaterial>
        </mesh>
    </group>
    );
};