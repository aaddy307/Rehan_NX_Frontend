'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Switch } from '@/components/ui/Switch'
import SpecificationsInput from './SpecificationsInput'
import { useCategories } from '@/hooks/useCategories'
import { createProduct, updateProduct, getProduct, getBrands } from '@/services/api'
import { toast } from 'sonner'
import { generateSlug } from '@/lib/utils'

export default function ProductForm({ productId }) {
  const router = useRouter()
  const { categories } = useCategories()
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(!!productId)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    brand: '',
    category: '',
    price: '',
    shortDescription: '',
    description: '',
    specifications: [],
    featured: false,
    status: true,
    images: [],
  })

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await getBrands()
        setBrands(response.data.brands.filter(b => b.status))
      } catch (error) {
        console.error('Error fetching brands:', error)
      }
    }
    fetchBrands()
  }, [])

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const response = await getProduct(productId, { all: true })
          const product = response.data.product
          setFormData({
            name: product.name,
            slug: product.slug,
            brand: typeof product.brand === 'object' ? product.brand._id : product.brand,
            category: typeof product.category === 'object' ? product.category._id : product.category,
            price: product.price.toString(),
            shortDescription: product.shortDescription || '',
            description: product.description || '',
            specifications: product.specifications || [],
            featured: product.featured,
            status: product.status,
            images: product.images || [],
          })
        } catch (error) {
          toast.error('Failed to load product')
        } finally {
          setInitialLoading(false)
        }
      }
      fetchProduct()
    }
  }, [productId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === 'name') {
      setFormData((prev) => ({ ...prev, slug: generateSlug(value) }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = new FormData()
      Object.entries(formData).forEach(([key, val]) => {
        if (key === 'specifications') {
          data.append(key, JSON.stringify(val))
        } else if (key === 'images') {
          if (val instanceof FileList) {
            for (let i = 0; i < val.length; i++) {
              data.append('images', val[i])
            }
          }
        } else {
          data.append(key, String(val))
        }
      })

      if (productId) {
        await updateProduct(productId, data)
        toast.success('Product updated successfully')
      } else {
        await createProduct(data)
        toast.success('Product created successfully')
      }
      router.push('/admin/products')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save product')
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return <div className="animate-pulse space-y-4"><div className="h-10 bg-gray-200 rounded" /><div className="h-10 bg-gray-200 rounded" /></div>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <Input name="name" value={formData.name} onChange={handleChange} required placeholder="Product name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
          <Input name="slug" value={formData.slug} onChange={handleChange} placeholder="auto-generated" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Brand *</label>
          <Select name="brand" value={formData.brand} onChange={handleChange} required>
            <option value="">Select Brand</option>
            {brands.map((b) => <option key={b._id} value={b._id}>{b.name}</option>)}
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
          <Select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
          <Input name="price" type="number" value={formData.price} onChange={handleChange} required placeholder="0" min="0" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
        <Textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} rows={2} placeholder="Brief description for product cards" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
        <Textarea name="description" value={formData.description} onChange={handleChange} rows={4} placeholder="Detailed product description" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
        <input type="file" name="images" multiple accept="image/*" onChange={(e) => setFormData((prev) => ({ ...prev, images: e.target.files }))} className="w-full border rounded-lg p-2" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Specifications</label>
        <SpecificationsInput value={formData.specifications} onChange={(val) => setFormData((prev) => ({ ...prev, specifications: val }))} />
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <Switch checked={formData.featured} onCheckedChange={(val) => setFormData((prev) => ({ ...prev, featured: val }))} />
          <span className="text-sm text-gray-700">Featured Product</span>
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={formData.status} onCheckedChange={(val) => setFormData((prev) => ({ ...prev, status: val }))} />
          <span className="text-sm text-gray-700">Active</span>
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" loading={loading}>{productId ? 'Update Product' : 'Create Product'}</Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin/products')}>Cancel</Button>
      </div>
    </form>
  )
}