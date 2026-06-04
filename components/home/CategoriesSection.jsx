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
  const { categories, loading } = useCategories()

  if (loading) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
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
        <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => {
            const IconComponent = iconMap[cat.name] || iconMap.default
            return (
              <Link key={cat._id} href={`/products?category=${cat.slug}`} className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all text-center">
                {cat.image?.url ? (
                  <div className="relative w-16 h-16 mx-auto mb-3">
                    <Image src={cat.image.url} alt={cat.name} fill className="object-contain" />
                  </div>
                ) : (
                  <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <h3 className="font-medium text-primary group-hover:text-accent transition-colors">{cat.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{cat.productCount} products</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}