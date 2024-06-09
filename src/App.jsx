import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import MainContainer from "./MainContainer"


function App() {

  return (
    <Canvas 
     shadows
     camera={{fov: 35, near: 0.1, far: 1000, 
     position: [16, 8.5, 19.5]}}>
     <color attach='background' args={['black']} />
     <OrbitControls />
     <MainContainer />
    </Canvas>
  )
}

export default App
