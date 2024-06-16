import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import MainContainer from "./MainContainer";
import SolarSystemGUI from './SolarSystemGUI';
import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState({
    earthSimulationTimeScale: 60,
    earthSemiMajorAxis: 12,
    earthEccentricity: 0.0167,
    earthShininess: 1000,
    earthRadius: 1,
    mercurySimulationTimeScale: 14.45, 
    mercurySemiMajorAxis: 4.257, 
    mercuryEccentricity: 0.2056, 
    mercuryIntensity: 0.1,
    mercuryRadius: 0.4,
    fov: 35, 
    sunLightIntensity: 200,
    
  });

  const handleUpdate = (newData) => {
    setData(prevData => ({ ...prevData, ...newData }));
  };

  return (
    <>
      <Canvas 
       shadows
       camera={{ fov: data.fov, near: 0.1, far: 1000, position: [16, 8.5, 19.5] }}>
       <color attach='background' args={['black']} />
       <OrbitControls />
       <MainContainer controls={data} />
       <UpdateCamera fov={data.fov} />
      </Canvas>
      <SolarSystemGUI data={data} handleUpdate={handleUpdate} />
    </>
  );
}

// Component to update camera FOV dynamically
const UpdateCamera = ({ fov }) => {
  const { camera } = useThree();
  useEffect(() => {
    camera.fov = fov;
    camera.updateProjectionMatrix();
  }, [fov, camera]);
  return null;
};

export default App;
