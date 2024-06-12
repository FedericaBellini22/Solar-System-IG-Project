import React from 'react';
import { useControls, Leva } from 'leva';
import './SolarSystemGUI.css'; // Importa il file CSS

const SolarSystemGUI = ({ data, handleUpdate }) => {
  const { simulationTimeScale, semiMajorAxis, eccentricity, fov, sunLightIntensity, earthShininess, earthRadius } = useControls({
    simulationTimeScale: { value: data.simulationTimeScale, min: 1, max: 120 },
    semiMajorAxis: { value: data.semiMajorAxis, min: 1, max: 20 },
    eccentricity: { value: data.eccentricity, min: 0, max: 1 },
    fov: { value: data.fov, min: 10, max: 100 },
    sunLightIntensity: { value: data.sunLightIntensity, min: 0, max: 1000 },
    earthShininess: {value: data.earthShininess, min: 0, max: 5000},
    earthRadius: {value: data.earthRadius, min: 0, max: 10}
  });

  React.useEffect(() => {
    handleUpdate({ simulationTimeScale, semiMajorAxis, eccentricity, fov, sunLightIntensity, earthShininess, earthRadius });
  }, [simulationTimeScale, semiMajorAxis, eccentricity, fov, sunLightIntensity, earthShininess, earthRadius]);

  return (
    <div className="custom-leva-container">
      <Leva />
    </div>
  );
};

export default SolarSystemGUI;
