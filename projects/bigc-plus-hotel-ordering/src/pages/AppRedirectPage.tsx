import { Apple, PlayCircle, Sparkles } from 'lucide-react'

const perks = [
  'Sign in and earn Big C points on every order',
  'Track your delivery in real time',
  'Reorder your favorites in one tap',
]

export function AppRedirectPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-8 bg-green-deep px-6 py-12 text-center text-ivory">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-green text-green-deep shadow-soft">
        <Sparkles size={32} strokeWidth={1.75} />
      </div>

      <div>
        <p className="font-display text-2xl leading-snug">
          รับประสบการณ์เต็มรูปแบบ
          <br />
          บนแอป Big C PLUS
        </p>
        <p className="mx-auto mt-3 max-w-xs text-sm text-ivory/75">
          For our Thai guests, order through the full Big C PLUS app for sign-in, member points, and live order
          tracking.
        </p>
      </div>

      <ul className="w-full max-w-xs space-y-2 text-left text-sm text-ivory/85">
        {perks.map((perk) => (
          <li key={perk} className="flex items-start gap-2 rounded-xl bg-white/10 px-3.5 py-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
            {perk}
          </li>
        ))}
      </ul>

      <div className="flex w-full max-w-xs flex-col gap-3">
        <a
          href="https://apps.apple.com/"
          target="_blank"
          rel="noreferrer"
          className="tap-target flex items-center justify-center gap-2 rounded-full bg-ivory px-5 py-3 text-sm font-semibold text-green-deep"
        >
          <Apple size={18} strokeWidth={1.75} />
          Download on the App Store
        </a>
        <a
          href="https://play.google.com/store"
          target="_blank"
          rel="noreferrer"
          className="tap-target flex items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-ivory ring-1 ring-inset ring-ivory/25"
        >
          <PlayCircle size={18} strokeWidth={1.75} />
          Get it on Google Play
        </a>
      </div>
    </div>
  )
}
