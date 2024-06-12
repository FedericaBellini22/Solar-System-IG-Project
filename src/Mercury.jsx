import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useCallback } from "react";
import * as THREE from "three";

const Mercury = React.memo(() => {
    const mercuryRef = useRef();
    const clockRef = useRef(new THREE.Clock());

    const [
        mercuryTexture, 
    ] = useTexture([
        'assets/mercury.jpg', 
    ]); 

    const simulationTimeScale = 8 //do the proportion with the earth 60 : 365 = x : 88
    const semiMajorAxis = 4;
    const eccentricity = 0.2056;

    const mercuryAngularVelocity = (2 * Math.PI) / simulationTimeScale;

    const calculateEllipticalPosition = (angle, semiMajorAxis, eccentricity) => {
        const radius = semiMajorAxis * (1 - eccentricity * eccentricity) / (1 + eccentricity * Math.cos(angle));
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        return { x, z };
    };

    const updateMercuryPosition = useCallback(() => {
        const angle = clockRef.current.getElapsedTime() * mercuryAngularVelocity;
        const { x, z } = calculateEllipticalPosition(angle, semiMajorAxis, eccentricity);
        mercuryRef.current.position.set(x, 0, z);
        mercuryRef.current.rotation.y += 0.002;
    }, [semiMajorAxis, eccentricity, mercuryAngularVelocity]);

    useFrame(() => {
        updateMercuryPosition()
    })

    return (
            <mesh 
                castShadow 
                receiveShadow 
                ref={mercuryRef}
            >
                <sphereGeometry args={[0.38, 32, 32]} />
                <meshPhongMaterial  
                    map={mercuryTexture} 
                    displacementScale={0.1}
                    emissiveMap={mercuryTexture}
                    emissive={0xffffff}
                    emissiveIntensity={0.1}
                />
            </mesh>
    );
});

export default Mercury;
