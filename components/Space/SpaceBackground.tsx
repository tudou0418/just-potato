'use client'

import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// 星星粒子 - 使用 imperative 方式设置 buffer
function Stars({ count = 2000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const r = 80 + Math.random() * 120
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      const colorChoice = Math.random()
      if (colorChoice < 0.6) {
        colors[i * 3] = 1; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 1
      } else if (colorChoice < 0.8) {
        colors[i * 3] = 0.7; colors[i * 3 + 1] = 0.85; colors[i * 3 + 2] = 1
      } else {
        colors[i * 3] = 1; colors[i * 3 + 1] = 0.95; colors[i * 3 + 2] = 0.7
      }
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const t = state.clock.elapsedTime
    pointsRef.current.rotation.y = t * 0.005
    pointsRef.current.rotation.x = Math.sin(t * 0.003) * 0.02
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.5}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

// 星云效果
function Nebula() {
  const materialRef = useRef<THREE.ShaderMaterial>(null!)

  const shaderData = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color('#1a0533') },
      uColor2: { value: new THREE.Color('#0a1628') },
      uColor3: { value: new THREE.Color('#0f172a') },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      varying vec2 vUv;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 5; i++) {
          v += a * noise(p);
          p *= 2.0;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = vUv;
        float t = uTime * 0.02;

        float n1 = fbm(uv * 3.0 + t * 0.3);
        float n2 = fbm(uv * 5.0 - t * 0.2 + 10.0);
        float n3 = fbm(uv * 8.0 + t * 0.1 + 20.0);

        vec3 color = mix(uColor1, uColor2, n1);
        color = mix(color, uColor3, n2 * 0.5);
        color += vec3(0.05, 0.02, 0.08) * n3;

        float alpha = (n1 + n2) * 0.15;
        alpha = smoothstep(0.0, 0.4, alpha);

        gl_FragColor = vec4(color, alpha);
      }
    `,
  }), [])

  useFrame((state) => {
    if (!materialRef.current) return
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
  })

  return (
    <mesh position={[0, 0, -60]} scale={[120, 80, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        {...shaderData}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// 闪烁亮星
function TwinklingStars({ count = 100 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const r = 30 + Math.random() * 70
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const t = state.clock.elapsedTime
    const mat = pointsRef.current.material as THREE.PointsMaterial
    mat.opacity = 0.7 + Math.sin(t * 0.5) * 0.15
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={1.5}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export default function SpaceBackground() {
  return (
    <group>
      <Stars count={2000} />
      <TwinklingStars count={80} />
      <Nebula />
    </group>
  )
}
