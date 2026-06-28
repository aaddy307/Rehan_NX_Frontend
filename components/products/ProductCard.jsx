'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { formatPrice } from '@/utils/formatPrice'
import { WHATSAPP_BASE } from '@/utils/constants'
import { useSettingsStore } from '@/store/settingsStore'

export default function ProductCard({ product }) {
  const { settings } = useSettingsStore()
  const whatsappNumber = settings?.whatsapp?.replace(/\D/g, '') || '919876543210'
  const message = encodeURIComponent(`Interested in ${product.name}`)
  const whatsappLink = `${WHATSAPP_BASE}${whatsappNumber}?text=${message}`

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-soft border border-outline-variant/30 hover:border-primaryContainer/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-hover flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-gray-50/50">
        {product.images?.[0]?.url ? (
          <Image src={product.images[0].url} alt={product.name} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-300" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
        ) : (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-xs font-medium uppercase font-headline">No Image</span>
          </div>
        )}
        {product.featured && (
          <span className="absolute top-3 left-3 bg-primaryContainer text-white text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full shadow-sm font-headline">Featured</span>
        )}
        <span className="absolute top-3 right-3 bg-white border border-outline-variant/40 text-onSurface text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full shadow-sm font-headline">
          {typeof product.brand === 'object' ? product.brand?.name : product.brand}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-headline font-bold text-onSurface line-clamp-1 mb-1.5 hover:text-primary transition-colors text-base">{product.name}</h3>
          <p className="text-lg font-extrabold text-primaryContainer font-headline mb-4">{formatPrice(product.price)}</p>
        </div>
        <div className="flex gap-2.5 items-center mt-auto">
          <Link href={`/products/${product.slug}`} className="flex-1 text-center px-5 py-2.5 border-2 border-primaryContainer/85 text-primaryContainer font-headline text-xs font-extrabold uppercase rounded-full hover:bg-primaryContainer hover:text-white transition-all duration-300">
            View Details
          </Link>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full hover:from-green-600 hover:to-emerald-700 transition-colors shadow-md shadow-green-500/10 hover:shadow-lg">
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
