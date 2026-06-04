'use client'

import Link from 'next/link'
import { useProducts } from '@/hooks/useProducts'
import ProductGrid from '@/components/products/ProductGrid'
import { ArrowRight } from 'lucide-react'

export default function FeaturedProducts() {
  const { products, loading } = useProducts({ featured: 'true', limit: 8 })

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary">Featured Products</h2>
            <p className="text-gray-500 mt-2">Check out our latest and most popular phones</p>
          </div>
          <Link href="/products?featured=true" className="hidden md:flex items-center gap-2 text-accent hover:underline font-medium">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <ProductGrid products={products} loading={loading} emptyMessage="No featured products available" />
        <div className="mt-8 text-center md:hidden">
          <Link href="/products?featured=true" className="inline-flex items-center gap-2 text-accent hover:underline font-medium">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}