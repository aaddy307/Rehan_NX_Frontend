'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { formatPrice } from '@/utils/formatPrice'
import { WHATSAPP_BASE } from '@/utils/constants'

export default function ProductCard({ product }) {
  const whatsappNumber = '919876543210'
  const message = encodeURIComponent(`Interested in ${product.name}`)
  const whatsappLink = `${WHATSAPP_BASE}${whatsappNumber}?text=${message}`

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200">
      <div className="relative aspect-square overflow-hidden">
        {product.images?.[0] ? (
          <Image src={product.images[0].url} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-200" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
        ) : (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
        {product.featured && (
          <span className="absolute top-2 left-2 bg-accent text-white text-xs px-2 py-1 rounded">Featured</span>
        )}
        <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">{product.brand}</span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">{product.name}</h3>
        <p className="text-lg font-bold text-accent mb-3">{formatPrice(product.price)}</p>
        <div className="flex gap-2">
          <Link href={`/products/${product.slug}`} className="flex-1 text-center px-3 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors text-sm">
            View Details
          </Link>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}