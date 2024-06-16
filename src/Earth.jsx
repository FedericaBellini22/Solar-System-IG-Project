import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useCallback, useEffect, useState } from "react";
import Moon from "./Moon";
import ISS from "./ISS";
import * as THREE from "three";

const Earth = React.memo(({ displacementScale, earthSimulationTimeScale, earthSemiMajorAxis, earthEccentricity, earthShininess, earthRadius }) => {
    const earthRef = useRef();
    const clockRef = useRef(new THREE.Clock());

    const [hovered, hover] = useState(false);
    const [followingEarth, setFollowingEarth] = useState(false);

    const [
        earthTexture, 
        earthNormalMap, 
        earthSpecularMap, 
        earthDisplacementMap, 
        earthEmissiveMap
    ] = useTexture([
        'assets/earth_day.jpg', 
        'assets/earth_normal.jpg', 
        'assets/earth_specular.jpg',
        'assets/earth_displacement.jpg',
        'assets/earth_night.jpg'
    ]);

    const earthAngularVelocity = (2 * Math.PI) / earthSimulationTimeScale;

    const calculateEllipticalPosition = (angle, earthSemiMajorAxis, earthEccentricity) => {
        const radius = earthSemiMajorAxis * (1 - earthEccentricity * earthEccentricity) / (1 + earthEccentricity * Math.cos(angle));
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        return { x, z };
    };

    const updateEarthPosition = useCallback(() => {
        const angle = clockRef.current.getElapsedTime() * earthAngularVelocity;
        const { x, z } = calculateEllipticalPosition(angle, earthSemiMajorAxis, earthEccentricity);
        earthRef.current.position.set(x, 0, z);
        earthRef.current.rotation.y += 0.002;
    }, [earthSemiMajorAxis, earthEccentricity, earthAngularVelocity]);

    const toggleFollowingEarth = () => {
        setFollowingEarth((prevFollowingEarth) => !prevFollowingEarth);
    };

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto';
    }, [hovered]);

    useFrame(({ camera }) => {
        updateEarthPosition();
        const earthPositionRef = earthRef.current.position;

        const cameraTargetPosition = new THREE.Vector3(
            earthPositionRef.x + 10, 
            earthPositionRef.y + 2, 
            earthPositionRef.z + 5
        );

        if (followingEarth) {
            camera.lookAt(earthPositionRef);
            camera.position.copy(cameraTargetPosition);
        } else {
            const originalCameraPosition = new THREE.Vector3(16.14, 8.32, 19.81);
            const originalCameraTarget = new THREE.Vector3(0, 0, 0);
            camera.lookAt(originalCameraTarget);
            camera.position.copy(originalCameraPosition);
        }
    });

    return (
        <group ref={earthRef}>
            <mesh 
                castShadow 
                receiveShadow 
                onClick={toggleFollowingEarth}
                onPointerOver={() => hover(true)} 
                onPointerOut={() => hover(false)}>
                <sphereGeometry args={[earthRadius, 32, 32]} />
                <meshPhongMaterial  
                    map={earthTexture} 
                    normalMap={earthNormalMap} 
                    specularMap={earthSpecularMap}
                    shininess={earthShininess}
                    displacementMap={earthDisplacementMap}
                    displacementScale={displacementScale}
                    emissiveMap={earthEmissiveMap}
                    emissive={0xffffff}
                    emissiveIntensity={hovered ? 20 : 1.5}
                />
            </mesh>
            <ISS />
            <Moon />
        </group>
    );
});

export default Earth;
