"use client";

import React, { Suspense, useEffect } from "react";
import { useGLTF, OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ErrorBoundary } from "react-error-boundary";

interface ModelViewerProps {
  modelPath: string;
}
type OrbitControlsProps = React.ComponentProps<typeof OrbitControls>;

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

function FallbackComponent({ error }: { error: Error }) {
  return (
    <div className="text-red-500 p-4">
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
    </div>
  );
}

export function ModelViewer({
  modelPath,
  ...orbitControlsProps
}: ModelViewerProps & OrbitControlsProps) {
  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <div className="w-full h-full bg-gray-900">
        <Canvas
          shadows
          dpr={[1, 2]} // Optimize for device pixel ratio
          camera={{ position: [0, 0, 10], fov: 50 }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: true,
          }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener("webglcontextlost", (event) => {
              event.preventDefault();
              console.error("WebGL context lost", event);
            });

            gl.domElement.addEventListener("webglcontextrestored", () => {
              console.log("WebGL context restored");
            });
          }}
        >
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.6}>
              <Model modelPath={modelPath} />
            </Stage>
            <OrbitControls
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 1.5}
              {...orbitControlsProps}
            />
          </Suspense>
        </Canvas>
      </div>
    </ErrorBoundary>
  );
}
