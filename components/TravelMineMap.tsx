'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { MapPin, Navigation, Route } from 'lucide-react'

type TravelPoint = {
  id: number
  title: string
  location: string
  coord: [number, number, number]
  date: string
  days: number
  transport: 'plane' | 'train' | 'car'
}

type MineMapLike = {
  domainUrl?: string
  dataDomainUrl?: string
  serverDomainUrl?: string
  spriteUrl?: string
  serviceUrl?: string
  key?: string
  appKey?: string
  solution?: number
  Map: new (options: Record<string, unknown>) => MineMapInstance
  Marker: new (options: Record<string, unknown>) => MineMapMarker
}

type MineMapInstance = {
  on: (event: string, handler: (...args: unknown[]) => void) => void
  addSource: (id: string, source: Record<string, unknown>) => void
  addLayer: (layer: Record<string, unknown>) => void
  fitBounds: (bounds: [[number, number], [number, number]], options?: Record<string, unknown>) => void
  flyTo: (options: Record<string, unknown>) => void
  resize: () => void
  remove: () => void
}

type MineMapMarker = {
  setLngLat: (lngLat: [number, number]) => MineMapMarker
  addTo: (map: MineMapInstance) => MineMapMarker
  remove: () => void
}

declare global {
  interface Window {
    minemap?: MineMapLike
  }
}

// Default is local mock. Real mode is opt-in through NEXT_PUBLIC_MINEMAP_USE_MOCK=false.
const USE_MOCK = process.env.NEXT_PUBLIC_MINEMAP_USE_MOCK !== 'false'
const USE_ONLINE = process.env.NEXT_PUBLIC_MINEMAP_USE_ONLINE === 'true'
const MINEMAP_BASE = process.env.NEXT_PUBLIC_MINEMAP_BASE || 'https://minemap.minedata.cn/minemapapi/v2.1.1'
const WMTS_BASE = process.env.NEXT_PUBLIC_MINEMAP_WMTS_BASE || ''
const MINEMAP_APP_KEY = process.env.NEXT_PUBLIC_MINEMAP_APP_KEY || ''
const MINEMAP_SOLUTION = Number(process.env.NEXT_PUBLIC_MINEMAP_SOLUTION || 11002)
const MAP_STYLE = process.env.NEXT_PUBLIC_MINEMAP_STYLE || 'bluenight'

let minemapPromise: Promise<MineMapLike> | null = null

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`)
    if (existing) {
      if (existing.dataset.loaded === 'true') resolve()
      else {
        existing.addEventListener('load', () => resolve(), { once: true })
        existing.addEventListener('error', () => reject(new Error(`MineMap script failed: ${src}`)), { once: true })
      }
      return
    }

    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.onload = () => {
      script.dataset.loaded = 'true'
      resolve()
    }
    script.onerror = () => reject(new Error(`MineMap script failed: ${src}`))
    document.head.appendChild(script)
  })
}

function loadStyle(href: string) {
  return new Promise<void>((resolve, reject) => {
    if (document.querySelector(`link[href="${href}"]`)) {
      resolve()
      return
    }

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    link.onload = () => resolve()
    link.onerror = () => reject(new Error(`MineMap style failed: ${href}`))
    document.head.appendChild(link)
  })
}

function loadMineMap() {
  if (!MINEMAP_BASE || (!USE_ONLINE && !WMTS_BASE)) {
    return Promise.reject(new Error('真实 MineMap 模式缺少 SDK 或地图服务地址'))
  }
  if (window.minemap) return Promise.resolve(window.minemap)
  if (minemapPromise) return minemapPromise

  minemapPromise = Promise.all([
    loadStyle(`${MINEMAP_BASE}/minemap.css`),
    loadScript(`${MINEMAP_BASE}/minemap.js`),
  ])
    .then(() => {
      if (!window.minemap) throw new Error('MineMap loaded, but window.minemap is missing.')
      return window.minemap
    })
    .catch((error) => {
      minemapPromise = null
      throw error
    })

  return minemapPromise
}

function buildWmtsTileUrl(layer: 'basemap' | 'label') {
  return `${WMTS_BASE}/service/map/wmts-raster?service=WMTS&version=1.0.0&request=GetTile&layer=${layer}&format=image/png&style=${MAP_STYLE}&tilematrixset=3857&tilematrix={z}&tilerow={y}&tilecol={x}`
}

function buildOnlineStyleUrl() {
  return `https://service.minedata.cn/map/solu/style/${MINEMAP_SOLUTION}`
}

