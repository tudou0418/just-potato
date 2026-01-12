// 'use client'

// import React, { useEffect, useRef, useState } from 'react'
// import { Github, Twitter, Mail, MapPin, Link as LinkIcon } from 'lucide-react'

// const NeuralNetwork = () => {
//   const globeRef = useRef<HTMLDivElement>(null)
//   const [isDark, setIsDark] = useState(true)

//   useEffect(() => {
//     const checkTheme = () => {
//       const isDarkMode = document.documentElement.classList.contains('dark')
//       setIsDark(isDarkMode)
//     }

//     checkTheme()
//     const observer = new MutationObserver(checkTheme)
//     observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

//     return () => observer.disconnect()
//   }, [])

//   useEffect(() => {
//     const container = globeRef.current
//     if (!container) return

//     const loadGlobe = async () => {
//       const GlobeModule = await import('globe.gl')
//       const GlobeClass = GlobeModule.default

//       const ARC_COUNT = 20
//       const arcsData = [...Array(ARC_COUNT).keys()].map(() => ({
//         startLat: (Math.random() - 0.5) * 180,
//         startLng: (Math.random() - 0.5) * 360,
//         endLat: (Math.random() - 0.5) * 180,
//         endLng: (Math.random() - 0.5) * 360,
//         color: isDark ? '#2563eb' : '#3b82f6'
//       }))

//       const ringsData = arcsData.map(d => ({ lat: d.startLat, lng: d.startLng }))

//       const globe = new GlobeClass(container, {
//         width: container.offsetWidth,
//         height: container.offsetHeight,
//         backgroundColor: isDark ? '#04060a' : '#fcfcfd',
//         atmosphereColor: isDark ? '#2563eb' : '#3b82f6',
//         atmosphereAltitude: 0.15,
//         hexPolygonsData: [],
//         hexPolygonResolution: 3,
//         hexPolygonMargin: 0.3,
//         hexPolygonColor: () => isDark ? `#${Math.random() > 0.5 ? '2563eb' : '60a5fa'}` : `#${Math.random() > 0.5 ? '3b82f6' : '60a5fa'}`,
//         arcsData: arcsData,
//         arcColor: () => isDark ? '#2563eb' : '#3b82f6',
//         arcDashLength: 0.4,
//         arcDashGap: 4,
//         arcDashInitialGap: () => Math.random() * 5,
//         arcDashAnimateTime: 1000,
//         arcStroke: 0.5,
//         ringsData: ringsData,
//         ringColor: () => isDark ? '#ffffff' : '#000000',
//         ringMaxRadius: 5,
//         ringPropagationSpeed: 3,
//         ringRepeatPeriod: 1000,
//         autoRotate: true,
//         autoRotateSpeed: 0.5,
//         enableZoom: false,
//         enablePan: false,
//       })

//       fetch('https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
//         .then(res => res.json())
//         .then(data => {
//           globe.hexPolygonsData(data.features)
//         })

//       const handleResize = () => {
//         globe.width(container.offsetWidth)
//         globe.height(container.offsetHeight)
//       }

//       window.addEventListener('resize', handleResize)

//       let mouseX = 0, mouseY = 0
//       const handleMouseMove = (e: MouseEvent) => {
//         mouseX = (e.clientX - window.innerWidth / 2) / 1000
//         mouseY = (e.clientY - window.innerHeight / 2) / 1000
//       }

//       document.addEventListener('mousemove', handleMouseMove)

//       const moveCamera = () => {
//         const camera = globe.camera()
//         camera.position.x += (mouseX * 50 - camera.position.x) * 0.05
//         camera.position.y += (-mouseY * 50 - camera.position.y) * 0.05
//         camera.lookAt(globe.scene().position)
//         requestAnimationFrame(moveCamera)
//       }
//       moveCamera()

//       return () => {
//         window.removeEventListener('resize', handleResize)
//         document.removeEventListener('mousemove', handleMouseMove)
//       }
//     }

//     loadGlobe()
//   }, [isDark])

//   return (
//     <div className="relative w-full h-[45vh] overflow-hidden" ref={globeRef}>
//       <div className="relative z-10 h-full flex flex-col items-center justify-center pointer-events-none px-6">
//         <div className="bg-ui-surface/80 backdrop-blur-md border border-ui-border/30 rounded-smooth p-6 shadow-brand pointer-events-auto animate-reveal">
//           <div className="flex flex-col items-center text-center space-y-3">
//             <div className="relative group">
//               <div className="absolute -inset-1 bg-gradient-to-r from-brand to-brand-dark rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
//               <img
//                 src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maple"
//                 alt="Avatar"
//                 className="relative w-20 h-20 rounded-full border-2 border-ui-surface bg-ui-surface object-cover"
//               />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold text-ui-text tracking-tight">土豆</h1>
//               <p className="text-ui-text-muted text-xs mt-1 leading-relaxed line-clamp-1 uppercase tracking-widest font-mono">
//                 Creative Bull-Horse
//               </p>
//             </div>
//           </div>

