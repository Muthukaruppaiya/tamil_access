import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'

const BODY_DEPTH = 1.7
const BEVEL = 0.08

function useBodyGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(-2.1, 0.25)
    s.lineTo(-2.12, 0.78)
    s.quadraticCurveTo(-2.08, 0.96, -1.9, 0.98)
    s.lineTo(-1.25, 1.02)
    s.lineTo(-0.82, 1.42)
    s.quadraticCurveTo(-0.2, 1.5, 0.38, 1.44)
    s.lineTo(1.02, 1.02)
    s.lineTo(1.92, 0.9)
    s.quadraticCurveTo(2.18, 0.86, 2.18, 0.6)
    s.lineTo(2.12, 0.25)
    s.lineTo(1.78, 0.25)
    s.absarc(1.3, 0.36, 0.48, 0, Math.PI, false)
    s.lineTo(0.82, 0.25)
    s.lineTo(-0.82, 0.25)
    s.absarc(-1.3, 0.36, 0.48, 0, Math.PI, false)
    s.lineTo(-1.78, 0.25)
    s.lineTo(-2.1, 0.25)
    const g = new THREE.ExtrudeGeometry(s, { depth: BODY_DEPTH, bevelEnabled: true, bevelThickness: BEVEL, bevelSize: BEVEL, bevelSegments: 5, curveSegments: 32 })
    g.translate(0, 0, -BODY_DEPTH / 2)
    return g
  }, [])
}

function useWindowGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(-1.08, 1.06)
    s.lineTo(-0.76, 1.37)
    s.quadraticCurveTo(-0.2, 1.43, 0.34, 1.39)
    s.lineTo(0.9, 1.06)
    s.lineTo(-1.08, 1.06)
    const depth = BODY_DEPTH + BEVEL * 2 + 0.03
    const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false, curveSegments: 16 })
    g.translate(0, 0, -depth / 2)
    return g
  }, [])
}