function buildMapStyle() {
  return {
    version: 8,
    glyphs: 'minemap://fonts/{fontstack}/{range}',
    sources: {},
    layers: [{ id: 'background', type: 'background', paint: { 'background-color': '#0A1121' } }],
  }
}

function getBounds(points: TravelPoint[]): [[number, number], [number, number]] | null {
  const validPoints = points.filter((item) => Array.isArray(item.coord) && item.coord.length >= 2)
  if (!validPoints.length) return null
  const lngs = validPoints.map((item) => item.coord[0])
  const lats = validPoints.map((item) => item.coord[1])
  return [[Math.min(...lngs), Math.min(...lats)], [Math.max(...lngs), Math.max(...lats)]]
}

function projectPoint(point: TravelPoint, points: TravelPoint[]) {
  const bounds = getBounds(points)
  if (!bounds) return { x: 50, y: 50 }
  const lngRange = bounds[1][0] - bounds[0][0] || 1
  const latRange = bounds[1][1] - bounds[0][1] || 1
  return {
    x: 16 + ((point.coord[0] - bounds[0][0]) / lngRange) * 68,
    y: 84 - ((point.coord[1] - bounds[0][1]) / latRange) * 68,
  }
}

function buildRouteGeoJSON(points: TravelPoint[]) {
  return {
    type: 'FeatureCollection',
    features: points.slice(0, -1).map((point, index) => ({
      type: 'Feature',
      properties: {
        from: point.location,
        to: points[index + 1].location,
      },
      geometry: {
        type: 'LineString',
        coordinates: [point.coord.slice(0, 2), points[index + 1].coord.slice(0, 2)],
      },
    })),
  }
}
function TravelMarker({ point, active }: { point: TravelPoint; active: boolean }) {
  return (
    <div className={`travel-map-marker ${active ? 'is-active' : ''}`}>
      <div className="travel-marker-pin"><MapPin size={18} /></div>
      <div className="travel-marker-label">
        <span>{point.location}</span>
        <small>{point.date}</small>
      </div>
    </div>
  )
}

function MockTravelMap({
  points,
  activeId,
  onActiveChange,
  onFocus,
}: {
  points: TravelPoint[]
  activeId: number | null
  onActiveChange: (id: number | null) => void
  onFocus: (point: TravelPoint) => void
}) {
  const route = points.map((point) => projectPoint(point, points))
  const path = route.map((position, index) => `${index === 0 ? 'M' : 'L'} ${position.x} ${position.y}`).join(' ')

  return (
    <div className="travel-mock-map">
      <div className="travel-mock-grid" />
      <div className="travel-mock-contours" />
      <svg className="travel-mock-route" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d={path} className="travel-route-glow" />
        <path d={path} className="travel-route-line" />
      </svg>
      {points.map((point) => {
        const position = projectPoint(point, points)
        return (
          <button
            key={point.id}
            type="button"
            className="travel-mock-marker"
            style={{ left: `${position.x}%`, top: `${position.y}%` }}
            onMouseEnter={() => onActiveChange(point.id)}
            onMouseLeave={() => onActiveChange(null)}
            onClick={() => onFocus(point)}
            aria-label={`定位到${point.location}`}
          >
            <TravelMarker point={point} active={activeId === point.id} />
          </button>
        )
      })}
      <div className="travel-mock-badge">Mock 模式 · 本地开发</div>
    </div>
  )
}

