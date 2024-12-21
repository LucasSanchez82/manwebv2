'use client'
import { memo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'

function Scene() {
  const { scene, animations } = useGLTF('/chest/Chest.glb')
  const { actions } = useAnimations(animations, scene)
  useFrame(() => {
    const scrollProgress = getScrollProgress()
    // Find the chest animation
    const chestAnimation = actions['Chest_Open']
    if (chestAnimation) {
      // Set animation time based on scroll
      chestAnimation.time = chestAnimation.getClip().duration * scrollProgress
      chestAnimation.play()
      // Pause to prevent auto-updating of time
      chestAnimation.paused = true
    }

    // Rotate the scene based on scroll
    scene.rotation.y = getRotateY(scrollProgress)
  })

  return (
    <group position={[0, -1, 0]} scale={[1, 1, 1]}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <primitive object={scene} />
    </group>
  )
}
function getScrollProgress() {
  //to calc the scollProgress we didn't use the viewportHeight = window.innerHeight to stop early the animation
  // Get scroll progress between 0 and 1

  const currentYPosition =
    window.scrollY ||
    document.documentElement.scrollTop ||
    document.body.scrollTop
  const pageHeight =
    document.documentElement.scrollHeight || document.body.scrollHeight
  const currentPagePosition = currentYPosition
  const scrollProgress = Math.min(currentPagePosition / pageHeight, 1)
  return scrollProgress
}

function getRotateY(scrollProgress: number) {
  // Rotate the scene based on scroll
  //Math.PI corresponds to 180 degrees
  const initialRotation = Math.PI * -0.15
  const scrollRapidity = Math.PI * 2.25 // 2.25 is the number of turns
  return initialRotation + scrollProgress * scrollRapidity
}

Scene.displayName = 'ChestScene'
export default memo(Scene)
