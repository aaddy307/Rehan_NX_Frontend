'use client'

import { useParams } from 'next/navigation'
import ProductForm from '@/components/admin/ProductForm'

export default function EditProductPage() {
  const params = useParams()
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">Edit Product</h1>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <ProductForm productId={params.id} />
      </div>
    </div>
  )
}