import { useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

const Sun = () => {
    const sunRef = useRef()

    const [sunTexture] = useTexture([
        'assets/sun_map.jpg', 
    ])


    //this is for the sun rotation around the Y-axis
    useFrame(() =>  {
        //Axis Rotation
        //increasing this sunRef property, the sun rotates more fast
        sunRef.current.rotation.y -= 0.002
    })
    
    return (
        <mesh ref={sunRef} position={[0, 0, 0]}>
            {/* this is the shape of our mesh */}
            {/* Radius , X-axis , Y-axis */}
            <sphereGeometry args = {[2, 32, 32]}/>
            {/* this allow us to use a texture for the moon */}
            <meshPhongMaterial  map={sunTexture} emissiveMap={sunTexture} emissiveIntensity={0.6} emissive={0xffffff}/>
            <pointLight castShadow />
        </mesh>
    )
}

export default Sun