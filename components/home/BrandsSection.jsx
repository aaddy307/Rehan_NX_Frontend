'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useBrands } from '@/hooks/useBrands'

export default function BrandsSection() {
  const { brands, loading } = useBrands()

  if (loading) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-8">Popular Brands</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-8">Popular Brands</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {brands.map((brand) => (
            <Link key={brand._id} href={`/products?brand=${brand.name}`} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-lg hover:scale-105 transition-all text-center flex items-center justify-center">
              {brand.logo?.url ? (
                <Image src={brand.logo.url} alt={brand.name} width={40} height={40} className="object-contain" />
              ) : (
                <span className="text-sm font-medium text-primary">{brand.name}</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}