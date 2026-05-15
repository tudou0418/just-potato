'use client'

const bootMessages = [
  'booting companion shell',
  'aligning optic sensors',
  'warming up spline reactor',
]

export function SplineLoadingScreen() {
  return (
    <div className="bot-loader fixed inset-0 overflow-hidden bg-[#060810] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.14),transparent_36%),radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.08),transparent_28%)]" />
      <div className="absolute inset-0 tech-grid opacity-60" />

      <div className="relative z-[1] flex h-full items-center justify-center px-6">
        <div className="grid w-full max-w-5xl items-center gap-10 md:grid-cols-[minmax(0,320px)_minmax(0,360px)] md:gap-16">
          <div className="flex justify-center md:justify-end">
            <div className="bot-loader-shell relative">
              <div className="bot-loader-aura" />
              <div className="bot-loader-shadow" />
              <div className="bot-loader-head">
                <div className="bot-loader-antenna" />
                <div className="bot-loader-face">
                  <span className="bot-loader-eye bot-loader-eye-left" />
                  <span className="bot-loader-eye bot-loader-eye-right" />
                  <span className="bot-loader-mouth" />
                  <span className="bot-loader-scan" />
                </div>
              </div>
              <div className="bot-loader-body">
                <span className="bot-loader-core" />
                <span className="bot-loader-arm bot-loader-arm-left" />
                <span className="bot-loader-arm bot-loader-arm-right" />
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/28 p-5 shadow-[0_24px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-6">
            <div className="mb-4 flex items-center gap-2 border-b border-white/8 pb-3">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-2 text-[10px] uppercase tracking-[0.32em] text-white/28">
                Companion Boot
              </span>
            </div>

            <div className="space-y-3 font-mono">
              <div className="text-[11px] uppercase tracking-[0.32em] text-brand/75">
                potato.bot online sequence
              </div>
              {bootMessages.map((message, index) => (
                <div
                  key={message}
                  className="bot-loader-line flex items-center gap-3 text-sm text-white/64"
                  style={{ animationDelay: `${index * 180}ms` }}
                >
                  <span className="text-brand/80">&gt;</span>
                  <span>{message}</span>
                </div>
              ))}
              <div className="mt-5 flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/8">
                  <div className="bot-loader-progress h-full rounded-full bg-gradient-to-r from-sky-400 via-brand to-cyan-300" />
                </div>
                <span className="text-[11px] uppercase tracking-[0.24em] text-white/34">
                  syncing
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
