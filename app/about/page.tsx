import { Introduction } from '@/components/About/Introduction'
import { GuestbookSection } from '@/components/About/GuestbookSection'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ui-surface">
      <Introduction />
      <GuestbookSection />
    </div>
  )
}