//           <div className="flex justify-center gap-3 my-4">
//             <a href="#" className="p-2 bg-ui-border/20 text-ui-text-muted hover:text-white hover:bg-brand rounded-md transition-all">
//               <Github size={16} />
//             </a>
//             <a href="#" className="p-2 bg-ui-border/20 text-ui-text-muted hover:text-white hover:bg-brand rounded-md transition-all">
//               <Twitter size={16} />
//             </a>
//             <a href="#" className="p-2 bg-ui-border/20 text-ui-text-muted hover:text-white hover:bg-brand rounded-md transition-all">
//               <Mail size={16} />
//             </a>
//           </div>

//           <div className="border-t border-ui-border/60 mb-4"></div>

//           <div className="space-y-2 px-1">
//             <div className="flex items-center gap-2 text-xs text-ui-text-muted group">
//               <span className="text-ui-text-muted/70 group-hover:text-brand transition-colors"><MapPin size={12} /></span>
//               <span className="truncate">ChongQin, China</span>
//             </div>
//             <div className="flex items-center gap-2 text-xs text-ui-text-muted group">
//               <span className="text-ui-text-muted/70 group-hover:text-brand transition-colors"><LinkIcon size={12} /></span>
//               <a href="https://just-potato.netlify.app/" target="_blank" rel="noreferrer" className="hover:text-brand transition-colors truncate">
//                 just-potato.netlify.app
//               </a>
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-2 mt-4 justify-center">
//             {['Next.js', 'React', 'Rust', 'TS'].map(tag => (
//               <span key={tag} className="px-2 py-1 bg-ui-border/40 text-ui-text-muted text-xs font-medium rounded-md border border-ui-border/20">
//                 {tag}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export { NeuralNetwork }

//---------------------------------
'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Github, Twitter, Mail, MapPin, Link as LinkIcon } from 'lucide-react'

// 动画变量存储在 Ref 中以避免重绘丢失
interface MousePos {
  x: number;
  y: number;
}

