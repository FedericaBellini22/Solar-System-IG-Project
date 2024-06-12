import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import React, { useMemo, useRef, useCallback } from "react"
import * as THREE from "three"

const ISS = React.memo(() => {
    const issRef = useRef()
    const clockRef = useRef(new THREE.Clock)
    const memoizedISS = useMemo(() => {
        return useGLTF('/ISSModel/ISS_stationary.gltf')
    })

    const semiMajorAxis = 1.5 // Semi-major axis
    const eccentricity = 0.05 // Eccentricity of the orbit

    // Function to calculate position in an elliptical orbit
    const calculateEllipticalPosition = (angle, semiMajorAxis, eccentricity) => {
        const semiMinorAxis = semiMajorAxis * Math.sqrt(1 - eccentricity * eccentricity)
        const radius = semiMajorAxis * (1 - eccentricity * eccentricity) / (1 + eccentricity * Math.cos(angle))
        const x = radius * Math.cos(angle)
        const z = radius * Math.sin(angle)
        return { x, z }
    }

    const updateISSPosition = useCallback(() => {
        //0.8 is the angular velocity of the ISS
        const angle = clockRef.current.getElapsedTime() * 0.8
        const { x, z } = calculateEllipticalPosition(angle, semiMajorAxis, eccentricity)
        issRef.current.position.set(x, 0, z)
    }, [semiMajorAxis, eccentricity])

    useFrame(() =>  { 
        updateISSPosition()
    })

    return (
        <mesh castShadow receiveShadow> 
            {/* scale is used to zoom in or out the 3d station */}
            <primitive 
                ref={issRef}
                object={memoizedISS.scene} 
                position={[semiMajorAxis, 0, 0]} 
                scale={0.005} 
            />
        </mesh>
    )
})

export default ISS
