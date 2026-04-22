'use client'

import React, { useRef, useState, useEffect, Suspense, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import SpacePotato from './SpacePotato'
import SpaceBackground from './SpaceBackground'
import SpaceDecorations from './SpaceDecorations'

// 滚动驱动的相机和场景控制器
function ScrollCameraController({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree()
  const targetPos = useRef(new THREE.Vector3(0, 2, 15))
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0))

  useFrame(() => {
    // 根据滚动进度控制相机位置
    const p = scrollProgress

    // 相机轨迹：从正前方→俯视→侧面→远景
    const x = Math.sin(p * Math.PI * 2) * 5
    const y = 2 + Math.sin(p * Math.PI) * 8
    const z = 15 - p * 10

    targetPos.current.set(x, y, Math.max(z, 5))
    camera.position.lerp(targetPos.current, 0.05)

    // 始终看向中心偏下
    targetLookAt.current.set(0, 0, -5)
    const currentLookAt = new THREE.Vector3()
    camera.getWorldDirection(currentLookAt)
    camera.lookAt(targetLookAt.current)
  })

  return null
}

// 加载指示器
function Loader() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color="#60a5fa" wireframe />
    </mesh>
  )
}

// 鼠标交互跟踪
function MouseTracker({ groupRef }: { groupRef: React.RefObject<THREE.Group | null> }) {
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    if (!groupRef.current) return
    // 轻微跟随鼠标旋转
    groupRef.current.rotation.y += (mouse.current.x * 0.1 - groupRef.current.rotation.y) * 0.02
    groupRef.current.rotation.x += (mouse.current.y * 0.05 - groupRef.current.rotation.x) * 0.02
  })

  return null
}

// 场景内容
function SceneContent({ scrollProgress }: { scrollProgress: number }) {
  const sceneGroupRef = useRef<THREE.Group>(null!)

  return (
    <>
      {/* 环境光 */}
      <ambientLight intensity={0.3} color="#e0e7ff" />

      {/* 主方向光（太阳光） */}
      <directionalLight
        position={[10, 15, 10]}
        intensity={1.2}
        color="#fff7ed"
        castShadow
      />

      {/* 补光 */}
      <pointLight position={[-8, 5, 5]} intensity={0.5} color="#60a5fa" />
      <pointLight position={[5, -5, 8]} intensity={0.3} color="#a78bfa" />

      {/* 背光（轮廓光） */}
      <pointLight position={[0, 0, -10]} intensity={0.6} color="#3b82f6" />

      <group ref={sceneGroupRef}>
        <SpaceBackground />
        <SpaceDecorations />
        <SpacePotato scrollProgress={scrollProgress} />
      </group>

      <MouseTracker groupRef={sceneGroupRef} />
      <ScrollCameraController scrollProgress={scrollProgress} />
    </>
  )
}

export default function SpaceScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isDark, setIsDark] = useState(true)

  // 监听主题变化
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkTheme()

    const obs = new MutationObserver(checkTheme)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  // 滚动监听
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const totalScroll = containerRef.current.scrollHeight - windowHeight

      if (totalScroll <= 0) return

      const progress = Math.max(0, Math.min(1, -rect.top / totalScroll))
      setScrollProgress(progress)
    }

    // Intersection Observer 检测可见性
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  // 亮色模式下不渲染3D场景
  if (!isDark) return null

  return (
    <div ref={containerRef} className="relative w-full h-screen">
      <Canvas
        camera={{ position: [0, 2, 15], fov: 60, near: 0.1, far: 500 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: '#0a0e1a',
          pointerEvents: isVisible ? 'auto' : 'none',
        }}
      >
        <Suspense fallback={<Loader />}>
          <SceneContent scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  )
}
