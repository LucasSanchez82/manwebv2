"use client";

import React, { Suspense, useEffect, useRef } from "react";
import { useGLTF, OrbitControls, Stage } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { ErrorBoundary } from "react-error-boundary";
import * as THREE from "three";

interface ModelViewerProps {
  modelPath: string;
}

function Model({ modelPath }: ModelViewerProps) {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef<THREE.Group>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      useGLTF.preload(modelPath);
    };
  }, [modelPath]);

  useFrame(() => {
    if (modelRef.current) {
      // Adjust rotation speed by changing the division factor
      modelRef.current.rotation.y = scrollRef.current * 0.002;
    }
  });

  return <primitive ref={modelRef} object={scene} dispose={null} />;
}

function FallbackComponent({ error }: { error: Error }) {
  return (
    <div className="text-red-500 p-4">
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
    </div>
  );
}

export function ModelViewer({ modelPath }: ModelViewerProps) {
  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <div className="w-full h-full bg-gray-900">
        <Canvas shadows camera={{ position: [5, 5, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.6}>
              <Model modelPath={modelPath} />
            </Stage>
          </Suspense>
        </Canvas>
      </div>
    </ErrorBoundary>
  );
}
