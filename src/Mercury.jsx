import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useCallback } from "react";
import * as THREE from "three";

const Mercury = React.memo(({ mercurySimulationTimeScale, mercurySemiMajorAxis, mercuryEccentricity, mercuryIntensity, mercuryRadius }) => {
    const mercuryRef = useRef();
    const clockRef = useRef(new THREE.Clock());

    const [
        mercuryTexture, 
    ] = useTexture([
        'assets/mercury.jpg', 
    ]); 

    const mercuryAngularVelocity = (2 * Math.PI) / mercurySimulationTimeScale;

    const calculateEllipticalPosition = (angle, mercurySemiMajorAxis , mercuryEccentricity ) => {
        const radius = mercurySemiMajorAxis  * (1 - mercuryEccentricity  * mercuryEccentricity ) / (1 + mercuryEccentricity  * Math.cos(angle));
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        return { x, z };
    };

    const updateMercuryPosition = useCallback(() => {
        const angle = clockRef.current.getElapsedTime() * mercuryAngularVelocity;
        const { x, z } = calculateEllipticalPosition(angle, mercurySemiMajorAxis , mercuryEccentricity );
        mercuryRef.current.position.set(x, 0, z);
        mercuryRef.current.rotation.y += 0.002;
    }, [mercurySemiMajorAxis , mercuryEccentricity , mercuryAngularVelocity]);

    useFrame(() => {
        updateMercuryPosition()
    })

    return (
            <mesh 
                castShadow 
                receiveShadow 
                ref={mercuryRef}
            >
                <sphereGeometry args={[mercuryRadius, 32, 32]} />
                <meshPhongMaterial  
                    map={mercuryTexture} 
                    displacementScale={0.1}
                    emissiveMap={mercuryTexture}
                    emissive={0xffffff}
                    emissiveIntensity={mercuryIntensity}
                />
            </mesh>
    );
});

export default Mercury;
