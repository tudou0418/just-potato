'use client';

import React from 'react';

interface DynamicLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

/**
 * Just Potato 动态 Logo 组件
 *
 * 设计理念：
 * - 土豆拟人化：不规则轮廓 + 自然震动
 * - 土豆配色：暖褐色系
 * - 生机动画：随机震动 + 眨睛眨动 + 轻微浮动
 */
export default function DynamicLogo({
  className = '',
  size = 40,
  showText = true
}: DynamicLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* 动态 SVG Logo */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="drop-shadow-lg"
        style={{ filter: 'drop-shadow(0 2px 4px rgba(161, 98, 7, 0.1))' }}
      >
        <defs>
          {/* 土豆渐变 - 暖褐色系 */}
          <linearGradient id="potatoSkin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#D4A574', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#C4885C', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#B8845C', stopOpacity: 1 }} />
          </linearGradient>

          {/* 土豆阴影渐变 */}
          <radialGradient id="potatoShadow" cx="40%" cy="40%" r="50%">
            <stop offset="0%" style={{ stopColor: '#8B5A2B', stopOpacity: 0.4 }} />
            <stop offset="100%" style={{ stopColor: '#A0522D', stopOpacity: 0.1 }} />
          </radialGradient>

          {/* 眼睛高光 */}
          <radialGradient id="eyeShine" cx="30%" cy="30%" r="40%">
            <stop offset="0%" style={{ stopColor: '#FFF8E7', stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: '#FFF8E7', stopOpacity: 0.2 }} />
          </radialGradient>

          {/* 随机震动动画定义 */}
          <style>
            {`
              @keyframes potato-shake {
                0% { transform: rotate(0deg); }
                25% { transform: rotate(1deg); }
                50% { transform: rotate(-0.5deg); }
                75% { transform: rotate(0.7deg); }
                100% { transform: rotate(0deg); }
              }

              @keyframes potato-bounce {
                0%, 100% { transform: translateY(0); }
                40% { transform: translateY(-1px); }
                60% { transform: translateY(0.5px); }
              }

              @keyframes blink {
                0%, 45%, 55%, 100% { transform: scaleY(1); }
                50% { transform: scaleY(0.1); }
              }

              .potato-main {
                animation: potato-shake 4s ease-in-out infinite,
                           potato-bounce 6s ease-in-out infinite;
                transform-origin: center bottom;
              }

              .left-eye {
                animation: blink 4s ease-in-out infinite;
                transform-origin: center;
              }

              .right-eye {
                animation: blink 4s ease-in-out infinite;
                animation-delay: 0.2s;
                transform-origin: center;
              }

              .sprout {
                animation: potato-bounce 5s ease-in-out infinite;
                transform-origin: bottom;
              }
            `}
          </style>
        </defs>

        {/* 土豆主体 - 略微不规则的椭圆 */}
        <ellipse
          className="potato-main"
          cx="50"
          cy="53"
          rx="36"
          ry="30"
          fill="url(#potatoSkin)"
          stroke="#8B5A2B"
          strokeWidth="1.5"
        />

        {/* 土豆芽点 - 左 */}
        <ellipse
          className="sprout"
          cx="28"
          cy="32"
          rx="2.5"
          ry="3.5"
          fill="#8B6F47"
          stroke="#6B5020"
          strokeWidth="1"
          style={{ animationDelay: '0.3s' }}
        />

        {/* 土豆芽点 - 右 */}
        <ellipse
          className="sprout"
          cx="72"
          cy="32"
          rx="2.5"
          ry="3.5"
          fill="#8B6F47"
          stroke="#6B5020"
          strokeWidth="1"
          style={{ animationDelay: '0.7s' }}
        />

        {/* 左眼睛 - 眨睛 */}
        <ellipse
          className="left-eye"
          cx="38"
          cy="48"
          rx="4"
          ry="5"
          fill="#1a1a1a"
        />
        <ellipse
          cx="38"
          cy="47"
          rx="1.5"
          ry="2"
          fill="url(#eyeShine)"
        />

        {/* 右眼睛 */}
        <ellipse
          className="right-eye"
          cx="62"
          cy="48"
          rx="4"
          ry="5"
          fill="#1a1a1a"
        />
        <ellipse
          cx="62"
          cy="47"
          rx="1.5"
          ry="2"
          fill="url(#eyeShine)"
        />

        {/* 小嘴巴 - 微笑曲线 */}
        <path
          d="M 46 60 Q 50 62 Q 54 60"
          stroke="#6B5020"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* 文字部分 */}
      {showText && (
        <div
          className="flex flex-col"
          style={{ fontSize: `${size * 0.4}px`, lineHeight: 1.1 }}
        >
          <span
            className="font-black tracking-tight"
            style={{
              color: 'var(--ui-text)',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '-0.02em'
            }}
          >
            Just
          </span>
          <span
            className="font-bold"
            style={{
              color: '#D4A574',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '-0.01em'
            }}
          >
            Potato
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * 精简版 Logo（仅图标）
 */
export function LogoIcon({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={{ filter: 'drop-shadow(0 2px 4px rgba(161, 98, 7, 0.1))' }}
    >
      <defs>
        <linearGradient id="potatoSkinSimple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#D4A574', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#C4885C', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#B8845C', stopOpacity: 1 }} />
        </linearGradient>

        <radialGradient id="eyeShineSimple" cx="30%" cy="30%" r="40%">
          <stop offset="0%" style={{ stopColor: '#FFF8E7', stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: '#FFF8E7', stopOpacity: 0.2 }} />
        </radialGradient>

        <style>
          {`
            @keyframes potato-shake-simple {
              0% { transform: rotate(0deg); }
              25% { transform: rotate(1deg); }
              50% { transform: rotate(-0.5deg); }
              75% { transform: rotate(0.7deg); }
              100% { transform: rotate(0deg); }
            }

            @keyframes potato-bounce-simple {
              0%, 100% { transform: translateY(0); }
              40% { transform: translateY(-1px); }
              60% { transform: translateY(0.5px); }
            }

            @keyframes blink-simple {
              0%, 45%, 55%, 100% { transform: scaleY(1); }
              50% { transform: scaleY(0.1); }
            }

            .potato-main-simple {
              animation: potato-shake-simple 4s ease-in-out infinite,
                         potato-bounce-simple 6s ease-in-out infinite;
              transform-origin: center bottom;
            }

            .eye-simple {
              animation: blink-simple 4s ease-in-out infinite;
              transform-origin: center;
            }
          `}
        </style>
      </defs>

      {/* 土豆主体 */}
      <ellipse
        className="potato-main-simple"
        cx="50"
        cy="53"
        rx="36"
        ry="30"
        fill="url(#potatoSkinSimple)"
        stroke="#8B5A2B"
        strokeWidth="1.5"
      />

      {/* 芽点 */}
      <ellipse
        cx="28"
        cy="32"
        rx="2.5"
        ry="3.5"
        fill="#8B6F47"
        stroke="#6B5020"
        strokeWidth="1"
      />
      <ellipse
        cx="72"
        cy="32"
        rx="2.5"
        ry="3.5"
        fill="#8B6F47"
        stroke="#6B5020"
        strokeWidth="1"
      />

      {/* 眼睛 */}
      <ellipse
        className="eye-simple"
        cx="38"
        cy="48"
        rx="4"
        ry="5"
        fill="#1a1a1a"
      />
      <ellipse
        cx="38"
        cy="47"
        rx="1.5"
        ry="2"
        fill="url(#eyeShineSimple)"
      />
      <ellipse
        className="eye-simple"
        cx="62"
        cy="48"
        rx="4"
        ry="5"
        fill="#1a1a1a"
      />
      <ellipse
        cx="62"
        cy="47"
        rx="1.5"
        ry="2"
        fill="url(#eyeShineSimple)"
      />

      {/* 微笑 */}
      <path
        d="M 46 60 Q 50 62 Q 54 60"
        stroke="#6B5020"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
