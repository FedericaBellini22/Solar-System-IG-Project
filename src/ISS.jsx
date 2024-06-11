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

    const xAxis = 2
    const updateISSPosition = useCallback(() => {
        
        //Orbit Rotation
        issRef.current.position.x = Math.sin(clockRef.current.getElapsedTime() * 0.8) * xAxis
        issRef.current.position.z = Math.cos(clockRef.current.getElapsedTime() * 0.8) * xAxis

    }, [])

    //this is for the moon rotation around the Y-axis
    useFrame(() =>  { 
        updateISSPosition()
    })
    

    return (
        <mesh castShadow receiveShadow> 
            {/* scale is used to zoom in or out the 3d station */}
            <primitive 
                ref={issRef}
                object={memoizedISS.scene} 
                position={[xAxis, 0, 0]} 
                scale={0.008} 
            />
        </mesh>
    )
})

export default ISS