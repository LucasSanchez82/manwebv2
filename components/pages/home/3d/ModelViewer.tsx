"use client";

import React, { Suspense, useEffect, useRef, useCallback, memo } from "react";
import { useGLTF, OrbitControls, Stage, Html } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { ErrorBoundary } from "react-error-boundary";
import * as THREE from "three";
import { useThrottledCallback } from "use-debounce";

interface ModelViewerProps {
  modelPath: string;
  rotationSpeed?: number;
  mouseRotationFactor?: number;
  scrollRotationFactor?: number;
}

// Loader component using Html from drei
const LoadingSpinner = memo(() => (
  <Html center>
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
  </Html>
));

// Optimize model component with memoization
const Model = memo(
  ({
    modelPath,
    rotationSpeed = 0.1,
    mouseRotationFactor = 0.35,
    scrollRotationFactor = 0.004,
  }: ModelViewerProps) => {
    const { scene } = useGLTF(modelPath);
    const modelRef = useRef<THREE.Group>(null);
    const scrollRef = useRef(0);
    const mouseRef = useRef({ x: 0, y: 0 });

    // Throttle event handlers to improve performance
    const handleScroll = useThrottledCallback(() => {
      scrollRef.current = window.scrollY;
    }, 100);

    const handleMouseMove = useThrottledCallback((event: MouseEvent) => {
      mouseRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      };
    }, 50);

    useEffect(() => {
      if (modelRef.current) {
        // Initial rotation setup
        modelRef.current.rotation.set(Math.PI, Math.PI, 0);
      }

      window.addEventListener("scroll", handleScroll);
      window.addEventListener("mousemove", handleMouseMove);

      // Preload model
      useGLTF.preload(modelPath);

      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, [modelPath, handleScroll, handleMouseMove]);

    // Optimize frame updates with RAF
    useFrame(() => {
      if (!modelRef.current) return;

      modelRef.current.rotation.y = THREE.MathUtils.lerp(
        modelRef.current.rotation.y,
        mouseRef.current.x * 0.1 + Math.PI,
        rotationSpeed
      );

      modelRef.current.rotation.x = THREE.MathUtils.lerp(
        modelRef.current.rotation.x,
        mouseRef.current.y * 0.1,
        rotationSpeed
      );

      // Apply scroll-based rotation
      const scrollRotation = (scrollRef.current / 10) * scrollRotationFactor;
      modelRef.current.rotation.y += scrollRotation;
    });

    return <primitive ref={modelRef} object={scene} dispose={null} />;
  }
);

const FallbackComponent = memo(({ error }: { error: Error }) => (
  <div className="text-red-500 p-4 bg-red-100 rounded-lg">
    <h2 className="font-bold">Error Loading Model:</h2>
    <pre className="mt-2 text-sm">{error.message}</pre>
  </div>
));

export const ModelViewer = memo(
  ({
    modelPath,
    rotationSpeed,
    mouseRotationFactor,
    scrollRotationFactor,
  }: ModelViewerProps) => {
    return (
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <div className="w-full h-full bg-gray-900">
          <Canvas
            shadows
            dpr={[1, 2]}
            performance={{ min: 0.5 }}
            camera={{
              position: [5, 5, 5],
              zoom: 1.75,
              near: 0.1,
              far: 1000,
            }}
          >
            <Suspense fallback={<LoadingSpinner />}>
              <Stage
                environment="city"
                intensity={0.6}
                preset="rembrandt"
                shadows={{ type: "contact", blur: 2, distance: 0.1 }}
              >
                <Model
                  modelPath={modelPath}
                  rotationSpeed={rotationSpeed}
                  mouseRotationFactor={mouseRotationFactor}
                  scrollRotationFactor={scrollRotationFactor}
                />
              </Stage>
            </Suspense>
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={0}
            />
          </Canvas>
        </div>
      </ErrorBoundary>
    );
  }
);

// Add display names for better debugging
Model.displayName = "Model";
LoadingSpinner.displayName = "LoadingSpinner";
FallbackComponent.displayName = "FallbackComponent";
ModelViewer.displayName = "ModelViewer";
