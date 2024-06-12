import { useHelper } from "@react-three/drei";
import AnimatedStars from "./AnimatedStars";
import { useRef } from "react";
import Earth from "./Earth";
import * as THREE from "three";
import Sun from "./Sun";
import Mercury from "./Mercury";
import Venus from "./Venus";
import Mars from "./Mars";
import { Perf } from "r3f-perf";
import CameraPositionLogging from "./helpers/CameraPositionLogging";

const MainContainer = ({ controls }) => {
    const directionalLightRef = useRef();
    const directionalLightRefTwo = useRef();
    useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, 'hotpink');
    useHelper(directionalLightRefTwo, THREE.DirectionalLightHelper, 1, 'hotpink');

    return (
        <>
            <Perf className="perf-container" />
            <CameraPositionLogging event='mousedown' />
            <AnimatedStars />
            <Sun sunLightIntensity={controls.sunLightIntensity} />
            <Earth 
              displacementScale={0.15} 
              simulationTimeScale={controls.simulationTimeScale}
              semiMajorAxis={controls.semiMajorAxis}
              eccentricity={controls.eccentricity}
              earthShininess={controls.earthShininess}
              earthRadius={controls.earthRadius}
            />
            <Mercury />
            <Mars />
            <Venus />
        </>
    );
}

export default MainContainer;
