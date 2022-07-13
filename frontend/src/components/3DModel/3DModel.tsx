import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Stage, CameraShake } from "@react-three/drei";
import { getPerformanceSetting } from "../../services/getPerfomanceSetting";

function Model({ src }: { src: string }) {
  const gltfMy = useGLTF(src);
  return <primitive object={gltfMy.scene} />;
}

const ModelContainer = ({ average }: { average: number }) => {
  const setting = getPerformanceSetting(average);
  return (
    <div className="model-wrapper">
      <Suspense>
        <div className="thought">{setting.text}</div>
        <Canvas
          style={{ height: "500px", width: "400px" }}
          shadows
          camera={{ zoom: 1.2 }}
        >
          <pointLight />
          <Stage
            contactShadow={{ opacity: 1, blur: 2 }}
            position={[90, 0, 180]}
          >
            <Model src={setting.src} />
          </Stage>

          <OrbitControls enableZoom={false} makeDefault />
          <CameraShake
            maxYaw={0.05}
            maxPitch={0.15}
            maxRoll={0.15}
            yawFrequency={0.15}
            pitchFrequency={0.15}
            rollFrequency={0.15}
            intensity={0.55}
            decayRate={0.15}
          />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default ModelContainer;
