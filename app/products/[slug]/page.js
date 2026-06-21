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

        if (productRes.data.product.category) {
          const relatedRes = await getProducts({ category: productRes.data.product.category.slug, limit: 4 })
          setRelatedProducts(relatedRes.data.products.filter((p) => p._id !== productRes.data.product._id))
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.slug])

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-gray-200 rounded w-1/4" />
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="aspect-square bg-gray-200 rounded-xl" />
                <div className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-1/4" />
                  <div className="h-10 bg-gray-200 rounded w-3/4" />
                  <div className="h-8 bg-gray-200 rounded w-1/3" />
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
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
            <Link href="/products" className="text-accent hover:underline mt-4 inline-block">Back to products</Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const whatsappNumber = settings?.whatsapp?.replace(/\D/g, '') || '919876543210'
  const whatsappLink = `${WHATSAPP_BASE}${whatsappNumber}?text=${encodeURIComponent(`Hi, I'm interested in ${product.name} (${formatPrice(product.price)})`)}`

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link href="/products" className="inline-flex items-center gap-2 text-gray-600 hover:text-accent mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <ProductImages images={product.images} />

            <div className="space-y-6">
              <div>
                <span className="inline-block bg-primary text-white text-sm px-3 py-1 rounded mb-3">{product.brand}</span>
                <h1 className="text-2xl md:text-3xl font-bold text-primary">{product.name}</h1>
              </div>
              <div className="text-3xl font-bold text-accent">{formatPrice(product.price)}</div>
              {product.shortDescription && <p className="text-gray-600">{product.shortDescription}</p>}
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold">
                  <MessageCircle className="w-5 h-5" />
                  Enquire on WhatsApp
                </a>
                <a href={`tel:${settings?.phone1 || ''}`} className="flex-1 inline-flex items-center justify-center gap-2 border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors font-semibold">
                  Contact Store
                </a>
              </div>
            </div>
          </div>

          {product.specifications && product.specifications.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm mb-12">
              <h2 className="text-xl font-bold text-primary mb-4">Specifications</h2>
              <SpecificationsTable specifications={product.specifications} />
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-primary mb-4">Send Inquiry</h2>
              <InquiryForm productName={product.name} />
            </div>
            {product.description && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-primary mb-4">Description</h2>
                <p className="text-gray-600 whitespace-pre-line">{product.description}</p>
              </div>
            )}
          </div>

          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-primary mb-6">Related Products</h2>
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