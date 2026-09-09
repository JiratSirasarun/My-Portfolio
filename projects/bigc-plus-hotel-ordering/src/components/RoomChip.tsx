import { Hotel } from 'lucide-react'
import { useSessionStore } from '../state/sessionStore'

export function RoomChip({ compact = false }: { compact?: boolean }) {
  const { hotelName, roomNumber } = useSessionStore()

  return (
    <div
      className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-green-deep/15 bg-white/90 px-3 py-1.5 text-charcoal shadow-card backdrop-blur"
      title={`${hotelName} · Room ${roomNumber}`}
    >
      <Hotel size={14} className="shrink-0 text-green-deep" strokeWidth={1.75} />
      <span className="truncate text-xs font-medium">
        Room {roomNumber}
        {!compact && <span className="text-charcoal/60"> · {hotelName}</span>}
      </span>
    </div>
  )
}
