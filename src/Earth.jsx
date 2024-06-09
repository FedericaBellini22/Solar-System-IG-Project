import { useTexture } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import React , {useRef, useCallback, useEffect, useState} from "react"
import Moon from "./Moon"
import ISS from "./ISS"
import * as THREE from "three"

const Earth = React.memo(({ displacementScale }) => {
    const earthRef = useRef()
    const clockRef = useRef(new THREE.Clock) //create a reference to the clock

    const [hovered, hover] = useState(false)
    const[followingEarth, setFollowingEarth] = useState(false)

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


    //this is for the earth rotation around the Y-axis

    const updateEarthPosition = useCallback(() => {
         //calculate the earth's position based on its angle from the sun
         const angle = clockRef.current.getElapsedTime() * 0.5
         const distance = 8
         const x = Math.sin(angle) * distance
         const z = Math.cos(angle) * distance
         earthRef.current.position.set(x, 0, z)
         //increasing this earthRef property, the earth rotates more fast
         earthRef.current.rotation.y += 0.002
         
    }, [])
    

    //this function allows to follow the earth if I click on it (the camera will follow the earth)
    //if I click a second time on earth, the camera will follow the sun
    const toggleFollowingEarth = () => {
        setFollowingEarth((prevFollowingEarth) => !prevFollowingEarth)
    }

    useEffect (() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
    }, [hovered])


    useFrame(({camera}) =>  {
       updateEarthPosition()
       const earthPositionRef = earthRef.current.position
    
       //with this trick I can follow directly the earth with my camera
       const cameraTargetPosition = new THREE.Vector3(
            earthPositionRef.x +10, 
            earthPositionRef.y + 2, 
            earthPositionRef.z + 5
        )

       if (followingEarth){
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