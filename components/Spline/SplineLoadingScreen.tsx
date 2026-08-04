'use client'

export function SplineLoadingScreen({ ready = false }: { ready?: boolean }) {
  return (
    <div className="bot-loader fixed inset-0 overflow-hidden bg-[#060810] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.12),transparent_34%)]" />
      <div className="absolute inset-0 tech-grid opacity-45" />

      <div className="relative z-[1] flex h-full items-center justify-center px-6">
        <div className="flex w-full max-w-[420px] flex-col items-center">
          <div className="bot-loader-mini-shell relative">
            <div className="bot-loader-mini-aura" />
            <div className="bot-loader-head">
              <div className="bot-loader-antenna" />
              <div className="bot-loader-face">
                <span className="bot-loader-eye bot-loader-eye-left" />
                <span className="bot-loader-eye bot-loader-eye-right" />
                <span className="bot-loader-mouth" />
                <span className="bot-loader-scan" />
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-col items-center">
            <div className="text-[10px] font-black uppercase tracking-[0.34em] text-white/38">
              companion waking up
            </div>
            <div className="mt-2 text-sm font-medium text-white/50">
              {ready ? 'rendering scene' : 'syncing robot'}
            </div>
            <div className="mt-5 h-[3px] w-[220px] overflow-hidden rounded-full bg-white/8">
              <div
                className={`bot-loader-progress h-full rounded-full bg-gradient-to-r from-sky-400 via-brand to-cyan-300 ${
                  ready ? 'bot-loader-progress-finish' : ''
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
