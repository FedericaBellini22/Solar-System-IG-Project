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

    
    const simulationTimeScale = 200; // Giove ruota in 4333 giorni
    const semiMajorAxis = 18; // Incrementato per evitare collisioni
    const eccentricity = 0.0489;

    const jupiterAngularVelocity = (2 * Math.PI) / simulationTimeScale;

    const calculateEllipticalPosition = (angle, semiMajorAxis, eccentricity) => {
        const radius = semiMajorAxis * (1 - eccentricity * eccentricity) / (1 + eccentricity * Math.cos(angle));
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        return { x, z };
    };

    const updateJupiterPosition = useCallback(() => {
        const angle = clockRef.current.getElapsedTime() * jupiterAngularVelocity;
        const { x, z } = calculateEllipticalPosition(angle, semiMajorAxis, eccentricity);
        jupiterRef.current.position.set(x, 0, z);
        jupiterRef.current.rotation.y += 0.002;
    }, [semiMajorAxis, eccentricity, jupiterAngularVelocity]);

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
