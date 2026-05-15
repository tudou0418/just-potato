'use client'

import React, { useRef, useState, useCallback, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Application } from '@splinetool/runtime'
import { SplineLoadingScreen } from './SplineLoadingScreen'

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
})

export default function SplineScene({
  className = '',
  style,
}: {
  className?: string
  style?: React.CSSProperties
}) {
  const splineRef = useRef<Application | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showLoader, setShowLoader] = useState(true)

  const onLoad = useCallback((spline: Application) => {
    splineRef.current = spline
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (!isLoaded) return

    const timeoutId = window.setTimeout(() => {
      setShowLoader(false)
    }, 520)

    return () => window.clearTimeout(timeoutId)
  }, [isLoaded])

  return (
    <div
      className={`spline-scene-forward-target fixed inset-0 overflow-hidden transition-transform duration-700 ease-out ${className}`}
      style={{ zIndex: 1, ...style }}
    >
      {/* 加载骨架屏 — 使用深空色匹配星空背景 */}
      {showLoader && (
        <div
          className={`absolute inset-0 z-[2] transition-opacity duration-500 ${
            isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <SplineLoadingScreen />
        </div>
      )}

      <Spline
        scene="/models/scene.splinecode"
        onLoad={onLoad}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.65s ease-out',
        }}
      />
    </div>
  )
}
