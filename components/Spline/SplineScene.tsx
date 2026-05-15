'use client'

import React, { useRef, useCallback } from 'react'
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

  const onLoad = useCallback((spline: Application) => {
    splineRef.current = spline

    // onLoad 后等几帧让 WebGL 管线冲刷首帧，再通知 loading 屏可以消失
    let frame = 0
    const flush = () => {
      frame++
      if (frame >= 6) {
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
        }}
      />
    </div>
  )
}
