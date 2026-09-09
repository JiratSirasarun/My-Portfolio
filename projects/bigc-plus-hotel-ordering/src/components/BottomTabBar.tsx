import { Grid2x2, Home, ListOrdered, MoreHorizontal } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const tabs = [
  { key: 'home', label: 'Home', icon: Home, path: '/home' },
  { key: 'categories', label: 'Categories', icon: Grid2x2, path: '/category/thai-signatures' },
  { key: 'orders', label: 'Orders', icon: ListOrdered, path: null },
  { key: 'more', label: 'More', icon: MoreHorizontal, path: null },
] as const

export function BottomTabBar() {
  const navigate = useNavigate()
  const location = useLocation()

  const activeKey = location.pathname.startsWith('/category')
    ? 'categories'
    : location.pathname.startsWith('/home')
      ? 'home'
      : null

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-charcoal/5 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      <div className="mx-auto flex max-w-md items-stretch justify-around">
        {tabs.map(({ key, label, icon: Icon, path }) => {
          const active = key === activeKey
          return (
            <button
              key={key}
              type="button"
              disabled={!path}
              onClick={() => path && navigate(path)}
              className={`tap-target flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-medium transition-colors ${
                active ? 'text-green-deep' : path ? 'text-charcoal/50' : 'text-charcoal/25'
              }`}
            >
              <Icon size={22} strokeWidth={active ? 2 : 1.75} />
              {label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
