// Loads the skybox texture and applies it to the scene.
import { Suspense, memo, useEffect, useMemo, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import * as THREE from 'three';
import { useGetAllRecentMoviesQuery, useGetVideoByNameQuery } from "services/movies";
import videoLink from 'assets/models/screen.glb';
import { useParams } from "react-router-dom";
import { MovieTrailerData, trailerResult } from "types";

interface screenProps {
    videoId: number
}

export default function Screen(props: screenProps) {

    const [video, setVideo] = useState<HTMLVideoElement>();
    const { nodes }: {nodes: {Screen: THREE.Mesh}} = useLoader(GLTFLoader, videoLink);
    let { movieId } = useParams();
    console.log(movieId);
    const { data } = useGetVideoByNameQuery(Number(movieId));
    
    const memoizedVideo = useMemo(()=> {
        if (!data) return;
        const videoId  = data.results[0].key

        const vid = document.createElement("video");
        vid.src = `https://www.youtube.com/watch?v=${videoId}`;
        vid.crossOrigin = "Anonymous";
        vid.playsInline = true;
        vid.loop = true;
        vid.muted = true;
        vid.play();

        return vid;
    }, [data])


    useEffect(() => {
        if (data) {
            setVideo(memoizedVideo)
        }
        

          if ( nodes.Screen ) { 
            (nodes.Screen.material as THREE.ShaderMaterial).transparent = true;
            nodes.Screen.castShadow = true;
            nodes.Screen.receiveShadow = true;
            (nodes.Screen.material as THREE.ShaderMaterial).needsUpdate = true;
          }

      }, []);




    return (
    <group>
        <primitive object={nodes.Screen}/>
        <Suspense>
            <mesh scale={[4.2, 3, 4.2]} rotation={[0, 0, 0]} position={[0, 12.5, 0.5]}>
            <planeGeometry args={[3.2, 1.9]} />
            <meshStandardMaterial color={'white'} emissive={"white"}>
                {
                    video ? 
                    <videoTexture attach="map" args={[video]} />
                    // <videoTexture attach="emissiveMap" args={[video]} />
                    : null
                }
                
            </meshStandardMaterial>
            </mesh>
        </Suspense>
        
    </group>
    );
};