export default function TravelMineMap({ data }: { data: TravelPoint[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<MineMapInstance | null>(null)
  const markersRef = useRef<MineMapMarker[]>([])
  const markerRootsRef = useRef<Root[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [activeId, setActiveId] = useState<number | null>(null)

  const sortedData = useMemo(
    () => data
      .filter((item) => Array.isArray(item.coord) && item.coord.length >= 2)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    [data]
  )

  useEffect(() => {
    if (USE_MOCK) {
      setStatus('ready')
      return
    }

    let cancelled = false
    let resizeObserver: ResizeObserver | null = null

    async function initMap() {
      if (!containerRef.current) return

      try {
        const minemap = await loadMineMap()
        if (cancelled || !containerRef.current) return

        if (USE_ONLINE) {
          minemap.domainUrl = 'https://minedata.cn'
          minemap.dataDomainUrl = 'https://minedata.cn'
          minemap.serverDomainUrl = 'https://ol-data.minedata.cn'
          minemap.spriteUrl = 'https://minedata.cn/minemapapi/v2.1.1/sprite/sprite'
          minemap.serviceUrl = 'https://service.minedata.cn/service'
          minemap.key = MINEMAP_APP_KEY
          minemap.appKey = MINEMAP_APP_KEY
          minemap.solution = MINEMAP_SOLUTION
        }

        const bounds = getBounds(sortedData)
        const center = bounds
          ? [(bounds[0][0] + bounds[1][0]) / 2, (bounds[0][1] + bounds[1][1]) / 2]
          : [106.55073, 29.56471]

        const map = new minemap.Map({
          container: containerRef.current,
          style: USE_ONLINE ? buildOnlineStyleUrl() : buildMapStyle(),
          center,
          zoom: 4,
          pitch: 0,
          minZoom: 3,
          maxZoom: 18,
          projection: USE_ONLINE ? 'MERCATOR' : 'LATLON',
        })
        mapRef.current = map

        map.on('load', () => {
          if (cancelled) return

          if (!USE_ONLINE) {
            map.addSource('travel-basemap', {
              type: 'raster',
              scheme: 'wmts',
              tileSize: 256,
              tiles: [buildWmtsTileUrl('basemap')],
            })
            map.addLayer({ id: 'travel-basemap', type: 'raster', source: 'travel-basemap', minzoom: 1, maxzoom: 20 })
            map.addSource('travel-label', {
              type: 'raster',
              scheme: 'wmts',
              tileSize: 256,
              tiles: [buildWmtsTileUrl('label')],
            })
            map.addLayer({ id: 'travel-label', type: 'raster', source: 'travel-label', minzoom: 1, maxzoom: 20 })
          }

          map.addSource('travel-route', {
            type: 'geojson',
            data: buildRouteGeoJSON(sortedData),
          })
          map.addLayer({
            id: 'travel-route-glow',
            type: 'line',
            source: 'travel-route',
            paint: {
              'line-color': '#38BDF8',
              'line-width': 5,
              'line-opacity': 0.22,
            },
          })
          map.addLayer({
            id: 'travel-route-line',
            type: 'line',
            source: 'travel-route',
            paint: {
              'line-color': '#2563EB',
              'line-width': 2,
              'line-opacity': 0.78,
              'line-dasharray': [2, 2],
            },
          })
          sortedData.forEach((point) => {
            const container = document.createElement('div')
            container.className = 'travel-marker-shell'
            container.addEventListener('mouseenter', () => setActiveId(point.id))
            container.addEventListener('mouseleave', () => setActiveId(null))
            container.addEventListener('click', () => map.flyTo({ center: point.coord.slice(0, 2), zoom: 8, duration: 900 }))
            const root = createRoot(container)
            root.render(<TravelMarker point={point} active={false} />)
            markerRootsRef.current.push(root)
            const marker = new minemap.Marker({ element: container, offset: [-18, -42] })
              .setLngLat(point.coord.slice(0, 2) as [number, number])
              .addTo(map)
            markersRef.current.push(marker)
          })

          if (bounds) map.fitBounds(bounds, { padding: 90, duration: 900 })
          setStatus('ready')
        })

        map.on('error', () => setStatus('error'))
        resizeObserver = new ResizeObserver(() => map.resize())
        resizeObserver.observe(containerRef.current)
      } catch (error) {
        console.warn('[TravelMineMap] MineMap init failed:', error)
        setStatus('error')
      }
    }

    initMap()

    return () => {
      cancelled = true
      resizeObserver?.disconnect()
      markersRef.current.forEach((marker) => marker.remove())
      markerRootsRef.current.forEach((root) => root.unmount())
      markersRef.current = []
      markerRootsRef.current = []
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [sortedData])

  useEffect(() => {
    markerRootsRef.current.forEach((root, index) => {
      const point = sortedData[index]
      if (point) root.render(<TravelMarker point={point} active={activeId === point.id} />)
    })
  }, [activeId, sortedData])

  const focusPoint = (point: TravelPoint) => {
    if (USE_MOCK) {
      setActiveId(point.id)
      return
    }
    mapRef.current?.flyTo({ center: point.coord.slice(0, 2), zoom: 8, duration: 900 })
  }

  return (
    <section className="relative mb-20 overflow-hidden rounded-[2rem] border border-ui-border bg-[#07111f] shadow-sm">
      <div className="absolute left-5 top-5 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-3 py-2 text-xs font-bold text-white backdrop-blur">
        <Navigation size={14} className="text-sky-300" />
        {USE_MOCK ? 'MineMap Mock' : USE_ONLINE ? 'MineMap Official' : 'MineMap WMTS'}
      </div>

      <div className="absolute bottom-5 left-5 z-20 max-w-[calc(100%-40px)] rounded-2xl border border-white/10 bg-slate-950/72 px-4 py-3 text-white backdrop-blur">
        <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.24em] text-sky-200"><Route size={14} />Travel Route</div>
        <div className="mt-1 text-sm font-semibold">
          {sortedData.length ? `${sortedData[0].location} -> ${sortedData[sortedData.length - 1].location}` : '等待旅行坐标'}
        </div>
      </div>

      {!USE_MOCK && status !== 'ready' && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#07111f] text-sm font-semibold text-sky-100">
          {status === 'loading' ? 'MineMap 地图加载中...' : 'MineMap 资源暂不可用，请检查官方 appKey / solution 或地图服务地址'}
        </div>
      )}

      {USE_MOCK ? (
        <MockTravelMap points={sortedData} activeId={activeId} onActiveChange={setActiveId} onFocus={focusPoint} />
      ) : (
        <div ref={containerRef} className="h-[420px] w-full md:h-[520px]" />
      )}

      <style jsx global>{`
        .travel-mock-map { position: relative; height: 420px; overflow: hidden; background: radial-gradient(circle at 50% 45%, #102c4a 0%, #07111f 68%); }
        .travel-mock-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(56,189,248,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,.1) 1px, transparent 1px); background-size: 42px 42px; transform: perspective(520px) rotateX(55deg) scale(1.45); transform-origin: center bottom; opacity: .55; }
        .travel-mock-contours { position: absolute; inset: 12% 10%; border: 1px solid rgba(56,189,248,.17); border-radius: 48% 52% 42% 58%; box-shadow: 0 0 0 28px rgba(56,189,248,.035), 0 0 0 56px rgba(56,189,248,.025), 0 0 80px rgba(56,189,248,.12); transform: rotate(-8deg); }
        .travel-mock-route { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
        .travel-route-glow { fill: none; stroke: #38bdf8; stroke-width: 1.2; stroke-linecap: round; stroke-linejoin: round; opacity: .28; filter: blur(2px); }
        .travel-route-line { fill: none; stroke: #60a5fa; stroke-width: .45; stroke-dasharray: 1.6 1.6; stroke-linecap: round; stroke-linejoin: round; opacity: .95; }
        .travel-mock-marker { position: absolute; z-index: 3; border: 0; padding: 0; background: transparent; transform: translate(-18px, -42px); cursor: pointer; }
        .travel-mock-badge { position: absolute; right: 20px; top: 20px; z-index: 4; border: 1px solid rgba(56,189,248,.2); border-radius: 999px; background: rgba(2,6,23,.62); padding: 8px 12px; color: rgba(186,230,253,.8); font-size: 10px; font-weight: 700; backdrop-filter: blur(10px); }
        .travel-marker-shell { cursor: pointer; pointer-events: auto; z-index: 20; }
        .travel-map-marker { display: inline-flex; align-items: flex-start; filter: drop-shadow(0 8px 18px rgba(37,99,235,.35)); transform-origin: 18px 42px; transition: transform 180ms ease, filter 180ms ease; }
        .travel-map-marker.is-active { transform: scale(1.08); filter: drop-shadow(0 10px 24px rgba(56,189,248,.5)); }
        .travel-marker-pin { display: grid; width: 36px; height: 42px; place-items: center; border-radius: 18px 18px 18px 4px; background: linear-gradient(145deg, #38bdf8, #2563eb); color: white; transform: rotate(-45deg); box-shadow: inset 0 1px 0 rgba(255,255,255,.36), 0 0 0 4px rgba(56,189,248,.14); }
        .travel-marker-pin svg { transform: rotate(45deg); }
        .travel-marker-label { margin-left: -2px; margin-top: 2px; min-width: 92px; max-width: 140px; overflow: hidden; border-radius: 0 12px 12px 0; border: 1px solid rgba(255,255,255,.16); background: linear-gradient(90deg, rgba(15,23,42,.92), rgba(15,23,42,.34)); padding: 7px 10px; color: white; backdrop-filter: blur(10px); }
        .travel-marker-label span, .travel-marker-label small { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .travel-marker-label span { font-size: 13px; font-weight: 800; line-height: 1.1; }
        .travel-marker-label small { margin-top: 3px; color: rgba(186,230,253,.86); font-size: 10px; font-weight: 700; }
        @media (min-width: 768px) { .travel-mock-map { height: 520px; } }
      `}</style>
    </section>
  )
}