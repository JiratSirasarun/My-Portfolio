import { useNavigate, useParams } from 'react-router-dom'
import { AdBanner } from '../components/AdBanner'
import { BottomTabBar } from '../components/BottomTabBar'
import { CategoryChip } from '../components/CategoryChip'
import { ProductCard } from '../components/ProductCard'
import { RoomChip } from '../components/RoomChip'
import { StickyHeader } from '../components/StickyHeader'
import { categories, getCategory } from '../data/categories'
import { getProductsByCategory } from '../data/products'

export function CategoryPage() {
  const { slug = '' } = useParams()
  const navigate = useNavigate()
  const category = getCategory(slug)
  const products = getProductsByCategory(slug)

  return (
    <div className="min-h-dvh pb-24">
      <StickyHeader onBack={() => navigate('/home')} center={<RoomChip compact />} />

      <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 py-4">
        {categories.map((c) => (
          <CategoryChip
            key={c.slug}
            label={c.name}
            active={c.slug === slug}
            onClick={() => navigate(`/category/${c.slug}`)}
          />
        ))}
      </div>

      <div className="px-5">
        <h1 className="font-display text-xl text-charcoal">{category?.name ?? 'Category'}</h1>
      </div>

      <div className="px-5 pt-4">
        <AdBanner />
      </div>

      <div className="grid grid-cols-2 gap-3 px-5 pt-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <p className="px-5 pt-8 text-center text-sm text-charcoal/50">No items in this category yet.</p>
      )}

      <BottomTabBar />
    </div>
  )
}
