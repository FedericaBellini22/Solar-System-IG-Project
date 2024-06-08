import { useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

const Moon = () => {
    const moonRef = useRef()

    const [moonTexture] = useTexture([
        'assets/moon_map.jpg', 
    ])


    //this is for the moon rotation around the Y-axis
    useFrame(({ clock }) =>  {
        //Orbit Rotation
        moonRef.current.position.x = Math.sin(clock.getElapsedTime() * 0.2) * 4
        moonRef.current.position.z = Math.cos(clock.getElapsedTime() * 0.2) * 4
        //Axis Rotation
        //increasing this moonRef property, the moon rotates more fast
        moonRef.current.rotation.y += 0.002
    })
    
    return (
        <mesh castShadow ref={moonRef} position={[4, 0, 0]}>
            {/* this is the shape of our mesh */}
            {/* Radius , X-axis , Y-axis */}
            <sphereGeometry args = {[0.5, 32, 32]}/>
            {/* this allow us to use a texture for the moon */}
            <meshPhongMaterial  map = {moonTexture}/>
        </mesh>
    )
}

export default Moon