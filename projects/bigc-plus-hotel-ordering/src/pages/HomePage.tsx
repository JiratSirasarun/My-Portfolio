import { Coffee, Cookie, GlassWater, Heart, ShoppingBasket, ShoppingCart, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { BottomTabBar } from '../components/BottomTabBar'
import { PromoBanner } from '../components/PromoBanner'
import { SearchBar } from '../components/SearchBar'
import { categories } from '../data/categories'
import { getItemCount, useCartStore } from '../state/cartStore'
import { getGreeting, useSessionStore } from '../state/sessionStore'

const categoryIcon: Record<string, typeof Sparkles> = {
  'thai-signatures': Sparkles,
  breakfast: Coffee,
  'snacks-treats': Cookie,
  'drinks-beverages': GlassWater,
  'personal-care': Heart,
  'local-favourites': ShoppingBasket,
}

const greetingLabel: Record<ReturnType<typeof getGreeting>, string> = {
  morning: 'Good morning',
  afternoon: 'Good afternoon',
  evening: 'Good evening',
}

export function HomePage() {
  const navigate = useNavigate()
  const { hotelName, roomNumber, guestName } = useSessionStore()
  const lines = useCartStore((s) => s.lines)
  const cartCount = getItemCount(lines)

  return (
    <div className="min-h-dvh pb-24">
      <header className="flex items-start justify-between gap-3 px-5 pb-4 pt-6">
        <div className="min-w-0">
          <p className="font-display text-2xl leading-tight text-charcoal">
            {greetingLabel[getGreeting()]}
            {guestName ? `, ${guestName.split(' ')[0]}` : ''}
          </p>
          <p className="mt-1 truncate text-sm text-charcoal/60">
            {hotelName} · Room {roomNumber}
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/cart')}
          aria-label={`Cart, ${cartCount} items`}
          className="tap-target relative flex shrink-0 items-center justify-center rounded-full bg-white shadow-card"
        >
          <ShoppingCart size={20} strokeWidth={1.75} className="text-charcoal" />
          {cartCount > 0 && (
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-green px-1 text-[10px] font-semibold text-green-deep">
              {cartCount}
            </span>
          )}
        </button>
      </header>

      <div className="px-5">
        <SearchBar />
      </div>

      <div className="px-5 pt-5">
        <PromoBanner />
      </div>

      <section className="px-5 pt-6">
        <h2 className="font-display text-lg text-charcoal">Shop by category</h2>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {categories.map((category) => {
            const Icon = categoryIcon[category.slug]
            return (
              <button
                key={category.slug}
                type="button"
                onClick={() => navigate(`/category/${category.slug}`)}
                className="flex flex-col items-center gap-2 rounded-2xl bg-white px-2 py-4 text-center shadow-card transition-transform active:scale-[0.97]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green/15 text-green-deep">
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <span className="text-xs font-medium leading-tight text-charcoal">{category.name}</span>
              </button>
            )
          })}
        </div>
      </section>

      <BottomTabBar />
    </div>
  )
}
