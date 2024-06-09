import { useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import Moon from "./Moon"
import ISS from "./ISS"
import * as THREE from "three"

const Earth = ({ displacementScale }) => {
    const earthRef = useRef()
    const earthPositionRef = useRef(new THREE.Vector3(8, 0, 0)) //create a reference to the Earth's position vector

    const [earthTexture, earthNormalMap, earthSpecularMap, earthDisplacementMap] = useTexture([
        'assets/earth_day.jpg', 
        'assets/earth_normal.jpg', 
        'assets/earth_specular.jpg',
        'assets/earth_displacement.jpg'
    ])


    //this is for the earth rotation around the Y-axis
    useFrame(({clock}) =>  {
        //calculate the earth's position based on its angle from the sun
        const angle = clock.getElapsedTime() * 0.5
        const distance = 8
        const x = Math.sin(angle) * distance
        const z = Math.cos(angle) * distance
        earthRef.current.position.set(x, 0, z)
        //increasing this earthRef property, the earth rotates more fast
        earthRef.current.rotation.y += 0.002
        earthPositionRef.current = earthRef.current.position
    })
    
    return (
        <group ref={earthRef}>
            <mesh castShadow receiveShadow >
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
                />
            </mesh>
            <ISS />
            <Moon />
        </group>
    )
}

export default Earth