'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Smartphone, Tablet, Watch, Headphones } from 'lucide-react'
import { useCategories } from '@/hooks/useCategories'

const iconMap = {
  Smartphone: Smartphone,
  Tablet: Tablet,
  Watch: Watch,
  Headphones: Headphones,
  default: Smartphone,
}

export default function CategoriesSection() {
  const { categories, loading, error } = useCategories()

  if (error) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-onSurface font-headline text-center mb-10 tracking-tight">Shop by Category</h2>
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-full text-center text-sm font-headline font-bold">
            Failed to load categories. Please try again later.
          </div>
        </div>
      </section>
    )
  }

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-onSurface font-headline text-center mb-10 tracking-tight">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-background rounded-2xl animate-pulse border border-outline-variant/20" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-onSurface font-headline text-center mb-10 tracking-tight">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const IconComponent = iconMap[cat.name] || iconMap.default
            return (
              <Link key={cat._id} href={`/products?category=${cat.slug}`} className="group bg-background rounded-2xl p-6 shadow-soft hover:shadow-hover border border-outline-variant/30 text-center transition-all duration-300 hover:border-primaryContainer/50 hover:-translate-y-1">
                {cat.image?.url ? (
                  <div className="relative w-16 h-16 mx-auto mb-4">
                    <Image src={cat.image.url} alt={cat.name} fill className="object-contain" />
                  </div>
                ) : (
                  <div className="w-16 h-16 mx-auto mb-4 bg-primaryContainer/10 rounded-full flex items-center justify-center text-primaryContainer">
                    <IconComponent className="w-8 h-8" />
                  </div>
                )}
                <h3 className="font-headline font-bold text-onSurface group-hover:text-primary transition-colors text-base">{cat.name}</h3>
                <p className="text-[10px] text-mutedText mt-1 font-extrabold uppercase tracking-wider font-headline">{cat.productCount} products</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}