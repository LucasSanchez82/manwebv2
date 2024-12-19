'use client'
import { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, useAnimations, Html, OrbitControls } from '@react-three/drei'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'

function LoadingSpinner() {
  return (
    <Html center>
      <div className="text-white">Loading...</div>
    </Html>
  )
}

function Scene() {
  const { scene, animations } = useGLTF('/chest/Chest.glb')
  const { actions, names } = useAnimations(animations, scene)

  useEffect(() => {
    if (actions && actions['Chest_Open']) {
      const action = actions['Chest_Open']
      action.reset().fadeIn(0).play()
      return () => {
        action.fadeOut(0.5)
      }
    }
  }, [actions])

  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <OrbitControls
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />
      <primitive object={scene} />
    </group>
  )
}

function ModelContent() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Scene />
    </Suspense>
  )
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        className="mt-4 rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
      >
        Try again
      </button>
    </div>
  )
}

const ModelViewer = () => {
  return (
    <div className="relative h-96 w-full rounded-lg bg-gray-900">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          className="h-full w-full"
        >
          <ModelContent />
        </Canvas>
      </ErrorBoundary>
    </div>
  )
}

export default ModelViewer
