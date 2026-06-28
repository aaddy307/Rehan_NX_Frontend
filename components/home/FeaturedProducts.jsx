'use client'

import Link from 'next/link'
import { useProducts } from '@/hooks/useProducts'
import ProductGrid from '@/components/products/ProductGrid'
import { ArrowRight } from 'lucide-react'

export default function FeaturedProducts() {
  const { products, loading } = useProducts({ featured: 'true', limit: 8 })

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-onSurface font-headline tracking-tight">Featured Products</h2>
            <p className="text-mutedText mt-2 font-sans text-sm">Check out our latest and most popular phones</p>
          </div>
          <Link href="/products?featured=true" className="hidden md:flex items-center gap-2 text-primaryContainer hover:text-primary font-headline font-bold text-sm uppercase tracking-wider transition-colors">
            <span>View All</span> <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <ProductGrid products={products} loading={loading} emptyMessage="No featured products available" />
        <div className="mt-8 text-center md:hidden">
          <Link href="/products?featured=true" className="inline-flex items-center gap-2 text-primaryContainer hover:text-primary font-headline font-bold text-sm uppercase tracking-wider transition-colors">
            <span>View All</span> <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}