import React from 'react';
import { useControls, Leva } from 'leva';
import './SolarSystemGUI.css'; // import css file

const SolarSystemGUI = ({ data, handleUpdate }) => {
  const { 
    earthSimulationTimeScale, 
    earthSemiMajorAxis, 
    earthEccentricity, 
    earthShininess, 
    earthRadius,
    mercurySimulationTimeScale,
    mercurySemiMajorAxis,
    mercuryEccentricity,
    mercuryIntensity,
    mercuryRadius,
    fov, 
    sunLightIntensity, 
     } = useControls({
    earthSimulationTimeScale: { value: data.earthSimulationTimeScale, min: 1, max: 120 },
    earthSemiMajorAxis: { value: data.earthSemiMajorAxis, min: 1, max: 20 },
    earthEccentricity: { value: data.earthEccentricity, min: 0, max: 1 },
    earthShininess: {value: data.earthShininess, min: 0, max: 5000},
    earthRadius: {value: data.earthRadius, min: 0, max: 10},
    mercurySimulationTimeScale: {value: data.mercurySimulationTimeScale, min: 0, max: 120},
    mercurySemiMajorAxis: {value: data.mercurySemiMajorAxis, min: 0, max: 20},
    mercuryEccentricity: {value: data.mercuryEccentricity, min: 0, max: 1},
    mercuryIntensity: {value: data.mercuryIntensity, min: 0, max: 5000},
    mercuryRadius: {value: data.mercuryRadius, min: 0, max: 10},
    fov: { value: data.fov, min: 10, max: 100 },
    sunLightIntensity: { value: data.sunLightIntensity, min: 0, max: 1000 },
  });

  React.useEffect(() => {
    handleUpdate({ 
      earthSimulationTimeScale, 
      earthSemiMajorAxis, 
      earthEccentricity,
      earthShininess, 
      earthRadius, 
      mercurySimulationTimeScale,
      mercurySemiMajorAxis,
      mercuryEccentricity,
      mercuryIntensity,
      mercuryRadius,
      fov, 
      sunLightIntensity, 
      
    });
  }, [
    earthSimulationTimeScale, 
    earthSemiMajorAxis, 
    earthEccentricity, 
    earthShininess, 
    earthRadius,
    mercurySimulationTimeScale,
    mercurySemiMajorAxis,
    mercuryEccentricity,
    mercuryIntensity,
    mercuryRadius,
    fov, 
    sunLightIntensity, 
  ]);

  return (
    <div className="custom-leva-container">
      <Leva />
    </div>
  );
};

export default SolarSystemGUI;
