'use client'

import React, { useRef, useState, useCallback, useEffect } from 'react'
import { Application } from '@splinetool/runtime'

// 不再用 dynamic import，直接同步导入——避免 dynamic 的 loading 空档期
// Spline 组件本身只会在客户端渲染（整个组件在 page.tsx 中被 dynamic ssr:false 包裹）
import Spline from '@splinetool/react-spline'

export default function SplineScene({
  className = '',
  style,
  onReady,
}: {
  className?: string
  style?: React.CSSProperties
  onReady?: () => void
}) {
  const splineRef = useRef<Application | null>(null)
  const [firstFrameReady, setFirstFrameReady] = useState(false)

  const onLoad = useCallback((spline: Application) => {
    splineRef.current = spline
  }, [])

  // 轮询 canvas 像素：检测到非全黑/非透明帧后才算真正 ready
  useEffect(() => {
    if (firstFrameReady) return

    let raf = 0
    let attempts = 0
    const maxAttempts = 300 // 最多等 ~5 秒（60fps × 300）

    const check = () => {
      attempts++
      const canvas = document.querySelector<HTMLCanvasElement>(
        '.spline-scene-forward-target canvas'
      )
      if (!canvas) {
        raf = requestAnimationFrame(check)
        return
      }

      try {
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        if (!ctx) {
          raf = requestAnimationFrame(check)
          return
        }

        const w = canvas.width
        const h = canvas.height
        if (w === 0 || h === 0) {
          raf = requestAnimationFrame(check)
          return
        }

        // 采样 4 个角 + 中心点，检测是否有非黑像素
        const points = [
          [Math.floor(w * 0.5), Math.floor(h * 0.4)],  // 中心偏上（机器人头部位置）
          [Math.floor(w * 0.3), Math.floor(h * 0.3)],
          [Math.floor(w * 0.7), Math.floor(h * 0.3)],
          [Math.floor(w * 0.5), Math.floor(h * 0.6)],
          [Math.floor(w * 0.2), Math.floor(h * 0.5)],
        ]

        let hasContent = false
        for (const [px, py] of points) {
          const pixel = ctx.getImageData(px, py, 1, 1).data
          // 只要任意通道 > 5 就算有内容（排除纯黑/透明）
          if (pixel[0] > 5 || pixel[1] > 5 || pixel[2] > 5) {
            hasContent = true
            break
          }
        }

        if (hasContent || attempts >= maxAttempts) {
          setFirstFrameReady(true)
          onReady?.()
          return
        }
      } catch {
        // canvas 跨域或未就绪，继续轮询
      }

      raf = requestAnimationFrame(check)
    }

    raf = requestAnimationFrame(check)
    return () => cancelAnimationFrame(raf)
  }, [firstFrameReady, onReady])

  return (
    <div
      className={`spline-scene-forward-target fixed inset-0 overflow-hidden ${className}`}
      style={{ zIndex: 1, ...style }}
    >
      <Spline
        scene="/models/scene.splinecode"
        onLoad={onLoad}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          // 首帧渲染完成后立即显示，不做 opacity transition
          opacity: firstFrameReady ? 1 : 0,
        }}
      />
    </div>
  )
}
