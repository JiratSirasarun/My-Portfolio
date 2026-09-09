import { create } from 'zustand'
import type { GuestSession, Language } from '../types'

// Hardcoded stand-in for QR-code query params (?hotel=...&room=...).
// In a real build these are parsed from the scanned URL on first load.
const QR_SESSION_DEFAULTS = {
  hotelName: "Bangkok Marriott Marquis Queen's Park",
  roomNumber: '2408',
}

type SessionState = GuestSession & {
  setLanguage: (language: Language) => void
  setGuestName: (name: string) => void
  setRoomNumber: (roomNumber: string) => void
}

export const useSessionStore = create<SessionState>((set) => ({
  language: null,
  hotelName: QR_SESSION_DEFAULTS.hotelName,
  roomNumber: QR_SESSION_DEFAULTS.roomNumber,
  guestName: undefined,

  setLanguage: (language) => set({ language }),
  setGuestName: (guestName) => set({ guestName }),
  setRoomNumber: (roomNumber) => set({ roomNumber }),
}))

export function getGreeting(date = new Date()): 'morning' | 'afternoon' | 'evening' {
  const hour = date.getHours()
  if (hour < 12) return 'morning'
  if (hour < 18) return 'afternoon'
  return 'evening'
}
