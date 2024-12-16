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
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.rotation.x = Math.PI;
      modelRef.current.rotation.y = Math.PI;
      modelRef.current.rotation.z = 0;
    }
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position between -1 and 1
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      useGLTF.preload(modelPath);
    };
  }, [modelPath]);

  useFrame(() => {
    if (modelRef.current) {
      //   Adjust rotation speed by changing the division factor
      modelRef.current.rotation.y = Math.PI + scrollRef.current * 0.004;
      modelRef.current.rotation.x = THREE.MathUtils.lerp(
        modelRef.current.rotation.x,
        mouseRef.current.y * 0.1,
        0.1
      );
      modelRef.current.rotation.y = THREE.MathUtils.lerp(
        modelRef.current.rotation.y,
        mouseRef.current.x * 0.35 + Math.PI,
        0.1
      );
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
        <Canvas shadows camera={{ position: [5, 5, 5], zoom: 1.75 }}>
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
