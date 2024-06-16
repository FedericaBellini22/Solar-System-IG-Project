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

    const simulationTimeScale = 36.99 //do the proportion with the earth 60 : 365 = x : 225
    const venusSemiMajorAxis  = 7.953;
    const venusEccentricity  = 0.0067;
    const venusAngularVelocity = (2 * Math.PI) / simulationTimeScale;

    const calculateEllipticalPosition = (angle, venusSemiMajorAxis , venusEccentricity ) => {
        const radius = venusSemiMajorAxis  * (1 - venusEccentricity  * venusEccentricity ) / (1 + venusEccentricity  * Math.cos(angle));
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        return { x, z };
    };

    const updateVenusPosition = useCallback(() => {
        const angle = clockRef.current.getElapsedTime() * venusAngularVelocity;
        const { x, z } = calculateEllipticalPosition(angle, venusSemiMajorAxis , venusEccentricity );
        venusRef.current.position.set(x, 0, z);
        venusRef.current.rotation.y += 0.002;
    }, [venusSemiMajorAxis , venusEccentricity , venusAngularVelocity]);

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
