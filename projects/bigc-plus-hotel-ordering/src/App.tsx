import type { ReactElement } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppRedirectPage } from './pages/AppRedirectPage'
import { CartPage } from './pages/CartPage'
import { CategoryPage } from './pages/CategoryPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { HomePage } from './pages/HomePage'
import { LandingPage } from './pages/LandingPage'
import { ProductPage } from './pages/ProductPage'
import { SearchResultsPage } from './pages/SearchResultsPage'
import { ThankYouPage } from './pages/ThankYouPage'
import { useSessionStore } from './state/sessionStore'

/** Guards the M-Web branch: a guest must have picked English on the
 * landing screen before reaching the shop — mirrors the QR-scan → language
 * select → shop flow instead of allowing a cold deep link into the catalog. */
function RequireEnglish({ children }: { children: ReactElement }) {
  const language = useSessionStore((s) => s.language)
  if (language !== 'en') return <Navigate to="/" replace />
  return children
}

function App() {
  return (
    // The transform gives `position: fixed` descendants (headers, footers,
    // the tab bar) this element as their containing block instead of the
    // viewport, so the whole app reads as a centered phone-width column on
    // wider screens rather than fixed bars stretching edge-to-edge.
    <div className="relative mx-auto min-h-dvh w-full max-w-md [transform:translateZ(0)]">
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app-redirect" element={<AppRedirectPage />} />

      <Route
        path="/home"
        element={
          <RequireEnglish>
            <HomePage />
          </RequireEnglish>
        }
      />
      <Route
        path="/category/:slug"
        element={
          <RequireEnglish>
            <CategoryPage />
          </RequireEnglish>
        }
      />
      <Route
        path="/search"
        element={
          <RequireEnglish>
            <SearchResultsPage />
          </RequireEnglish>
        }
      />
      <Route
        path="/product/:id"
        element={
          <RequireEnglish>
            <ProductPage />
          </RequireEnglish>
        }
      />
      <Route
        path="/cart"
        element={
          <RequireEnglish>
            <CartPage />
          </RequireEnglish>
        }
      />
      <Route
        path="/checkout"
        element={
          <RequireEnglish>
            <CheckoutPage />
          </RequireEnglish>
        }
      />
      <Route
        path="/thank-you"
        element={
          <RequireEnglish>
            <ThankYouPage />
          </RequireEnglish>
        }
      />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
