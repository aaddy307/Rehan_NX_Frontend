'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProductImages from '@/components/products/ProductImages'
import SpecificationsTable from '@/components/products/SpecificationsTable'
import InquiryForm from '@/components/products/InquiryForm'
import ProductCard from '@/components/products/ProductCard'
import { formatPrice } from '@/utils/formatPrice'
import { WHATSAPP_BASE } from '@/utils/constants'
import { useSettingsStore } from '@/store/settingsStore'
import { getProduct, getProducts } from '@/services/api'
import { toast } from 'sonner'
import { MessageCircle, ArrowLeft } from 'lucide-react'

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { settings, fetchSettings } = useSettingsStore()

  useEffect(() => {
    fetchSettings()
  }, [fetchSettings])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await getProduct(params.slug)
        setProduct(productRes.data.product)

        const cat = productRes.data.product.category
        if (cat && typeof cat === 'object' && cat.slug) {
          const relatedRes = await getProducts({ category: cat.slug, limit: 4 })
          setRelatedProducts(relatedRes.data.products.filter((p) => p._id !== productRes.data.product._id))
        }
      } catch (error) {
        toast.error('Failed to load product')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.slug])

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-white rounded-full w-1/4 border border-outline-variant/20 shadow-sm" />
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="aspect-square bg-white rounded-3xl border border-outline-variant/20 shadow-sm" />
                <div className="space-y-4">
                  <div className="h-6 bg-white rounded-full w-1/4 border border-outline-variant/20 shadow-sm" />
                  <div className="h-10 bg-white rounded-full w-3/4 border border-outline-variant/20 shadow-sm" />
                  <div className="h-8 bg-white rounded-full w-1/3 border border-outline-variant/20 shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl font-extrabold text-onSurface font-headline mb-4">Product not found</h1>
            <Link href="/products" className="text-primaryContainer hover:text-primary font-headline font-bold text-sm uppercase tracking-wider inline-block">Back to products</Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const whatsappNumber = settings?.whatsapp?.replace(/\D/g, '') || '919876543210'
  const whatsappLink = `${WHATSAPP_BASE}${whatsappNumber}?text=${encodeURIComponent(`Hi, I'm interested in ${product.name} (${formatPrice(product.price)})`)}`

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link href="/products" className="inline-flex items-center gap-2 text-mutedText hover:text-primary transition-colors font-headline font-bold text-sm uppercase tracking-wider mb-8">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <ProductImages images={product.images} />

            <div className="space-y-6">
              <div>
                <span className="inline-block bg-primaryContainer text-white text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full shadow-sm font-headline mb-3">
                  {typeof product.brand === 'object' ? product.brand?.name : product.brand}
                </span>
                <h1 className="text-3xl font-extrabold text-onSurface font-headline tracking-tight">{product.name}</h1>
              </div>
              <div className="text-3xl font-extrabold text-primaryContainer font-headline">{formatPrice(product.price)}</div>
              {product.shortDescription && <p className="text-mutedText font-sans text-sm">{product.shortDescription}</p>}
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3.5 rounded-full font-headline font-bold text-xs uppercase tracking-wider hover:from-green-600 hover:to-emerald-700 transition-all shadow-md shadow-green-500/10 hover:shadow-lg">
                  <MessageCircle className="w-5 h-5" />
                  Enquire on WhatsApp
                </a>
                <a href={`tel:${settings?.phone1 || ''}`} className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-primaryContainer/85 text-primaryContainer px-8 py-3.5 rounded-full font-headline font-bold text-xs uppercase tracking-wider hover:bg-primaryContainer hover:text-white transition-all">
                  Contact Store
                </a>
              </div>
            </div>
          </div>

          {product.specifications && product.specifications.length > 0 && (
            <div className="bg-white rounded-3xl p-8 shadow-soft border border-outline-variant/30 mb-12">
              <h2 className="text-xl font-extrabold text-onSurface font-headline mb-6">Specifications</h2>
              <SpecificationsTable specifications={product.specifications} />
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-3xl p-8 shadow-soft border border-outline-variant/30">
              <h2 className="text-xl font-extrabold text-onSurface font-headline mb-6">Send Inquiry</h2>
              <InquiryForm productName={product.name} />
            </div>
            {product.description && (
              <div className="bg-white rounded-3xl p-8 shadow-soft border border-outline-variant/30">
                <h2 className="text-xl font-extrabold text-onSurface font-headline mb-6">Description</h2>
                <p className="text-mutedText font-sans text-sm whitespace-pre-line leading-relaxed">{product.description}</p>
              </div>
            )}
          </div>

          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-extrabold text-onSurface font-headline mb-8 tracking-tight">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}