'use client'

import React, { useRef, useState, useCallback } from 'react'
import { Application } from '@splinetool/runtime'
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

    // onLoad 触发时 Spline SDK 已初始化，但 WebGL 渲染管线
    // 可能还没把首帧像素刷到屏幕。等 3 个 rAF 帧确保管线冲刷完毕。
    let frame = 0
    const flush = () => {
      frame++
      if (frame >= 3) {
        setFirstFrameReady(true)
        onReady?.()
      } else {
        requestAnimationFrame(flush)
      }
    }
    requestAnimationFrame(flush)
  }, [onReady])

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
          opacity: firstFrameReady ? 1 : 0,
        }}
      />
    </div>
  )
}
