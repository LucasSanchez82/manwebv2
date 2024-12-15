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
    if (modelRef.current) {
      modelRef.current.rotation.x = Math.PI / 15;
      modelRef.current.rotation.y = Math.PI;
      modelRef.current.rotation.z = 0;
    }
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
      modelRef.current.rotation.y = Math.PI + scrollRef.current * 0.004;
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
        <Canvas shadows camera={{ position: [5, 5, 5], zoom: 1.25 }}>
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
