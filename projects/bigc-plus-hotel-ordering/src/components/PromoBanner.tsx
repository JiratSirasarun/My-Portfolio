import { placeholderImage } from '../lib/placeholderImage'

export function PromoBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-green-deep px-5 py-6 text-ivory shadow-soft">
      <img src={placeholderImage('promo-hotel-tray')} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="relative">
        <p className="font-display text-xl leading-tight">
          Everything You Need,
          <br />
          Right to Your Room.
        </p>
        <p className="mt-1 text-sm text-ivory/80">Curated essentials for a more comfortable stay.</p>
      </div>
    </div>
  )
}
