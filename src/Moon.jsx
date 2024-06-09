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
    const xAxis = 4
    //this is for the moon rotation around the Y-axis
    const updateMoonPosition = useCallback (() => {
        
        //Orbit Rotation
        moonRef.current.position.x = Math.sin(clockRef.current.getElapsedTime() * 0.8) * xAxis
        moonRef.current.position.z = Math.cos(clockRef.current.getElapsedTime() * 0.8) * xAxis
        //Axis Rotation
        //increasing this moonRef property, the moon rotates more fast
        moonRef.current.rotation.y += 0.002
    }, [])

    
    useFrame(() =>  {
        updateMoonPosition()
    })
    
    return (
        <mesh castShadow receiveShadow ref={moonRef} position={[xAxis, 0, 0]}>
            {/* this is the shape of our mesh */}
            {/* Radius , X-axis , Y-axis */}
            <sphereGeometry args = {[0.5, 32, 32]}/>
            {/* this allow us to use a texture for the moon */}
            <meshPhongMaterial  map = {moonTexture} 
            emissiveMap={moonTexture}
            emissive={0xffffff}
            emissiveIntensity={0.05}/>
        </mesh>
    )
})

export default Moon