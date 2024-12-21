'use client'
import { Suspense, lazy, memo, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

interface R3FCanvas extends HTMLCanvasElement {
  __r3f?: {
    renderer: THREE.WebGLRenderer
  }
}
// Lazy load the model content
const ModelContent = lazy(() => import('./Scene.Chest'))

const ChestViewer = () => {
  // Cleanup effect
  useEffect(() => {
    return () => {
      // Dispose of any Three.js resources
      if (typeof window !== 'undefined') {
        const renderer = document.querySelector('canvas') as R3FCanvas
        if (renderer?.__r3f?.renderer) {
          renderer?.__r3f?.renderer.dispose()
        }
      }
    }
  }, [])

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0">
        <Canvas
          dpr={[1, 2]} // Limit pixel ratio for better performance
          performance={{ min: 0.5 }} // Lower frame rate when inactive
          camera={{ position: [0, 0, 5], fov: 50 }}
          className="h-full w-full"
          gl={{
            powerPreference: 'high-performance',
            antialias: false, // Disable antialiasing if not crucial
            alpha: false, // Disable transparency if not needed
          }}
        >
          <color attach="background" args={['hsl(221, 39%, 11%)']} />
          <Suspense fallback={<LoadingSpinner />}>
            <ModelContent />
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}

// Optimized loading spinner with minimal DOM elements
const LoadingSpinner = memo(() => (
  <Html center>
    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-white" />
  </Html>
))

LoadingSpinner.displayName = 'ChestLoader'
ChestViewer.displayName = 'ChestModelViewer'

export default memo(ChestViewer) // Memoize the main component
