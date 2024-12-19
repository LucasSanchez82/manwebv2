'use client'
import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei'
import { AnimationProvider, useAnimationContext } from './AnimationContext'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'

function Scene() {
  const { scene, animations } = useGLTF('/chest/Chest.glb')
  const { actions, names } = useAnimations(animations, scene)
  const { currentAnimation, setNames } = useAnimationContext()

  useEffect(() => {
    setNames(names)
    return () => {
      // Cleanup
      actions &&
        Object.values(actions).forEach((action) => {
          if (action) {
            action.stop()
          } else {
            console.log('No action')
          }
        })
    }
  }, [names, setNames, actions])

  useEffect(() => {
    if (currentAnimation && actions[currentAnimation]) {
      const action = actions[currentAnimation]
      action.reset().fadeIn(4).play()
      return () => {
        action.fadeOut(4)
      }
    }
  }, [currentAnimation, actions])

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <OrbitControls
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />
      <primitive object={scene} />
    </>
  )
}

function ModelContent() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Scene />
    </Suspense>
  )
}

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center text-white">
      Loading...
    </div>
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

function ButtonTriggerAnimation() {
  const { names, setCurrentAnimation, currentAnimation } = useAnimationContext()

  return (
    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
      {names.map((name) => (
        <button
          key={name}
          onClick={() => setCurrentAnimation(name)}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            currentAnimation === name
              ? 'bg-blue-600 text-white'
              : 'bg-blue-100 text-blue-900 hover:bg-blue-200'
          } `}
        >
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </button>
      ))}
    </div>
  )
}

const ModelViewer = () => {
  const [names, setNames] = useState<string[]>([])
  const [currentAnimation, setCurrentAnimation] = useState<string | null>(null)

  return (
    <AnimationProvider
      value={{
        names,
        setNames,
        currentAnimation,
        setCurrentAnimation,
      }}
    >
      <div className="relative h-96 w-full rounded-lg bg-gray-900">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => setCurrentAnimation(null)}
        >
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            className="h-full w-full"
          >
            <ModelContent />
          </Canvas>
        </ErrorBoundary>
        <ButtonTriggerAnimation />
      </div>
    </AnimationProvider>
  )
}

export default ModelViewer