export function Wheel({ position = [0, 0, 0], radius = 0.4, spin = true, rimColor = '#d9dde3', width = 0.3 }) {
  const ref = useRef()
  useFrame((_, dt) => {
    if (spin && ref.current) ref.current.rotation.z -= dt * 3
  })
  const spokes = 6
  return (
    <group position={position}>
      <group ref={ref}>
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[radius, radius, width, 48]} />
          <meshStandardMaterial color="#5b6570" roughness={0.9} />
        </mesh>
        <mesh>
          <torusGeometry args={[radius * 0.98, width * 0.18, 16, 64]} />
          <meshStandardMaterial color="#4b5563" roughness={0.8} />
        </mesh>
        {[1, -1].map((side) => (
          <group key={side} position={[0, 0, (side * width) / 2 + side * 0.005]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[radius * 0.68, radius * 0.68, 0.02, 48]} />
              <meshStandardMaterial color="#6b7580" metalness={0.6} roughness={0.4} />
            </mesh>
            <mesh rotation={[0, 0, 0]} position={[0, 0, side * 0.015]}>
              <torusGeometry args={[radius * 0.66, 0.025, 12, 48]} />
              <meshStandardMaterial color={rimColor} metalness={1} roughness={0.15} />
            </mesh>
            {Array.from({ length: spokes }).map((_, i) => (
              <mesh key={i} rotation={[0, 0, (i / spokes) * Math.PI * 2]} position={[0, 0, side * 0.02]}>
                <boxGeometry args={[radius * 1.28, 0.06, 0.03]} />
                <meshStandardMaterial color={rimColor} metalness={1} roughness={0.18} />
              </mesh>
            ))}
            <mesh position={[0, 0, side * 0.03]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[radius * 0.16, radius * 0.16, 0.04, 24]} />
              <meshStandardMaterial color="#e2b007" metalness={0.5} roughness={0.35} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  )
}

function Car({ color = '#c9d6e0' }) {
  const group = useRef()
  const body = useBodyGeometry()
  const windows = useWindowGeometry()

  useFrame((state, dt) => {
    const g = group.current
    if (!g) return
    g.userData.base = (g.userData.base ?? -0.6) + dt * 0.25
    const targetY = g.userData.base + state.pointer.x * 0.6
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetY, 0.08)
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -state.pointer.y * 0.08, 0.06)
  })

  const zSide = BODY_DEPTH / 2 + BEVEL
  return (
    <group ref={group} position={[0, -0.6, 0]}>
      <mesh geometry={body} castShadow>
        <meshPhysicalMaterial color={color} metalness={0.55} roughness={0.22} clearcoat={1} clearcoatRoughness={0.05} />
      </mesh>
      <mesh geometry={windows}>
        <meshPhysicalMaterial color="#8aa0b3" metalness={0.4} roughness={0.12} clearcoat={0.6} />
      </mesh>
      <mesh position={[0.75, 1.31, 0]} rotation={[0, 0, -0.58]}>
        <boxGeometry args={[0.74, 0.03, BODY_DEPTH - 0.1]} />
        <meshPhysicalMaterial color="#8aa0b3" metalness={0.4} roughness={0.12} clearcoat={0.6} />
      </mesh>
      <mesh position={[-1.1, 1.29, 0]} rotation={[0, 0, 0.75]}>
        <boxGeometry args={[0.54, 0.03, BODY_DEPTH - 0.1]} />
        <meshPhysicalMaterial color="#8aa0b3" metalness={0.4} roughness={0.12} clearcoat={0.6} />
      </mesh>

      {[0.58, -0.58].map((z) => (
        <mesh key={`hl${z}`} position={[2.22, 0.72, z]}>
          <boxGeometry args={[0.06, 0.1, 0.42]} />
          <meshStandardMaterial color="#fff" emissive="#ffffff" emissiveIntensity={4} toneMapped={false} />
        </mesh>
      ))}
      <mesh position={[2.24, 0.42, 0]}>
        <boxGeometry args={[0.04, 0.12, 0.9]} />
        <meshStandardMaterial color="#6b7580" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[-2.2, 0.86, 0]}>
        <boxGeometry args={[0.05, 0.06, BODY_DEPTH - 0.1]} />
        <meshStandardMaterial color="#f4c27a" emissive="#f4c27a" emissiveIntensity={1.2} />
      </mesh>
      {[1, -1].map((side) => (
        <mesh key={`strip${side}`} position={[0.2, 0.55, side * (zSide + 0.005)]}>
          <boxGeometry args={[2.6, 0.02, 0.01]} />
          <meshStandardMaterial color="#fff" emissive="#ffffff" emissiveIntensity={1.5} toneMapped={false} />
        </mesh>
      ))}
      {[1, -1].map((side) => (
        <mesh key={`mirror${side}`} position={[0.78, 1.05, side * (zSide + 0.08)]}>
          <boxGeometry args={[0.16, 0.1, 0.12]} />
          <meshPhysicalMaterial color={color} metalness={0.55} roughness={0.22} clearcoat={1} />
        </mesh>
      ))}

      {[
        [1.3, 0.36, zSide - 0.12],
        [1.3, 0.36, -zSide + 0.12],
        [-1.3, 0.36, zSide - 0.12],
        [-1.3, 0.36, -zSide + 0.12],
      ].map((p, i) => (
        <Wheel key={i} position={p} radius={0.4} width={0.3} />
      ))}
    </group>
  )
}

function Turntable() {
  return (
    <group position={[0, -0.62, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[3.2, 64]} />
        <meshStandardMaterial color="#fff3df" metalness={0.1} roughness={0.6} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <ringGeometry args={[3.05, 3.2, 96]} />
        <meshStandardMaterial color="#e2b007" roughness={0.4} />
      </mesh>
    </group>
  )
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <spotLight position={[5, 8, 5]} angle={0.45} penumbra={1} intensity={60} castShadow color="#ffffff" />
      <pointLight position={[-4, 3, -3]} intensity={18} color="#fff3df" />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={4} position={[0, 5, 0]} rotation-x={Math.PI / 2} scale={[10, 3, 1]} />
        <Lightformer form="rect" intensity={2} position={[-6, 1, 0]} rotation-y={Math.PI / 2} scale={[10, 2, 1]} />
        <Lightformer form="rect" intensity={2} position={[6, 1, 0]} rotation-y={-Math.PI / 2} scale={[10, 2, 1]} />
      </Environment>
    </>
  )
}

export default function CarScene() {
  return (
    <Canvas shadows dpr={[1, 1.75]} camera={{ position: [6, 2.5, 6], fov: 38 }} gl={{ antialias: true, alpha: true }}>
      <Lights />
      <Car />
      <Turntable />
      <ContactShadows position={[0, -0.6, 0]} opacity={0.25} scale={9} blur={2.8} far={2} />
    </Canvas>
  )
}
