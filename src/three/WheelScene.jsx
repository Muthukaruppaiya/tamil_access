import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { Wheel } from './CarScene'

function SpinningWheel() {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.4
  })
  return (
    <group ref={ref}>
      <Wheel radius={1.3} width={0.8} rimColor="#dce4ea" />
    </group>
  )
}

export default function WheelScene() {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 4.6], fov: 40 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.7} />
      <spotLight position={[4, 5, 5]} intensity={40} angle={0.5} penumbra={1} />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={3} position={[0, 4, 2]} scale={[8, 2, 1]} />
      </Environment>
      <SpinningWheel />
    </Canvas>
  )
}
