import { OrbitControls, useHelper } from  "@react-three/drei"
import AnimatedStars from "./AnimatedStars"
import { useRef } from "react"
import Earth from "./Earth"
import *as THREE from "three"

const MainContainer = () => {
    const directionalLightRef = useRef()
    const directionalLightRefTwo = useRef()
    //useHelper from react drei, help us to know from where light arrives
    useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, 'hotpink')
    useHelper(directionalLightRefTwo, THREE.DirectionalLightHelper, 1, 'hotpink')

    return (
        <>
            <color attach='background' args={['black']} />
            <OrbitControls />
            <AnimatedStars />
            {/* A light that gets emitted in a specific direction. 
            This light will behave as though it is infinitely far away and the rays produced from it are all parallel. 
            The common use case for this is to simulate daylight; 
            the sun is far enough away that its position can be considered to be infinite, and all light rays coming from it are parallel. */}
            <directionalLight ref={directionalLightRef} 
                position={(0, 0, 10)} 
                intensity={1} 
                //color = {0xff0000}
            />
            <directionalLight ref={directionalLightRefTwo} position={(0, 0, -10)}/>
            <Earth />
        </>
    )
}

export default MainContainer