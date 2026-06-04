import ProductCard from './ProductCard'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'
import EmptyState from '@/components/shared/EmptyState'
import { Package } from 'lucide-react'

export default function ProductGrid({ products, loading, emptyMessage = 'No products found' }) {
  if (loading) {
    return <LoadingSkeleton type="card" rows={8} />
  }

  if (!products || products.length === 0) {
    return <EmptyState icon={Package} message={emptyMessage} />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}