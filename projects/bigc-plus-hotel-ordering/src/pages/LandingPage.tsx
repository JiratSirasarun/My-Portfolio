import { ArrowRight, Smartphone } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { RoomChip } from '../components/RoomChip'
import { placeholderImage } from '../lib/placeholderImage'
import { useSessionStore } from '../state/sessionStore'

export function LandingPage() {
  const navigate = useNavigate()
  const setLanguage = useSessionStore((s) => s.setLanguage)

  function chooseEnglish() {
    setLanguage('en')
    navigate('/home')
  }

  function chooseThai() {
    setLanguage('th')
    navigate('/app-redirect')
  }

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-green-deep">
      <img src={placeholderImage('landing-hotel-room')} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-green-deep/70 via-green-deep/35 to-green-deep/85" />

      <div className="relative flex min-h-dvh flex-col px-5 pb-8 pt-6">
        <div className="flex justify-center">
          <RoomChip />
        </div>

        <div className="flex flex-1 flex-col justify-end gap-3 pt-24">
          {/* Primary path: English / foreign guest, mobile web */}
          <button
            type="button"
            onClick={chooseEnglish}
            className="flex flex-col gap-4 rounded-3xl bg-white/95 px-6 py-7 text-left shadow-soft transition-transform active:scale-[0.99]"
          >
            <div>
              <p className="font-display text-[28px] leading-tight text-charcoal">
                Welcome. Let&rsquo;s get
                <br />
                you settled in.
              </p>
              <p className="mt-2 text-sm text-charcoal/60">
                Order Thai souvenirs and hotel essentials, delivered straight to your room.
              </p>
            </div>
            <span className="tap-target inline-flex w-fit items-center gap-2 rounded-full bg-green px-5 py-3 text-sm font-semibold text-green-deep">
              Start shopping in English
              <ArrowRight size={16} strokeWidth={2.25} />
            </span>
          </button>

          {/* Secondary path: Thai guest, redirected to the native app */}
          <button
            type="button"
            onClick={chooseThai}
            className="tap-target flex items-center justify-between gap-3 rounded-2xl bg-white/10 px-5 py-3.5 text-left text-ivory ring-1 ring-inset ring-ivory/20"
          >
            <span className="flex items-center gap-2.5 text-sm">
              <Smartphone size={18} strokeWidth={1.75} className="shrink-0" />
              ภาษาไทย — ใช้แอป Big C PLUS
            </span>
            <ArrowRight size={16} strokeWidth={2} className="shrink-0 opacity-70" />
          </button>
        </div>
      </div>
    </div>
  )
}
