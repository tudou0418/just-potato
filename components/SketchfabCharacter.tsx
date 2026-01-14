'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Animation {
  uid: string;
  name: string;
}

/**
 * Sketchfab 交互组件
 * 修复版：移除了对 next/script 的依赖，改为手动加载 SDK，确保环境兼容性
 */
const SketchfabCharacter = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [api, setApi] = useState<any>(null);
  const [animations, setAnimations] = useState<Animation[]>([]);
  const [currentAnim, setCurrentAnim] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const modelId = 'e8a634e1d3a14d229a3f3c2a6a4a0b8c';
  const apiKey = ''; 

  useEffect(() => {
    const scriptId = 'sketchfab-sdk';
    let script = document.getElementById(scriptId);

    const initViewer = () => {
      if (!(window as any).Sketchfab || !iframeRef.current) {
        console.error('Sketchfab SDK not loaded or iframe not ready');
        return;
      }

      console.log('Initializing Sketchfab viewer with model:', modelId);
      const client = new (window as any).Sketchfab(iframeRef.current);
      
      client.init(modelId, {
        success: (apiInstance: any) => {
          console.log('Sketchfab API initialized successfully');
          apiInstance.start();
          apiInstance.addEventListener('viewerready', () => {
            console.log('Viewer ready');
            setApi(apiInstance);
            setIsLoading(false);
            
            apiInstance.getAnimations((err: any, anims: Animation[]) => {
              if (!err && anims && anims.length > 0) {
                console.log('Animations loaded:', anims);
                setAnimations(anims);
                apiInstance.setCurrentAnimationByUID(anims[0].uid);
                setCurrentAnim(anims[0].name);
              } else {
                console.log('No animations found or error:', err);
              }
            });
          });
        },
        error: (err: any) => {
          console.error('Sketchfab initialization error:', err);
          const errorMsg = err?.message || err?.toString() || '未知错误';
          if (errorMsg.includes('401') || errorMsg.includes('Unauthorized')) {
            setError('模型需要 API Key，请配置 Sketchfab API Key');
          } else if (errorMsg.includes('404') || errorMsg.includes('Not Found')) {
            setError('模型不存在或已被删除');
          } else {
            setError(`模型加载失败: ${errorMsg}`);
          }
          setIsLoading(false);
        },
        ui_infos: 0,
        ui_controls: 0,
        ui_stop: 0,
        transparent: 1,
        scrollwheel: 0,
        double_click: 0,
        cursor: 0,
        autostart: 1,
        ...(apiKey && { api_key: apiKey })
      });
    };

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js';
      script.async = true;
      document.head.appendChild(script);
      script.onload = initViewer;
    } else {
      initViewer();
    }

    return () => {};
  }, [modelId]);

  const handlePlayAnimation = (anim: Animation) => {
    if (api) {
      api.setCurrentAnimationByUID(anim.uid);
      setCurrentAnim(anim.name);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end pointer-events-none">
      {!isLoading && !error && animations.length > 0 && (
        <div className="mb-4 flex flex-col gap-2 pointer-events-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-ui-surface/90 backdrop-blur-md p-4 rounded-2xl shadow-brand border border-ui-border max-w-[200px]">
            <p className="text-[10px] font-bold text-brand mb-2 px-1 uppercase tracking-widest">角色动作</p>
            <div className="grid grid-cols-1 gap-2">
              {animations.slice(0, 4).map((anim) => (
                <button
                  key={anim.uid}
                  onClick={() => handlePlayAnimation(anim)}
                  className={`px-3 py-2 text-xs font-medium rounded-xl transition-all truncate text-left ${
                    currentAnim === anim.name
                      ? 'bg-brand text-white shadow-md'
                      : 'bg-ui-border/20 text-ui-text hover:bg-ui-border/40'
                  }`}
                >
                  {anim.name || '未命名动作'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="relative group pointer-events-auto">
        {isLoading && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin mb-2"></div>
            <span className="text-[10px] text-brand font-bold uppercase tracking-tighter">载入 3D 角色...</span>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-red-50/80 backdrop-blur-sm rounded-3xl p-4 text-center border border-red-100">
            <p className="text-xs text-red-500 font-medium">{error}</p>
          </div>
        )}
        
        <div className="absolute -inset-10 bg-brand/10 rounded-full blur-3xl group-hover:bg-brand/20 transition-all duration-1000"></div>

        <iframe
          ref={iframeRef}
          src=""
          id="sketchfab-viewer"
          title="Sketchfab Character"
          className="w-56 h-56 md:w-72 md:h-72 border-0 rounded-3xl relative z-10 transition-transform duration-700 group-hover:scale-110"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          data-execution-while-out-of-viewport="true"
          data-execution-while-not-rendered="true"
        ></iframe>
      </div>
    </div>
  );
};

export default SketchfabCharacter;
