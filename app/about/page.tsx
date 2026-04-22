import { Introduction } from '@/components/About/Introduction'
import { GuestbookSection } from '@/components/About/GuestbookSection'

export default function AboutPage() {
  return (
    <div className="min-h-screen dark:bg-[#0a0e1a] bg-ui-surface">
      <Introduction />
      <div className="max-w-4xl mx-auto">
        <div className="h-px dark:bg-white/[0.04] bg-ui-border mx-6" />
      </div>
      <GuestbookSection />
    </div>
  )
}
