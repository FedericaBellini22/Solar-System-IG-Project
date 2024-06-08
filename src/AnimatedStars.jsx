import { Stars } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

const AnimatedStars = () => {
    //just create a reference
    const starsRef = useRef()

    useFrame(() => {
        //to rotate more slowly add zeros
        //this is a callback function which allows constantly running for the stars animations
        //here I use the reference
        starsRef.current.rotation.x += 0.0001
        starsRef.current.rotation.y += 0.0001
        starsRef.current.rotation.z += 0.0001
    })
    
    //here I use the reference
    return <Stars ref={starsRef}/>
}

export default AnimatedStars