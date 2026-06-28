'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useBrands } from '@/hooks/useBrands'

export default function BrandsSection() {
  const { brands, loading, error } = useBrands()

  if (error) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" id="brands">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-onSurface font-headline text-center mb-10 tracking-tight">Popular Brands</h2>
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-full text-center text-sm font-headline font-bold">
            Failed to load brands. Please try again later.
          </div>
        </div>
      </section>
    )
  }

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" id="brands">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-onSurface font-headline text-center mb-10 tracking-tight">Popular Brands</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square bg-background rounded-2xl animate-pulse border border-outline-variant/20" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" id="brands">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-onSurface font-headline text-center mb-10 tracking-tight">Popular Brands</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {brands.map((brand) => (
            <Link key={brand._id} href={`/products?brand=${brand.name}`} className="bg-background rounded-2xl p-4 shadow-soft hover:shadow-hover hover:scale-105 transition-all duration-300 border border-outline-variant/30 hover:border-primaryContainer/50 text-center flex items-center justify-center">
              {brand.logo?.url ? (
                <Image src={brand.logo.url} alt={brand.name} width={80} height={80} className="object-contain" />
              ) : (
                <span className="text-sm font-headline font-bold text-onSurface">{brand.name}</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}