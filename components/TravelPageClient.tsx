'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Calendar, 
  CreditCard, 
  Clock, 
  Globe, 
  Plane,
  Train,
  Car
} from 'lucide-react';
import * as echarts from 'echarts';

interface TravelData {
  id: number;
  title: string;
  location: string;
  coord: [number, number, number];
  date: string;
  year: string;
  days: number;
  cost: number;
  image: string;
  slug: string;
  transport: 'plane' | 'train' | 'car';
}

interface TravelPageClientProps {
  travels: TravelData[];
}

const PLAYFUL_TEXTS = ["戳我开启回忆", "去看看？", "开启传送门", "想去这里吗？", "出发！"];

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
}

const CountUp = ({ end, duration = 1000, prefix = "" }: CountUpProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentCount = Math.floor(progress * end);
      setCount(currentCount);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{prefix}{count.toLocaleString()}</span>;
};

interface TravelMapProps {
  data: TravelData[];
}

const TravelMap = ({ data }: TravelMapProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    const initChart = async () => {
      if (!chartRef.current) return;
      const response = await fetch('https://cdn.jsdelivr.net/npm/echarts@4.9.0/map/json/china.json');
      const chinaJson = await response.json();
      echarts.registerMap('china', chinaJson);

      if (!chartInstance.current) {
        chartInstance.current = echarts.init(chartRef.current);
      }

      const isDark = document.documentElement.classList.contains('dark');
      const primaryColor = '#2563eb';
      const areaColor = isDark ? '#1e293b' : '#f8fafc';
      const borderColor = isDark ? '#334155' : '#e2e8f0';

      const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      const lineData = sortedData.slice(0, -1).map((item, i) => {
        const nextItem = sortedData[i + 1];
        if (!item.coord || !nextItem || !nextItem.coord) return null;
        return {
          coords: [item.coord.slice(0, 2), nextItem.coord.slice(0, 2)]
        };
      }).filter((item): item is { coords: [number, number][] } => item !== null);

      const option: echarts.EChartsOption = {
        backgroundColor: 'transparent',
        geo: {
          map: 'china', roam: false, label: { show: false },
          itemStyle: { areaColor, borderColor, borderWidth: 1 },
          emphasis: { itemStyle: { areaColor: isDark ? '#1e3a8a' : '#eff6ff' } }
        },
        series: [
          {
            type: 'lines', zlevel: 1,
            effect: { show: true, period: 4, trailLength: 0.7, color: primaryColor, symbolSize: 3 },
            lineStyle: { color: primaryColor, width: 1, opacity: 0.2, curveness: 0.2 },
            data: lineData
          },
          {
            type: 'lines', zlevel: 2, symbol: ['none', 'arrow'], symbolSize: 6,
            lineStyle: { color: primaryColor, width: 1, opacity: 0.4, curveness: 0.2 },
            data: lineData
          },
          {
            type: 'effectScatter', coordinateSystem: 'geo', zlevel: 3,
            data: data.filter(item => item.coord).map(item => ({ name: item.location, value: item.coord })),
            symbolSize: 8, rippleEffect: { brushType: 'stroke', scale: 4 },
            itemStyle: { color: primaryColor }
          }
        ]
      };
      chartInstance.current.setOption(option, true);
    };

    initChart();
    const handleResize = () => chartInstance.current?.resize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [data]);

  return (
    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-ui-surface border border-ui-border rounded-[3rem] overflow-hidden mb-20 shadow-sm">
      <div ref={chartRef} className="w-full h-full" />
    </div>
  );
};

interface TransportIconProps {
  type: 'plane' | 'train' | 'car';
  direction: 'left' | 'right' | 'down' | 'none';
}

const TransportIcon = ({ type, direction }: TransportIconProps) => {
  const icons = {
    plane: <Plane size={14} className={`text-brand ${direction === 'left' ? '-rotate-135' : direction === 'right' ? 'rotate-45' : ''}`} />,
    train: <Train size={14} className="text-brand" />,
    car: <Car size={14} className="text-brand" />
  };
  return (
    <div className="flex items-center justify-center w-8 h-8 bg-ui-surface border border-ui-border rounded-full shadow-md">
      {icons[type] || icons.plane}
    </div>
  );
};

interface TravelCardProps {
  spot: TravelData;
  isActive: boolean;
  onHover: (id: number | null) => void;
  style: React.CSSProperties;
  nextDirection: 'left' | 'right' | 'down' | 'none';
  isLast: boolean;
}

