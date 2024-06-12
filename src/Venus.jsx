import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useCallback } from "react";
import * as THREE from "three";

const Venus = React.memo(() => {
    const venusRef = useRef();
    const clockRef = useRef(new THREE.Clock());

    const [
        venusTexture, 
    ] = useTexture([
        'assets/venus.jpg', 
    ]);

    const simulationTimeScale = 15 //do the proportion with the earth 60 : 365 = x : 225
    const semiMajorAxis = 6.5;
    const eccentricity = 0.2056;
    const venusAngularVelocity = (2 * Math.PI) / simulationTimeScale;

    const calculateEllipticalPosition = (angle, semiMajorAxis, eccentricity) => {
        const radius = semiMajorAxis * (1 - eccentricity * eccentricity) / (1 + eccentricity * Math.cos(angle));
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        return { x, z };
    };

    const updateVenusPosition = useCallback(() => {
        const angle = clockRef.current.getElapsedTime() * venusAngularVelocity;
        const { x, z } = calculateEllipticalPosition(angle, semiMajorAxis, eccentricity);
        venusRef.current.position.set(x, 0, z);
        venusRef.current.rotation.y += 0.002;
    }, [semiMajorAxis, eccentricity, venusAngularVelocity]);

    useFrame(() => {
        updateVenusPosition()
    })

    return (
            <mesh 
                castShadow 
                receiveShadow 
                ref={venusRef}
            >
                <sphereGeometry args={[0.95, 32, 32]} />
                <meshPhongMaterial  
                    map={venusTexture} 
                    displacementScale={0.1}
                    emissiveMap={venusTexture}
                    emissive={0xffffff}
                    emissiveIntensity={0.1}
                />
            </mesh>
    );
});

export default Venus;
