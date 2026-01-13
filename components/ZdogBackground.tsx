'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Github, Twitter, Mail, MapPin, MousePointer2 } from 'lucide-react'

// Zdog 库加载地址
const ZDOG_SCRIPT_URL = 'https://unpkg.com/zdog@1/dist/zdog.dist.min.js';

interface ZdogBackgroundProps {
  isDark: boolean
}

const ZdogBackground = ({ isDark }: ZdogBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const illoRef = useRef<any>(null)
  const mousePos = useRef({ x: 0, y: 0, active: false })

  useEffect(() => {
    const script = document.createElement('script')
    script.src = ZDOG_SCRIPT_URL
    script.async = true
    script.onload = () => initZdog()
    document.head.appendChild(script)

    function initZdog() {
      const Zdog = (window as any).Zdog
      if (!Zdog || !canvasRef.current) return

      const TAU = Zdog.TAU
      let isDragging = false

      // 1. 背景虚化粒子系统
      const BokehShape = Zdog.Shape.subclass({
        bokehSize: 8,
        bokehLimit: 80,
      })

      BokehShape.prototype.updateBokeh = function() {
        this.bokeh = Math.abs(this.sortValue) / this.bokehLimit
        this.bokeh = Math.max(0, Math.min(1, this.bokeh))
        return this.bokeh
      }

      const originalRenderCanvasDot = Zdog.Shape.prototype.renderCanvasDot
      BokehShape.prototype.renderCanvasDot = function(ctx: any) {
        this.updateBokeh()
        const alpha = Math.pow(1 - this.bokeh, 2) * 0.4 + 0.1
        ctx.globalAlpha = alpha
        originalRenderCanvasDot.apply(this, arguments)
        ctx.globalAlpha = 1
      }

      // 2. 颜色配置
      const colors = isDark ? {
        potato: '#FFCC99',
        brand: '#60a5fa',
        dot: 'rgba(255, 255, 255, 0.1)',
        eye: '#1a1c1e',
        leaf: '#4ade80',
        blush: 'rgba(251, 113, 133, 0.4)',
        tip: '#f87171',
        highlight: 'rgba(255, 255, 255, 0.2)',
        pinkA: '#f472b6',
        pinkB: 'rgba(244, 114, 182, 0.4)'
      } : {
        potato: '#FDD8B1',
        brand: '#2563eb',
        dot: 'rgba(15, 23, 42, 0.05)',
        eye: '#1a1c1e',
        leaf: '#22c55e',
        blush: 'rgba(244, 63, 94, 0.3)',
        tip: '#ef4444',
        highlight: 'rgba(255, 255, 255, 0.4)',
        pinkA: '#db2777',
        pinkB: 'rgba(219, 39, 119, 0.3)'
      }

      // 3. 场景初始化
      const illo = new Zdog.Illustration({
        element: canvasRef.current,
        zoom: 4,
        dragRotate: true,
        resize: true, // 🟢 关键：允许 Zdog 自动处理 Canvas 尺寸缩放与居中
        rotate: { y: -TAU/8 },
        onDragStart: () => { isSpinning = false; isDragging = true },
        onDragEnd: () => {
          isDragging = false
          clearTimeout(timer)
          timer = setTimeout(() => { isSpinning = true }, 1000)
        }
      })
      illoRef.current = illo

      const handleMouseMove = (e: MouseEvent) => {
        if (!canvasRef.current) return
        const rect = canvasRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1
        mousePos.current = { x: x * 100, y: y * 100, active: true }
      }
      canvasRef.current.addEventListener('mousemove', handleMouseMove)

      // --- 核心容器 ---
      const mainAnchor = new Zdog.Anchor({
        addTo: illo,
        translate: { y: 0 }
      })

      // 土豆身体
      const potatoBody = new Zdog.Shape({
        path: [{ y: -6 }, { y: 6 }],
        addTo: mainAnchor,
        stroke: 22,
        color: colors.potato,
      })

      // 高光效果
      new Zdog.Ellipse({
        addTo: potatoBody,
        width: 8, height: 6, stroke: 0, fill: true,
        color: colors.highlight,
        translate: { x: -4, y: -7, z: 6 },
        rotate: { x: TAU/4, z: TAU/16 }
      })

      // 头顶小芽
      const leafAnchor = new Zdog.Anchor({
        addTo: mainAnchor,
        translate: { y: -16 },
      })
      new Zdog.Ellipse({
        addTo: leafAnchor,
        width: 4, height: 8, stroke: 2, color: colors.leaf, fill: true,
        rotate: { z: TAU/8, x: TAU/16 }, translate: { x: 2 }
      })
      new Zdog.Ellipse({
        addTo: leafAnchor,
        width: 4, height: 8, stroke: 2, color: colors.leaf, fill: true,
        rotate: { z: -TAU/8, x: -TAU/16 }, translate: { x: -2 }
      })

      // 小脚
      const foot = new Zdog.Shape({
        addTo: mainAnchor,
        stroke: 6, color: colors.potato,
        translate: { y: 15, x: -5, z: 2 }
      })
      foot.copy({ translate: { y: 15, x: 5, z: 2 } })

      // 小手
      const leftArm = new Zdog.Shape({
        path: [{ x: 0 }, { x: -3 }],
        addTo: mainAnchor,
        stroke: 3.5, color: colors.potato,
        translate: { x: -10, y: 3 },
        rotate: { z: TAU/16 }
      })
      const rightArm = leftArm.copy({
        translate: { x: 10, y: 3 },
        rotate: { z: -TAU/16 },
        path: [{ x: 0 }, { x: 3 }]
      })

      // 腮红
      const blush = new Zdog.Ellipse({
        addTo: potatoBody,
        width: 3, height: 2, stroke: 1, color: colors.blush, fill: true,
        translate: { x: -7, y: 1, z: 9 },
      })
      blush.copy({ translate: { x: 7, y: 1, z: 9 } })

      // --- 交互反馈元素 ---
      const tipAnchor = new Zdog.Anchor({
        addTo: mainAnchor,
        translate: { y: -32, z: 2 },
        visible: false,
      })
      new Zdog.Shape({
        path: [{ y: -4 }, { y: -1 }],
        addTo: tipAnchor, stroke: 3, color: colors.tip,
      })
      new Zdog.Shape({
        addTo: tipAnchor, stroke: 3, translate: { y: 2 }, color: colors.tip,
      })

      // 表情控制组
      const leftBrow = new Zdog.Shape({
        path: [{ x: -1 }, { x: 1 }],
        addTo: potatoBody,
        translate: { x: -4, y: -6, z: 9 },
        stroke: 1.5, color: colors.eye, visible: false
      })
      const rightBrow = leftBrow.copy({ translate: { x: 4, y: -6, z: 9 } })

      const leftEye = new Zdog.Ellipse({
        addTo: potatoBody,
        diameter: 1, translate: { x: -4, y: -2, z: 10 },
        stroke: 2.5, color: colors.eye, fill: true,
      })
      const rightEye = leftEye.copy({ translate: { x: 4, y: -2, z: 10 } })

      const mouth = new Zdog.Shape({
        path: [{ x: -2, y: 2.5 }, { arc: [{ x: 0, y: 4.5 }, { x: 2, y: 2.5 }] }],
        addTo: potatoBody,
        translate: { z: 10 }, closed: false, stroke: 1.5, color: '#e11d48',
      })

      // 正面 Hi 面板
      const hiPanel = new Zdog.Box({
        addTo: mainAnchor,
        width: 20, height: 10, depth: 1,
        translate: { y: -34, z: 14 },
        stroke: 1, color: colors.brand, fill: true,
      })
      new Zdog.Shape({
        path: [
          { x: -5, y: -3 }, { x: -5, y: 3 },
          { move: { x: -5, y: 0 } }, { line: { x: -1, y: 0 } },
          { move: { x: -1, y: -3 } }, { line: { x: -1, y: 3 } },
          { move: { x: 3, y: -3 } }, { line: { x: 3, y: 3 } },
        ],
        addTo: hiPanel,
        translate: { z: 1 },
        stroke: 1.5, color: '#fff',
      })

      // --- 背部粉色粒子环绕 ---
      const backAnchor = new Zdog.Anchor({
        addTo: mainAnchor,
        translate: { z: -8 }
      })

      // 粒子轨道容器
      const particleOrbit = new Zdog.Anchor({
        addTo: backAnchor,
      })

      // 创建一串环绕的小球
      const particleCount = 28
      for (let i = 0; i < particleCount; i++) {
        const orbitAngle = (TAU / particleCount) * i
        const radius = 20 + Math.sin(orbitAngle * 3) * 4
        const yPos = Math.cos(orbitAngle * 2) * 6

        const pAnchor = new Zdog.Anchor({
          addTo: particleOrbit,
          rotate: { y: orbitAngle },
        })

        new Zdog.Shape({
          addTo: pAnchor,
          translate: { z: radius, y: yPos },
          stroke: 2.5 + Math.random() * 2,
          color: i % 2 === 0 ? colors.pinkA : colors.pinkB,
        })
      }

      // 4. 背景环境虚化粒子
      for (let i = 0; i < 40; i++) {
        const rotor = new Zdog.Anchor({
          addTo: illo,
          rotate: { y: Math.random() * TAU, x: Math.random() * TAU }
        })
        new BokehShape({
          path: [{ z: 60 + Math.random() * 50 }],
          addTo: rotor,
          stroke: 0.2 + Math.random(),
          color: colors.dot,
          bokehSize: 10,
        })
      }

      // 5. 动画逻辑
      let isSpinning = true
      let timer: any
      function animate() {
        const time = Date.now()
        if (isSpinning) {
          illo.rotate.y += 0.005
          illo.rotate.x = Math.sin(time * 0.001) * 0.03
          leafAnchor.rotate.z = Math.sin(time * 0.002) * 0.15
          leftArm.rotate.z = TAU/16 + Math.sin(time * 0.002) * 0.05
          rightArm.rotate.z = -TAU/16 - Math.sin(time * 0.002) * 0.05

          // 粉色粒子环绕动画
          particleOrbit.rotate.y += 0.018
          particleOrbit.rotate.x = Math.sin(time * 0.001) * 0.25
        }

        const dist = Math.sqrt(Math.pow(mousePos.current.x, 2) + Math.pow(mousePos.current.y, 2))
        const activeInteraction = isDragging || (mousePos.current.active && dist < 45)

        if (activeInteraction) {
          tipAnchor.visible = true
          tipAnchor.translate.x = (Math.random() - 0.5) * 1.5
          tipAnchor.translate.y = -32 + (Math.random() - 0.5) * 1.5

          leftEye.stroke = 4
          rightEye.stroke = 4
          leftBrow.visible = true
          rightBrow.visible = true
          leftBrow.translate.y = -7.5
          rightBrow.translate.y = -7.5
          mouth.path = [{ x: -1.5, y: 3.5 }, { x: 0, y: 3.5 }, { x: 1.5, y: 3.5 }]
          potatoBody.stroke = 23
          leftArm.rotate.z = TAU/4
          rightArm.rotate.z = -TAU/4

          // 受惊时粉色粒子加速
          particleOrbit.rotate.y += 0.07
          particleOrbit.scale = 1.3
        } else {
          tipAnchor.visible = false
          leftEye.stroke = 2.5
          rightEye.stroke = 2.5
          leftBrow.visible = false
          rightBrow.visible = false
          potatoBody.stroke = 22
          mouth.path = [{ x: -2, y: 2.5 }, { arc: [{ x: 0, y: 4.5 }, { x: 2, y: 2.5 }] }]
          particleOrbit.scale = 1.0
        }

        illo.updateGraph()
        illo.renderGraph()
        requestAnimationFrame(animate)
      }
      animate()
    }

    return () => {}
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
    />
  )
}

export { ZdogBackground }
