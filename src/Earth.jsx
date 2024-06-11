import { useTexture } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import React, { useRef, useCallback, useEffect, useState } from "react"
import Moon from "./Moon"
import ISS from "./ISS"
import * as THREE from "three"

const Earth = React.memo(({ displacementScale }) => {
    const earthRef = useRef()
    const clockRef = useRef(new THREE.Clock) //create a reference to the clock

    const [hovered, hover] = useState(false)
    const [followingEarth, setFollowingEarth] = useState(false)

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
    ])

    // Parameters for the elliptical orbit
    const semiMajorAxis = 8 // Semi-major axis
    const eccentricity = 0.1 // Eccentricity of the orbit

     // Orbital period of the Earth in days
     const earthOrbitalPeriod = 365.25;

     // Simulation time scale: 1 year = 60 seconds
     const simulationTimeScale = 60; // seconds for one Earth year
 
     // Angular velocity in the simulation time scale
     const earthAngularVelocity = (2 * Math.PI) / simulationTimeScale;
 
     const calculateEllipticalPosition = (angle, semiMajorAxis, eccentricity) => {
         const radius = semiMajorAxis * (1 - eccentricity * eccentricity) / (1 + eccentricity * Math.cos(angle));
         const x = radius * Math.cos(angle);
         const z = radius * Math.sin(angle);
         return { x, z };
     };
 
     const updateEarthPosition = useCallback(() => {
         const angle = clockRef.current.getElapsedTime() * earthAngularVelocity;
         const { x, z } = calculateEllipticalPosition(angle, semiMajorAxis, eccentricity);
         earthRef.current.position.set(x, 0, z);
         earthRef.current.rotation.y += 0.002;
     }, [semiMajorAxis, eccentricity, earthAngularVelocity]);

    //this function allows to follow the earth if I click on it (the camera will follow the earth)
    const toggleFollowingEarth = () => {
        setFollowingEarth((prevFollowingEarth) => !prevFollowingEarth)
    }

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
    }, [hovered])

    useFrame(({ camera }) => {
        updateEarthPosition()
        const earthPositionRef = earthRef.current.position

        //with this trick I can follow directly the earth with my camera
        const cameraTargetPosition = new THREE.Vector3(
            earthPositionRef.x + 10, 
            earthPositionRef.y + 2, 
            earthPositionRef.z + 5
        )

        if (followingEarth) {
            camera.lookAt(earthPositionRef)
            camera.position.copy(cameraTargetPosition)
        } else {
            const originalCameraPosition = new THREE.Vector3(16.14, 8.32, 19.81)
            const originalCameraTarget = new THREE.Vector3(0, 0, 0)
            camera.lookAt(originalCameraTarget)
            camera.position.copy(originalCameraPosition)
        }
    })

    return (
        <group ref={earthRef}>
            <mesh 
                castShadow 
                receiveShadow 
                onClick={toggleFollowingEarth}
                onPointerOver={() => hover(true)} 
                onPointerOut={() => hover(false)}>
                {/* this is the shape of our mesh */}
                {/* Radius , X-axis , Y-axis */}
                <sphereGeometry args = {[1, 32, 32]}/>
                {/* this allow us to use a texture for the earth */}
                <meshPhongMaterial  
                    map = {earthTexture} 
                    normalMap={earthNormalMap} 
                    specularMap={earthSpecularMap}
                    shininess={1000}
                    displacementMap={earthDisplacementMap}
                    //if we increase the displacementScale, we are increasing also the size of the reliefs (for example mountains)
                    displacementScale={displacementScale}
                    emissiveMap={earthEmissiveMap}
                    emissive={0xffffff}
                    emissiveIntensity={hovered ? 20 : 1.5}
                />
            </mesh>
            <ISS />
            <Moon />
        </group>
    )
})

export default Earth
