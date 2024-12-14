"use client";

import { useEffect } from "react";
import { useGLTF, OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

interface ModelViewerProps {
  modelPath: string;
}

function Model({ modelPath }: ModelViewerProps) {
  const { scene } = useGLTF(modelPath);

  useEffect(() => {
    return () => {
      // Cleanup when component unmounts
      useGLTF.preload(modelPath);
    };
  }, [modelPath]);

  return <primitive object={scene} dispose={null} />;
}

export function ModelViewer({ modelPath }: ModelViewerProps) {
  return (
    <div className="w-full h-[600px] bg-gray-900 rounded-lg overflow-hidden">
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 50 }}>
        <Stage environment="city" intensity={0.6}>
          <Model modelPath={modelPath} />
        </Stage>
        <OrbitControls
          autoRotate
          enableZoom={true}
          enablePan={true}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}
