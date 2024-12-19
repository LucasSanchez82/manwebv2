'use client'
import { Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  useGLTF,
  useAnimations,
  Html,
  OrbitControls,
  useScroll,
  ScrollControls,
} from '@react-three/drei'

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
  const scroll = useScroll()

  useFrame(() => {
    // Get scroll progress between 0 and 1
    const scrollProgress = scroll.offset

    // Find the chest animation
    const chestAnimation = actions['Chest_Open']
    if (chestAnimation) {
      // Set animation time based on scroll
      chestAnimation.time = chestAnimation.getClip().duration * scrollProgress
      chestAnimation.play()
      // Pause to prevent auto-updating of time
      chestAnimation.paused = true
    }
  })

  return (
    <group position={[0, -1, 0]} scale={[1.5, 1.5, 1.5]}>
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
const ModelViewer = () => {
  return (
    <div className="relative h-[200vh] w-full">
      <div className="sticky top-0 h-screen w-full rounded-lg bg-gray-900">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          className="h-full w-full"
        >
          <ScrollControls pages={1}>
            <ModelContent />
          </ScrollControls>
        </Canvas>
      </div>
    </div>
  )
}

export default ModelViewer
