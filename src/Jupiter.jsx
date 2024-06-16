import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useCallback } from "react";
import * as THREE from "three";

const Jupiter = React.memo(() => {
    const jupiterRef = useRef();
    const clockRef = useRef(new THREE.Clock());

    const [
        jupiterTexture, 
    ] = useTexture([
        'assets/jupiter.jpg', 
    ]);

    
    const simulationTimeScale = 711.4; // Jupter rotates in 4333 days
    const jupiterSemiMajorAxis  = 20; 
    const jupiterEccentricity  = 0.0489;

    const jupiterAngularVelocity = (2 * Math.PI) / simulationTimeScale;

    const calculateEllipticalPosition = (angle, jupiterSemiMajorAxis , jupiterEccentricity ) => {
        const radius = jupiterSemiMajorAxis  * (1 - jupiterEccentricity  * jupiterEccentricity ) / (1 + jupiterEccentricity  * Math.cos(angle));
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        return { x, z };
    };

    const updateJupiterPosition = useCallback(() => {
        const angle = clockRef.current.getElapsedTime() * jupiterAngularVelocity;
        const { x, z } = calculateEllipticalPosition(angle, jupiterSemiMajorAxis , jupiterEccentricity );
        jupiterRef.current.position.set(x, 0, z);
        jupiterRef.current.rotation.y += 0.002;
    }, [jupiterSemiMajorAxis , jupiterEccentricity , jupiterAngularVelocity]);

    useFrame(() => {
        updateJupiterPosition()
    })

    return (
            <mesh 
                castShadow 
                receiveShadow 
                ref={jupiterRef}
            >
                <sphereGeometry args={[0.95, 32, 32]} />
                <meshPhongMaterial  
                    map={jupiterTexture} 
                    displacementScale={0.1}
                    emissiveMap={jupiterTexture}
                    emissive={0xffffff}
                    emissiveIntensity={0.1}
                />
            </mesh>
    );
});

export default Jupiter;
