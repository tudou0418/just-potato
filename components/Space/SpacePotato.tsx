'use client'

import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// 土豆超人主体组件
export default function SpacePotato({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const groupRef = useRef<THREE.Group>(null!)
  const capeRef = useRef<THREE.Group>(null!)
  const bodyRef = useRef<THREE.Mesh>(null!)
  const leftArmRef = useRef<THREE.Group>(null!)
  const rightArmRef = useRef<THREE.Group>(null!)
  const capeClothRefs = useRef<THREE.Mesh[]>([])

  // 颜色配置
  const colors = useMemo(() => ({
    body: '#FDD8B1',        // 土豆色
    bodyDark: '#E8C088',    // 土豆暗部
    cape: '#2563eb',        // 品牌蓝披风
    capeInner: '#1e40af',   // 披风内侧
    eye: '#1a1c1e',         // 眼睛
    eyeWhite: '#ffffff',
    blush: 'rgba(244, 63, 94, 0.35)',
    leaf: '#22c55e',        // 头顶小芽
    belt: '#f59e0b',        // 腰带
    boots: '#dc2626',       // 靴子
  }), [])

  // 披风几何 - 多段布料模拟
  const capeSegments = useMemo(() => {
    const segments = []
    const width = 3.5
    const segCount = 6
    const segWidth = width / segCount

    for (let i = 0; i < segCount; i++) {
      segments.push({
        x: -width / 2 + segWidth * i + segWidth / 2,
        width: segWidth,
        index: i,
      })
    }
    return segments
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime

    // 飞行浮动动画
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.3
    groupRef.current.position.x = Math.cos(t * 0.5) * 0.15

    // 身体微倾
    groupRef.current.rotation.z = Math.sin(t * 0.6) * 0.05
    groupRef.current.rotation.x = -0.15 + Math.sin(t * 0.4) * 0.03

    // 呼吸效果
    if (bodyRef.current) {
      const breathe = 1 + Math.sin(t * 1.5) * 0.015
      bodyRef.current.scale.set(breathe, breathe, breathe)
    }

    // 手臂摆动
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = -0.3 + Math.sin(t * 1.2) * 0.1
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = 0.3 - Math.sin(t * 1.2 + 0.5) * 0.1
    }

    // 披风飘动
    capeClothRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const wave = Math.sin(t * 2 + i * 0.8) * 0.15
      const wave2 = Math.cos(t * 1.5 + i * 0.6) * 0.1
      mesh.rotation.x = -0.3 + wave
      mesh.position.z = -0.5 - i * 0.06
      mesh.position.y = -0.3 - wave2 * 0.3
    })
  })

  return (
    <group ref={groupRef} position={[0, 0.5, 0]} scale={1.8}>
      {/* === 身体 === */}
      <group>
        {/* 土豆主体 */}
        <mesh ref={bodyRef}>
          <sphereGeometry args={[1, 32, 24]} />
          <meshStandardMaterial
            color={colors.body}
            roughness={0.7}
            metalness={0.05}
          />
        </mesh>

        {/* 身体暗部（底部渐变） */}
        <mesh position={[0, -0.3, 0]} scale={[1.02, 0.6, 1.02]}>
          <sphereGeometry args={[1, 32, 24]} />
          <meshStandardMaterial
            color={colors.bodyDark}
            roughness={0.8}
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>

      {/* === 头顶小芽 === */}
      <group position={[0, 1.1, 0]}>
        <mesh position={[0.15, 0.2, 0]} rotation={[0, 0, 0.3]}>
          <capsuleGeometry args={[0.06, 0.3, 8, 8]} />
          <meshStandardMaterial color={colors.leaf} roughness={0.6} />
        </mesh>
        <mesh position={[-0.15, 0.25, 0]} rotation={[0, 0, -0.4]}>
          <capsuleGeometry args={[0.05, 0.25, 8, 8]} />
          <meshStandardMaterial color={colors.leaf} roughness={0.6} />
        </mesh>
      </group>

      {/* === 表情 === */}
      <group position={[0, 0.15, 0.85]}>
        {/* 左眼 */}
        <group position={[-0.28, 0.15, 0]}>
          <mesh>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial color={colors.eyeWhite} roughness={0.3} />
          </mesh>
          {/* 瞳孔 */}
          <mesh position={[0.03, 0.02, 0.12]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color={colors.eye} roughness={0.2} />
          </mesh>
          {/* 高光 */}
          <mesh position={[0.06, 0.06, 0.15]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
          </mesh>
        </group>

        {/* 右眼 */}
        <group position={[0.28, 0.15, 0]}>
          <mesh>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial color={colors.eyeWhite} roughness={0.3} />
          </mesh>
          <mesh position={[0.03, 0.02, 0.12]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color={colors.eye} roughness={0.2} />
          </mesh>
          <mesh position={[0.06, 0.06, 0.15]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
          </mesh>
        </group>

        {/* 眉毛 - 英雄式 */}
        <mesh position={[-0.28, 0.35, 0.05]} rotation={[0, 0, -0.2]}>
          <boxGeometry args={[0.25, 0.05, 0.05]} />
          <meshStandardMaterial color={colors.eye} roughness={0.5} />
        </mesh>
        <mesh position={[0.28, 0.35, 0.05]} rotation={[0, 0, 0.2]}>
          <boxGeometry args={[0.25, 0.05, 0.05]} />
          <meshStandardMaterial color={colors.eye} roughness={0.5} />
        </mesh>

        {/* 嘴巴 - 自信微笑 */}
        <mesh position={[0, -0.18, 0.1]}>
          <torusGeometry args={[0.15, 0.03, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#e11d48" roughness={0.4} />
        </mesh>

        {/* 腮红 */}
        <mesh position={[-0.5, -0.05, 0.3]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#f87171"
            transparent
            opacity={0.2}
            roughness={0.8}
          />
        </mesh>
        <mesh position={[0.5, -0.05, 0.3]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#f87171"
            transparent
            opacity={0.2}
            roughness={0.8}
          />
        </mesh>
      </group>

      {/* === 腰带 === */}
      <mesh position={[0, -0.1, 0]}>
        <torusGeometry args={[1.02, 0.08, 8, 32]} />
        <meshStandardMaterial color={colors.belt} roughness={0.3} metalness={0.6} />
      </mesh>
      {/* 腰带扣 */}
      <mesh position={[0, -0.1, 1.0]}>
        <boxGeometry args={[0.2, 0.2, 0.1]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* === 左臂（前伸飞行姿势） === */}
      <group ref={leftArmRef} position={[-1.1, 0.3, 0.3]} rotation={[0.3, 0, -0.3]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.15, 0.7, 8, 8]} />
          <meshStandardMaterial color={colors.body} roughness={0.7} />
        </mesh>
        {/* 拳头 */}
        <mesh position={[-0.45, 0, 0]}>
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshStandardMaterial color={colors.body} roughness={0.7} />
        </mesh>
      </group>

      {/* === 右臂（后摆） === */}
      <group ref={rightArmRef} position={[1.1, 0.2, -0.2]} rotation={[-0.2, 0, 0.3]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.15, 0.7, 8, 8]} />
          <meshStandardMaterial color={colors.body} roughness={0.7} />
        </mesh>
        <mesh position={[0.45, 0, 0]}>
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshStandardMaterial color={colors.body} roughness={0.7} />
        </mesh>
      </group>

      {/* === 腿 === */}
      {/* 左腿 */}
      <group position={[-0.35, -1.1, 0]} rotation={[0.2, 0, 0.1]}>
        <mesh>
          <capsuleGeometry args={[0.14, 0.5, 8, 8]} />
          <meshStandardMaterial color={colors.body} roughness={0.7} />
        </mesh>
        {/* 靴子 */}
        <mesh position={[0, -0.4, 0.05]}>
          <capsuleGeometry args={[0.17, 0.2, 8, 8]} />
          <meshStandardMaterial color={colors.boots} roughness={0.4} metalness={0.2} />
        </mesh>
      </group>

      {/* 右腿 */}
      <group position={[0.35, -1.1, 0]} rotation={[-0.15, 0, -0.1]}>
        <mesh>
          <capsuleGeometry args={[0.14, 0.5, 8, 8]} />
          <meshStandardMaterial color={colors.body} roughness={0.7} />
        </mesh>
        <mesh position={[0, -0.4, 0.05]}>
          <capsuleGeometry args={[0.17, 0.2, 8, 8]} />
          <meshStandardMaterial color={colors.boots} roughness={0.4} metalness={0.2} />
        </mesh>
      </group>

      {/* === 披风 === */}
      <group ref={capeRef} position={[0, 0.3, -0.8]}>
        {capeSegments.map((seg, i) => (
          <mesh
            key={i}
            ref={(el) => { if (el) capeClothRefs.current[i] = el }}
            position={[seg.x, 0, 0]}
            rotation={[-0.3, 0, 0]}
          >
            <planeGeometry args={[seg.width * 0.95, 1.8, 1, 8]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? colors.cape : colors.capeInner}
              side={THREE.DoubleSide}
              roughness={0.6}
              metalness={0.1}
              transparent
              opacity={0.9}
            />
          </mesh>
        ))}
      </group>

      {/* === 飞行能量拖尾 === */}
      <group position={[0, 0, -2]}>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh
            key={i}
            position={[0, 0, -i * 0.5]}
          >
            <sphereGeometry args={[0.15 - i * 0.015, 8, 8]} />
            <meshStandardMaterial
              color="#60a5fa"
              emissive="#3b82f6"
              emissiveIntensity={0.5 - i * 0.05}
              transparent
              opacity={0.6 - i * 0.06}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}