const TravelCard = ({ spot, isActive, onHover, style, nextDirection, isLast }: TravelCardProps) => {
  const [randomText, setRandomText] = useState('');
  const [imageError, setImageError] = useState(false);
  const defaultImage = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80";

  useEffect(() => {
    setRandomText(PLAYFUL_TEXTS[Math.floor(Math.random() * PLAYFUL_TEXTS.length)]);
  }, []);

  const getConnectorStyles = () => {
    if (isLast) return {};
    const base = "absolute z-0 border-brand/20 border-dashed border-t-2 pointer-events-none";
    switch(nextDirection) {
      case 'right': 
        return {
          className: `${base} top-1/2 left-[100%] w-[5rem] -translate-y-1/2`,
          iconStyle: { left: 'calc(100% + 2.5rem)', top: '50%' }
        };
      case 'left': 
        return {
          className: `${base} top-1/2 right-[100%] w-[5rem] -translate-y-1/2`,
          iconStyle: { left: '-2.5rem', top: '50%' }
        };
      case 'down': 
        return {
          className: `absolute z-0 border-brand/20 border-dashed border-l-2 pointer-events-none top-[100%] left-1/2 h-[8rem] -translate-x-1/2`,
          iconStyle: { left: '50%', top: 'calc(100% + 4rem)' }
        };
      default: return {};
    }
  };

  const connector = getConnectorStyles();

  return (
    <div 
      className="group relative transition-all duration-500 animate-reveal"
      onMouseEnter={() => onHover(spot.id)}
      onMouseLeave={() => onHover(null)}
      style={style}
    >
      {!isLast && connector.className && (
        <div className={connector.className} />
      )}
      
      {!isLast && connector.iconStyle && (
        <div className="absolute z-20 -translate-x-1/2 -translate-y-1/2" style={connector.iconStyle}>
           <TransportIcon type={spot.transport} direction={nextDirection} />
        </div>
      )}

      <div className="relative z-10 bg-ui-surface rounded-[2.5rem] rounded-tr-none rounded-bl-none overflow-visible">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[2.5rem] rounded-tr-none rounded-bl-none shadow-md transition-all duration-500 group-hover:shadow-brand/30">
          <img 
            src={imageError || !spot.image ? defaultImage : spot.image} 
            alt={spot.title} 
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          
          <div className={`absolute inset-0 bg-brand/30 backdrop-blur-[1px] flex items-center justify-center transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
             <div className="bg-white text-brand px-4 py-1.5 rounded-full font-bold text-xs shadow-xl transform transition-transform duration-300 scale-90 group-hover:scale-100">
               {randomText}
             </div>
          </div>

          <div className="absolute top-4 right-4 flex flex-col gap-1.5">
              <div className={`flex items-center gap-1.5 px-2.5 py-1 bg-white/95 border border-ui-border rounded-full shadow-sm transition-all transform ${isActive ? 'translate-x-0' : 'translate-x-8 opacity-0'}`}>
                <Clock size={10} className="text-brand" />
                <span className="text-[10px] font-bold text-ui-text">{spot.days} 天</span>
              </div>
              <div className={`flex items-center gap-1.5 px-2.5 py-1 bg-white/95 border border-ui-border rounded-full shadow-sm transition-all transform ${isActive ? 'translate-x-0' : 'translate-x-8 opacity-0'}`} style={{ transitionDelay: '50ms' }}>
                <CreditCard size={10} className="text-emerald-500" />
                <span className="text-[10px] font-bold text-ui-text">¥{spot.cost}</span>
              </div>
          </div>

          <div className="absolute bottom-4 left-4">
             <span className="px-2 py-0.5 bg-white/90 text-ui-text text-[9px] tracking-widest rounded-full font-black uppercase shadow-sm">
               {spot.location}
             </span>
          </div>
        </div>

        <div className="py-5 px-1 bg-ui-surface">
          <div className="flex items-center gap-2 text-ui-text-muted text-[9px] font-bold tracking-[0.2em] uppercase mb-1.5">
            <Calendar size={10} />
            {spot.date}
          </div>
          <h2 className="text-lg font-bold text-ui-text leading-tight group-hover:text-brand transition-colors line-clamp-1">
            {spot.title}
          </h2>
        </div>
      </div>

      <a href={`/travel/${spot.slug}`} className="absolute inset-0 z-30"></a>
    </div>
  );
};

interface StatsAndFilterProps {
  data: TravelData[];
  selectedYear: string;
  onYearChange: (year: string) => void;
}

const StatsAndFilter = ({ data, selectedYear, onYearChange }: StatsAndFilterProps) => {
  const stats = useMemo(() => ({
    cities: data.length,
    days: data.reduce((a, b) => a + (b.days || 0), 0),
    cost: data.reduce((a, b) => a + (b.cost || 0), 0)
  }), [data]);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-12">
      <div className="flex flex-wrap gap-12">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-ui-text-muted uppercase tracking-[0.3em] mb-2">足迹城市</span>
          <span className="text-4xl font-black text-ui-text flex items-baseline gap-1">
            <CountUp end={stats.cities} />
            <span className="text-xs font-medium text-ui-text-muted uppercase">Cities</span>
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-ui-text-muted uppercase tracking-[0.3em] mb-2">累计天数</span>
          <span className="text-4xl font-black text-ui-text flex items-baseline gap-1">
            <CountUp end={stats.days} />
            <span className="text-xs font-medium text-ui-text-muted uppercase">Days</span>
          </span>
        </div>
        <div className="flex flex-col border-l border-ui-border pl-12">
          <span className="text-[10px] font-bold text-brand uppercase tracking-[0.3em] mb-2 font-black">旅行开支</span>
          <span className="text-4xl font-black text-brand">
            <CountUp end={stats.cost} prefix="¥" />
          </span>
        </div>
      </div>

      <div className="inline-flex bg-ui-surface border border-ui-border p-1.5 rounded-full shadow-sm">
        {["All", "2024", "2023"].map(year => (
          <button
            key={year}
            onClick={() => onYearChange(year)}
            className={`px-6 py-2 text-[11px] font-bold rounded-full transition-all duration-300 ${
              selectedYear === year 
                ? 'bg-brand text-white shadow-md !text-white'
                : 'text-ui-text-muted hover:text-ui-text'
            }`}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
};

export default function TravelPageClient({ travels }: TravelPageClientProps) {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState("All");
  const [cols, setCols] = useState(3);

  useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth >= 1024) setCols(3);
      else if (window.innerWidth >= 768) setCols(2);
      else setCols(1);
    };
    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, []);

  const filteredData = useMemo(() => {
    const raw = selectedYear === "All" ? travels : travels.filter(item => item.year === selectedYear);
    return raw.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedYear, travels]);

  const getSnakeInfo = (index: number, currentCols: number, total: number) => {
    const row = Math.floor(index / currentCols);
    const colInRow = index % currentCols;
    const visualCol = row % 2 === 0 ? colInRow + 1 : currentCols - colInRow;
    const visualRow = row + 1;

    let direction: 'left' | 'right' | 'down' | 'none' = 'right';
    const isLastInRow = colInRow === currentCols - 1;
    
    if (index === total - 1) direction = 'none';
    else if (isLastInRow) direction = 'down';
    else if (row % 2 !== 0) direction = 'left';

    return {
      style: {
        gridColumnStart: visualCol,
        gridRowStart: visualRow
      },
      direction
    };
  };

  return (
    <div className="min-h-screen bg-ui-surface text-ui-text font-sans selection:bg-brand selection:text-white pb-32 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 lg:px-16">
        
        <StatsAndFilter data={filteredData} selectedYear={selectedYear} onYearChange={setSelectedYear} />

        <TravelMap data={filteredData} />

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-32">
          {filteredData.map((spot, index) => {
            const info = getSnakeInfo(index, cols, filteredData.length);
            return (
              <TravelCard 
                key={spot.id} 
                spot={spot} 
                isActive={activeId === spot.id}
                onHover={setActiveId}
                style={info.style}
                nextDirection={info.direction}
                isLast={index === filteredData.length - 1}
              />
            );
          })}
        </div>

        <footer className="mt-48 pt-16 border-t border-ui-border flex flex-col md:flex-row justify-between items-center gap-6 opacity-60">
          <div className="flex items-center gap-3 font-bold text-sm text-brand">
            <Plane size={18} className="rotate-45" />
            <span className="tracking-[0.2em] uppercase">Adventure Awaits</span>
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.5em]">
            © {new Date().getFullYear()} NORDIC SLATE
          </div>
        </footer>
      </div>
    </div>
  );
}
