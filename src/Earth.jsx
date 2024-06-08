import { useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import Moon from "./Moon"

const Earth = ({ displacementScale }) => {
    const earthRef = useRef()

    const [earthTexture, earthNormalMap, earthSpecularMap, earthDisplacementMap] = useTexture([
        'assets/earth_day.jpg', 
        'assets/earth_normal.jpg', 
        'assets/earth_specular.jpg',
        'assets/earth_displacement.jpg'
    ])


    //this is for the earth rotation around the Y-axis
    useFrame((() =>  {
        //increasing this earthRef property, the earth rotates more fast
        earthRef.current.rotation.y += 0.002
    }))
    
    return (
        <group>
            <mesh receiveShadow ref={earthRef}>
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
            <Moon />
        </group>
    )
}

export default Earth