const NeuralNetwork = () => {
  const globeRef = useRef<HTMLDivElement>(null)
  const [isDark, setIsDark] = useState(true)
  const requestRef = useRef<number | undefined>(undefined)
  const mouseRef = useRef<MousePos>({ x: 0, y: 0 })

  // 1. 主题监听
  useEffect(() => {
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark')
      setIsDark(isDarkMode)
    }
    checkTheme()
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  // 2. Globe.gl 初始化
  useEffect(() => {
    const container = globeRef.current
    if (!container) return

    let globeInstance: any = null

    const initGlobe = async () => {
      // 动态导入以支持 Next.js SSR
      const GlobeModule = await import('globe.gl')
      const Globe = GlobeModule.default

      // 生成随机弧线数据 (模拟全球连接)
      const ARC_COUNT = 15
      const arcsData = [...Array(ARC_COUNT).keys()].map(() => ({
        startLat: (Math.random() - 0.5) * 160,
        startLng: (Math.random() - 0.5) * 360,
        endLat: (Math.random() - 0.5) * 160,
        endLng: (Math.random() - 0.5) * 360,
        color: isDark ? ['#2563eb', '#60a5fa', '#ffffff'] : ['#3b82f6', '#2563eb', '#1e40af']
      }))

      // 生成脉冲环数据
      const ringsData = arcsData.slice(0, 8).map(d => ({ lat: d.startLat, lng: d.startLng }))

      // 创建实例
      const GlobeConstructor = Globe as any
      globeInstance = new GlobeConstructor(container)
        .width(container.offsetWidth)
        .height(container.offsetHeight)
        .backgroundColor('rgba(0,0,0,0)') // 使用透明背景以适配 CSS 变量
        .showAtmosphere(true)
        .atmosphereColor(isDark ? '#2563eb' : '#3b82f6')
        .atmosphereAltitude(0.15)
        
        // 陆地表现：六边形网格
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.3)
        .hexPolygonColor(() => isDark 
          ? `#${Math.random() > 0.5 ? '2563eb' : '1e40af'}` 
          : `#${Math.random() > 0.5 ? '3b82f6' : '60a5fa'}`
        )
        
        // 弧线动效
        .arcsData(arcsData)
        .arcColor('color')
        .arcDashLength(0.4)
        .arcDashGap(4)
        .arcDashInitialGap(() => Math.random() * 5)
        .arcDashAnimateTime(1500)
        .arcStroke(0.5)
        
        // 脉冲环
        .ringsData(ringsData)
        .ringColor(() => isDark ? '#ffffff' : '#2563eb')
        .ringMaxRadius(4)
        .ringPropagationSpeed(2)
        .ringRepeatPeriod(1200)

      // 自动旋转
      globeInstance.controls().autoRotate = true
      globeInstance.controls().autoRotateSpeed = 0.6
      globeInstance.controls().enableZoom = true
      globeInstance.controls().enablePan = false
      globeInstance.controls().minDistance = 200
      globeInstance.controls().maxDistance = 400

      // 设置相机初始距离（更近一点）
      globeInstance.pointOfView({ lat: 0, lng: 0, altitude: 250 })

      // 异步加载国家地理边界 (GeoJSON)
      fetch('https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
        .then(res => res.json())
        .then(data => {
          if (globeInstance) globeInstance.hexPolygonsData(data.features)
        })

      // 相机跟随鼠标偏移的动画循环
      const moveCamera = () => {
        if (globeInstance) {
          const camera = globeInstance.camera()
          camera.position.x += (mouseRef.current.x * 60 - camera.position.x) * 0.05
          camera.position.y += (-mouseRef.current.y * 60 - camera.position.y) * 0.05
          camera.lookAt(globeInstance.scene().position)
        }
        requestRef.current = requestAnimationFrame(moveCamera)
      }
      moveCamera()
    }

    initGlobe()

    // 监听器与清理
    const handleResize = () => {
      if (globeInstance && container) {
        globeInstance.width(container.offsetWidth)
        globeInstance.height(container.offsetHeight)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX - window.innerWidth / 2) / 1000,
        y: (e.clientY - window.innerHeight / 2) / 1000
      }
    }

    window.addEventListener('resize', handleResize)
    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('mousemove', handleMouseMove)
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
      if (globeInstance) {
        // 清理 Three.js 资源
        const scene = globeInstance.scene()
        if (scene) {
          scene.traverse((object: any) => {
            if (object.geometry) object.geometry.dispose()
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach((material: any) => material.dispose())
              } else {
                object.material.dispose()
              }
            }
          })
        }
      }
    }
  }, [isDark])

  return (
    <div className="relative w-full h-[45vh] overflow-hidden bg-ui-surface transition-colors duration-500">
      
      {/* 地球背景 - 占据整个容器 */}
      <div className="absolute inset-0 overflow-hidden" ref={globeRef}></div>
      
      {/* UI 叠层 - 绝对定位在地球上方 */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center pointer-events-none px-6">
        <div className="bg-ui-surface/40 backdrop-blur-xl border border-ui-border/30 rounded-smooth p-6 shadow-brand pointer-events-auto animate-reveal transition-all hover:bg-ui-surface/60 max-w-xs w-full">
          
          {/* 头像部分 */}
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="relative group/avatar">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-brand to-brand-dark rounded-full blur opacity-20 group-hover/avatar:opacity-40 transition duration-1000"></div>
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maple"
                alt="Avatar"
                className="relative w-16 h-16 rounded-full border-2 border-ui-surface bg-ui-surface object-cover shadow-sm"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-ui-text tracking-tight">土豆</h1>
              <p className="text-ui-text-muted text-[10px] mt-1 leading-relaxed uppercase tracking-[0.2em] font-mono opacity-80">
                Creative Bull-Horse
              </p>
            </div>
          </div>

          {/* 社交链接 */}
          <div className="flex justify-center gap-3 my-4">
            <SocialLink href="#" icon={<Github size={14} />} />
            <SocialLink href="#" icon={<Twitter size={14} />} />
            <SocialLink href="#" icon={<Mail size={14} />} />
          </div>

          <div className="border-t border-ui-border/40 mb-4"></div>

          {/* 基础信息 */}
          <div className="space-y-2 px-1">
            <div className="flex items-center gap-2 text-xs text-ui-text-muted group/info">
              <span className="text-brand/60 group-hover/info:text-brand transition-colors"><MapPin size={12} /></span>
              <span className="truncate font-medium">ChongQin, China</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-ui-text-muted group/info">
              <span className="text-brand/60 group-hover/info:text-brand transition-colors"><LinkIcon size={12} /></span>
              <a href="https://just-potato.netlify.app/" target="_blank" rel="noreferrer" className="hover:text-brand transition-colors truncate font-medium">
                just-potato.netlify.app
              </a>
            </div>
          </div>

          {/* 标签 */}
          <div className="flex flex-wrap gap-1.5 mt-4 justify-center">
            {['Next.js', 'React', 'Rust', 'TS'].map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-ui-border/30 text-ui-text-muted text-[10px] font-bold rounded-md border border-ui-border/10 backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// 辅助子组件：社交链接
const SocialLink = ({ href, icon }: { href: string, icon: React.ReactNode }) => (
  <a href={href} className="p-2.5 bg-ui-border/20 text-ui-text-muted hover:text-white hover:bg-brand rounded-xl transition-all duration-300 shadow-sm">
    {icon}
  </a>
)

export { NeuralNetwork }