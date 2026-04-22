'use client'

import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// 星球组件
function Planet({
  position,
  radius,
  color,
  rotationSpeed = 0.002,
  hasRing = false,
  ringColor = '#94a3b8',
}: {
  position: [number, number, number]
  radius: number
  color: string
  rotationSpeed?: number
  hasRing?: boolean
  ringColor?: string
}) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    meshRef.current.rotation.y = t * rotationSpeed
  })

  return (
    <group position={position}>
      {/* 星球主体 */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, 32, 24]} />
        <meshStandardMaterial
          color={color}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* 大气层光晕 */}
      <mesh scale={1.15}>
        <sphereGeometry args={[radius, 32, 24]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* 星环 */}
      {hasRing && (
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[radius * 1.6, radius * 0.15, 2, 64]} />
          <meshStandardMaterial
            color={ringColor}
            transparent
            opacity={0.4}
            roughness={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  )
}

// 小行星
function Asteroids({ count = 30 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null!)

  const asteroids = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: [
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40,
        -20 - Math.random() * 40,
      ] as [number, number, number],
      scale: 0.1 + Math.random() * 0.4,
      rotationSpeed: 0.5 + Math.random() * 2,
      rotationAxis: [
        Math.random(),
        Math.random(),
        Math.random(),
      ] as [number, number, number],
      color: Math.random() > 0.5 ? '#64748b' : '#475569',
    }))
  }, [count])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.children.forEach((child, i) => {
      const ast = asteroids[i]
      if (!ast) return
      child.rotation.x = t * ast.rotationSpeed * ast.rotationAxis[0]
      child.rotation.y = t * ast.rotationSpeed * ast.rotationAxis[1]
    })
  })

  return (
    <group ref={groupRef}>
      {asteroids.map((ast, i) => (
        <mesh key={i} position={ast.position} scale={ast.scale}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={ast.color}
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>
      ))}
    </group>
  )
}

// 能量粒子 - 使用 imperative 方式创建 BufferGeometry
function EnergyParticles({ count = 200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)
  const velocitiesRef = useRef<Float32Array>(null!)

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40

      velocities[i * 3] = (Math.random() - 0.5) * 0.02
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    velocitiesRef.current = velocities
    return geo
  }, [count])

  useFrame(() => {
    if (!pointsRef.current || !velocitiesRef.current) return
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    const arr = posAttr.array as Float32Array
    const velocities = velocitiesRef.current

    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3]
      arr[i * 3 + 1] += velocities[i * 3 + 1]
      arr[i * 3 + 2] += velocities[i * 3 + 2]

      // 边界回弹
      if (Math.abs(arr[i * 3]) > 25) velocities[i * 3] *= -1
      if (Math.abs(arr[i * 3 + 1]) > 20) velocities[i * 3 + 1] *= -1
      if (Math.abs(arr[i * 3 + 2]) > 25) velocities[i * 3 + 2] *= -1
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.15}
        color="#60a5fa"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

// 漂浮的太空碎片
function SpaceDebris({ count = 15 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null!)

  const debris = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: [
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30,
        -10 - Math.random() * 30,
      ] as [number, number, number],
      rotation: Math.random() * Math.PI,
      scale: 0.2 + Math.random() * 0.5,
      type: Math.floor(Math.random() * 3),
    }))
  }, [count])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.children.forEach((child, i) => {
      child.rotation.x = t * 0.3 + i
      child.rotation.z = t * 0.2 + i * 0.5
    })
  })

  return (
    <group ref={groupRef}>
      {debris.map((d, i) => (
        <mesh key={i} position={d.position} scale={d.scale} rotation={[d.rotation, d.rotation / 2, 0]}>
          {d.type === 0 && <boxGeometry args={[1, 0.2, 0.2]} />}
          {d.type === 1 && <cylinderGeometry args={[0.3, 0.3, 1, 6]} />}
          {d.type === 2 && <torusGeometry args={[0.5, 0.1, 8, 16]} />}
          <meshStandardMaterial
            color="#334155"
            roughness={0.7}
            metalness={0.4}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function SpaceDecorations() {
  return (
    <group>
      {/* 星球们 */}
      <Planet
        position={[-15, 5, -25]}
        radius={4}
        color="#1e40af"
        rotationSpeed={0.003}
      />
      <Planet
        position={[20, -8, -35]}
        radius={6}
        color="#dc2626"
        rotationSpeed={0.002}
        hasRing
        ringColor="#fbbf24"
      />
      <Planet
        position={[-25, -12, -40]}
        radius={3}
        color="#059669"
        rotationSpeed={0.004}
      />
      <Planet
        position={[12, 15, -50]}
        radius={8}
        color="#7c3aed"
        rotationSpeed={0.001}
        hasRing
        ringColor="#c084fc"
      />

      {/* 小行星带 */}
      <Asteroids count={40} />

      {/* 能量粒子 */}
      <EnergyParticles count={150} />

      {/* 太空碎片 */}
      <SpaceDebris count={12} />
    </group>
  )
}
