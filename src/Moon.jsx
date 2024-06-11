import { useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import React , {useRef, useCallback} from "react"
import * as THREE from "three"

const Moon = React.memo(() => {
    const moonRef = useRef()

    const [moonTexture] = useTexture([
        'assets/moon_map.jpg', 
    ])

    const clockRef = useRef(new THREE.Clock)
    const semiMajorAxis = 4 // Semi-major axis
    const eccentricity = 0.05 // Eccentricity of the orbit

    // Function to calculate position in an elliptical orbit
    const calculateEllipticalPosition = (angle, semiMajorAxis, eccentricity) => {
        const semiMinorAxis = semiMajorAxis * Math.sqrt(1 - eccentricity * eccentricity)
        const radius = semiMajorAxis * (1 - eccentricity * eccentricity) / (1 + eccentricity * Math.cos(angle))
        const x = radius * Math.cos(angle)
        const z = radius * Math.sin(angle)
        return { x, z }
    }

    const updateMoonPosition = useCallback(() => {
        //0.8 is the angular velocity of the moon
        const angle = clockRef.current.getElapsedTime() * 0.8
        const { x, z } = calculateEllipticalPosition(angle, semiMajorAxis, eccentricity)
        moonRef.current.position.set(x, 0, z)
        moonRef.current.rotation.y += 0.002
    }, [semiMajorAxis, eccentricity])

    useFrame(() =>  {
        updateMoonPosition()
    })

    return (
        <mesh castShadow receiveShadow ref={moonRef} position={[semiMajorAxis, 0, 0]}>
            {/* this is the shape of our mesh */}
            {/* Radius , X-axis , Y-axis */}
            <sphereGeometry args = {[0.5, 32, 32]}/>
            {/* this allow us to use a texture for the moon */}
            <meshPhongMaterial  map = {moonTexture} 
            emissiveMap={moonTexture}
            emissive={0xffffff}
            emissiveIntensity={0.1}/>
        </mesh>
    )
})

export default Moon
