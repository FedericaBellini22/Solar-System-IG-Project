import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useCallback } from "react";
import * as THREE from "three";

const Mars = React.memo(() => {
    const marsRef = useRef();
    const clockRef = useRef(new THREE.Clock());

    const [
        marsTexture, 
    ] = useTexture([
        'assets/mars.jpg', 
    ]);

    const simulationTimeScale = 150 //do the proportion with the earth 60 : 365 = x : 225
    const semiMajorAxis = 17;
    const eccentricity = 0.2056;
    const marsAngularVelocity = (2 * Math.PI) / simulationTimeScale;

    const calculateEllipticalPosition = (angle, semiMajorAxis, eccentricity) => {
        const radius = semiMajorAxis * (1 - eccentricity * eccentricity) / (1 + eccentricity * Math.cos(angle));
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        return { x, z };
    };

    const updateMarsPosition = useCallback(() => {
        const angle = clockRef.current.getElapsedTime() * marsAngularVelocity;
        const { x, z } = calculateEllipticalPosition(angle, semiMajorAxis, eccentricity);
        marsRef.current.position.set(x, 0, z);
        marsRef.current.rotation.y += 0.002;
    }, [semiMajorAxis, eccentricity, marsAngularVelocity]);

    useFrame(() => {
        updateMarsPosition()
    })

    return (
            <mesh 
                castShadow 
                receiveShadow 
                ref={marsRef}
            >
                <sphereGeometry args={[0.95, 32, 32]} />
                <meshPhongMaterial  
                    map={marsTexture} 
                    displacementScale={0.1}
                    emissiveMap={marsTexture}
                    emissive={0xffffff}
                    emissiveIntensity={0.1}
                />
            </mesh>
    );
});

export default Mars;
